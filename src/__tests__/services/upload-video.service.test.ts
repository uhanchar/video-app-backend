import mock from 'mock-fs';
import path from 'path';

import * as uploadVideoService from 'services/upload-video.service';
import * as videosService from 'services/videos.service';

const mockedVideo = {
  id: '4e4682ecadd48d6bb20b9806b7e522bc',
  name: 'Long',
  description: '',
  link: 'media/videos/4e4682ecadd48d6bb20b9806b7e522bc',
  thumbnailLink: 'media/thumbnails/4e4682ecadd48d6bb20b9806b7e522bc.png',
  createdAt: new Date(),
};

mock({
  [`${path.resolve('db', 'collections')}`]: {
    'videos': '[]',
  },
  [`${path.resolve('db', 'media', 'thumbnails')}`]: {
  },
});

describe('test of UploadVideos service', () => {
  afterEach(() => {
    mock.restore();
  });

  it('should upload video data to collection', async () => {
    await uploadVideoService.uploadVideoData(
      { fileName: mockedVideo.name, fileDescription: mockedVideo.description },
      mockedVideo.id,
    );
    const videos = await videosService.fetchVideos();

    expect(videos).toHaveLength(1);
  });
});
