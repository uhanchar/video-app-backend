import request from 'supertest';
import mock from 'mock-fs';
import path from 'path';

import app from 'app';

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

describe('videos route tests', () => {
  afterEach(() => {
    mock.restore();
  });

  it('should fetch videos collection', async (done) => {
    const { body } = await request(app).get(`/api/video/${ mockedVideosCollection[0].id }`);

    expect(body.id).toBe(mockedVideosCollection[0].id);

    done();
  });
});
