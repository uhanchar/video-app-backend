import { Router } from 'express';

import videos from 'api/routes/videos';

export default () => {
  const app = Router();

  videos(app);

  return app;
};
