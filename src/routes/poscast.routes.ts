import multer from 'multer';
import { Request, Response, Router } from 'express';

import CheckUploadPodcastService from '../services/CheckUploadPodcastService';

import uploadConfig from '../config/upload';

const podcastRouter = Router();
const upload = multer(uploadConfig);

podcastRouter.patch(
  '/upload',
  upload.single('podcast_file'),
  async (request: Request, response: Response) => {
    try {
      const { filename } = request.file;
      const checkUploadPodcast = new CheckUploadPodcastService();
      const audioFile = await checkUploadPodcast.execute({
        audioFileName: filename,
      });
      return audioFile ? response.sendStatus(200) : response.sendStatus(500);
    } catch (error) {
      return response.sendStatus(500);
    }
  },
);

export default podcastRouter;
