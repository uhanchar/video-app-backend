import { Router, Response } from 'express';
import multer from 'multer';

import * as uploadVideoService from '../../services/upload-video.service';
import { HttpStatus } from '../../constants/http-status';
import { ErrorMessages } from '../../constants/error-messages.enum';

const route = Router();
const upload = multer({ dest: 'db/media/videos' });

export default (app: Router) => {
  app.use('/upload-video', route);

  route.post('', upload.single('file'), async (req, res: Response) => {
    try {
      await uploadVideoService.uploadVideoData(req.body, req.file.filename);

      res.send();
    } catch (error) {
      res.status(HttpStatus.ServerError).send(ErrorMessages.GENERIC_SERVER_ERROR);
    }
  });
};
