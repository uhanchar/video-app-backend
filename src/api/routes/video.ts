import { Response, Router } from 'express';

import  * as videoService from '../../services/video.service';
import { HttpStatus } from '../../constants/http-status';
import { ErrorMessages } from '../../constants/error-messages.enum';

const route = Router();

export default (app: Router) => {
  app.use('/video', route);

  route.get('/:id', async (req, res: Response) => {
    const { id } = req.params;

    try {
      const video = await videoService.fetchSelectedVideo(id);

      if (!video) {
        res.status(HttpStatus.ServerError).send(ErrorMessages.GENERIC_SERVER_ERROR);
      } else {
        res.send(video);
      }
    } catch (error) {
      res.status(HttpStatus.ServerError).send(ErrorMessages.GENERIC_SERVER_ERROR);
    }
  });
};
