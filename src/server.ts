import express from 'express';
import cors from 'cors';
import routes from './routes';

const LISTEN_PORT = 3333;

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(LISTEN_PORT, () => {
  console.log('🚀 Server started on port 3333');
});
