import { Request, Response, Router } from 'express';

const podcastRouter = Router();

podcastRouter.patch('/upload', (request: Request, response: Response) => {
  console.log(request);
  response.send(200);
});

export default podcastRouter;
