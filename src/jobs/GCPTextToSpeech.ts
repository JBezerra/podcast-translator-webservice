import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import util from 'util';

import gcpCredentials from '../config/gcp';

interface Request {
  data: { originalText: string };
}

export default {
  key: 'GCPTextToSpeech',
  async execute({ data }: Request): any {
    const client = new textToSpeech.TextToSpeechClient({
      credentials: gcpCredentials,
    });
    const { originalText } = data;
    const text = originalText;

    // Construct the request
    const request = {
      input: { text },
      voice: { languageCode: 'en-US-Wavenet-A', ssmlGender: 'FEMALE' },
      audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('./tmp/output/output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
  },
};
