import { Router } from 'express';

import videos from './routes/videos';
import video from './routes/video';
import uploadVideo from './routes/upload-video';

export default () => {
  const app = Router();

  videos(app);
  video(app);
  uploadVideo(app);

  return app;
};
