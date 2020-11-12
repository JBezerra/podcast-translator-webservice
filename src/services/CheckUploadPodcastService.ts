import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';

interface Request {
  audioFileName: string;
}

class CheckUploadPodcastService {
  public async execute({ audioFileName }: Request): Promise<any> {
    const podcastFilePath = path.join(uploadConfig.directory, audioFileName);
    const podcastFileExists = await fs.promises.stat(podcastFilePath);
    return podcastFileExists;
  }
}

export default CheckUploadPodcastService;