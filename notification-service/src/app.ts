import express, {Express} from "express";
import config from 'config'
import cors from 'cors';
import routes from './routes'

const port = config.get<number>('port')

const app: Express = express();

app.use(cors());

app.use(express.json());

app.listen(port, async () => {
  routes(app);
  console.log(`🚀 🔔 Notification Service Server is runnin on http://localhost:${port}`)
})