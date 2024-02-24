import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import 'reflect-metadata';
import 'es6-shim';

import errorMiddleware from './v1/Middlewares/errorMiddleware';
import { closeDatabaseConnection, connectToDatabase } from './DBConfig';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeDataBase();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();

    // Bind SIGINT handler to the instance of the class
    // this.handleSIGINT = this.handleSIGINT.bind(this);
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.options('*', cors());
    this.app.use(bodyParser.json());

    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.setHeader('X-Powered-By', 'Express');
        next();
      }
    );
    this.app.use(cookieParser());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use('/api/v1/', controller.router);
    });
  }

  private initializeDataBase() {
    connectToDatabase()
      .then(() => {
        this.app.listen(this.port, () => {
          console.log(`Server is running on http://localhost:${this.port}`);
        });
      })
      .catch((error) => {
        console.error('Error starting the server:', error);
      });

    // Attach SIGINT signal handler
    process.on('SIGINT', this.handleSIGINT);
  }

  private async handleSIGINT() {
    try {
      await closeDatabaseConnection();
      console.log('Database connection closed');
      process.exit(0);
    } catch (error) {
      console.error('Error closing the connection:', error);
      process.exit(1);
    }
  }
}

export default App;
