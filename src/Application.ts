import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from '../spec/swagger.json';
import { RegisterRoutes } from './tsoa-routes';


class App {
  public app: Express;

  constructor() {
    this.app = express();
    dotenv.config();
    this.setupMiddlewares();
    this.startServer();
    this.setupRoutes();
  }

  private setupMiddlewares(): void {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    const corsOptions = {
      origin: 'http://localhost:3000',
      credentials: true,
    };
    this.app.use(cors(corsOptions));
  }

  private async startServer(): Promise<void> {
    this.app.listen(process.env.PORT, async () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  }

  private setupRoutes(): void {
    this.app.use('/swagger-ui.html', serve, setup(swaggerDocument));
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.url === '/') {
        res.redirect('/swagger-ui.html');
      }
      next();
    });
    this.app.get('/v2/api-docs', (req: Request, res: Response) => {
      res.json(swaggerDocument);
    });
    RegisterRoutes(this.app);
  }
}

new App();

export default App;