import { Storage } from '@google-cloud/storage';

interface Request {
  audioFilePath: string;
}

class GCPUploadPodcastService {
  public async execute({ audioFilePath }: Request): Promise<any> {
    const bucketName = 'podcast-translator-bucket';
    const filename = audioFilePath;
    const storage = new Storage();

    const response = await storage.bucket(bucketName).upload(filename, {
      gzip: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });

    return response ? 200 : 500;
  }
}

export default GCPUploadPodcastService;
