import multer from 'multer';
import path from 'path';

import { Request, Response, Router } from 'express';

import CheckPodcastFileService from '../services/CheckPodcastFileService';
import GCPUploadPodcastService from '../services/GCPUploadPodcastService';

import uploadConfig from '../config/upload';

const podcastRouter = Router();
const upload = multer(uploadConfig);

podcastRouter.patch(
  '/upload',
  upload.single('podcast_file'),
  async (request: Request, response: Response) => {
    try {
      const { filename } = request.file;
      const checkUploadPodcast = new CheckPodcastFileService();
      const audioFile = await checkUploadPodcast.execute({
        audioFileName: filename,
      });

      if (audioFile) {
        const gcpUploadPodcast = new GCPUploadPodcastService();
        const audioFilePath = path.resolve(
          __dirname,
          '..',
          '..',
          'tmp',
          filename,
        );
        const uploadFile = gcpUploadPodcast.execute({ audioFilePath });
        return uploadFile ? response.sendStatus(200) : response.sendStatus(500);
      }

      return response.sendStatus(500);
    } catch (error) {
      return response.sendStatus(500);
    }
  },
);

export default podcastRouter;
