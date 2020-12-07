import mock from 'mock-fs';
// import path from 'path';

import * as videosService from 'services/videos.service';
// import { setupFakeFileSystem } from 'test-data';
import path from 'path';

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
  [`${path.resolve('db', 'collections')}`]: {
    'videos': JSON.stringify(mockedVideosCollection),
  },
});

describe('test of Videos service', () => {
  afterEach(() => {
    mock.restore();
  });

  it('should fetch videos collection', async () => {
    const videos = await videosService.fetchVideos();

    expect(videos).toHaveLength(mockedVideosCollection.length);
  });
});
