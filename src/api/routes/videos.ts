import { Response, Router } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/videos', route);

  route.get('', async (_, res: Response) => {
    res.send([]);
  });
};
