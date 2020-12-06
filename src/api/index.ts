import { Router } from 'express';

import videos from 'api/routes/videos';
import uploadVideo from 'api/routes/upload-video';

export default () => {
  const app = Router();

  videos(app);
  uploadVideo(app);

  return app;
};
