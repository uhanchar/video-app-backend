import mock from 'mock-fs';
import path from 'path';

import * as videoService from '../../services/video.service';

const mockedVideosCollection = [
  {
    id: '4e4682ecadd48d6bb20b9806b7e522bc',
    name: 'Long',
    description: '',
    link: 'media/videos/4e4682ecadd48d6bb20b9806b7e522bc',
    thumbnailLink: 'media/thumbnails/4e4682ecadd48d6bb20b9806b7e522bc.png',
    createdAt: new Date(),
  },
];

mock({
  [`${ path.resolve('db', 'collections') }`]: {
    'videos': JSON.stringify(mockedVideosCollection),
  },
});

describe('test of Videos service', () => {
  afterEach(() => {
    mock.restore();
  });

  it('should fetch videos collection', async () => {
    const video = await videoService.fetchSelectedVideo(mockedVideosCollection[0].id);

    expect(video.id).toEqual(mockedVideosCollection[0].id);
  });
});
