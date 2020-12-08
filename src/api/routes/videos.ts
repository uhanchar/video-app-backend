import { Response, Router } from 'express';

import  * as videosService from '../../services/videos.service';
import { HttpStatus } from '../../constants/http-status';
import { ErrorMessages } from '../../constants/error-messages.enum';

const route = Router();

export default (app: Router) => {
  app.use('/videos', route);

  route.get('', async (_, res: Response) => {
    try {
      const videos = await videosService.fetchVideos();

      res.send(videos);
    } catch (error) {
      res.status(HttpStatus.ServerError).send(ErrorMessages.GENERIC_SERVER_ERROR);
    }
  });
};
