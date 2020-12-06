import { Router } from 'express';

import videos from 'api/routes/videos';
import video from 'api/routes/video';
import uploadVideo from 'api/routes/upload-video';

export default () => {
  const app = Router();

  videos(app);
  video(app);
  uploadVideo(app);

  return app;
};
