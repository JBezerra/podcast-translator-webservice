import speech from '@google-cloud/speech';
import gcpCredentials from '../config/gcp';

interface Request {
  data: { gcpBucketFileUrl: string };
}

export default {
  key: 'GCPSpeechToText',
  async execute({ data }: Request): any {
    const { gcpBucketFileUrl } = data;
    console.log(gcpBucketFileUrl);
    const client = new speech.SpeechClient({
      credentials: gcpCredentials,
    });
    const audio = {
      uri: gcpBucketFileUrl,
    };
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'pt-BR',
    };
    const request = {
      audio,
      config,
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  },
};
