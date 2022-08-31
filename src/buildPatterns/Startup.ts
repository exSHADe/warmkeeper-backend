import { attachControllers, Controller } from "@decorators/express";
import * as cors from "cors";
import * as express from "express";
import * as mongoose from "mongoose";
import { LoginUserDto } from "../dto/LoginUser.dto";
import { HttpException } from "../exceptions";
import { errorMiddleware, loggerMiddleware } from "../middlewares";
import UserService from "../services/UserService";
import * as path from "path";
class Startup {
  public startup: express.Application;
  public port: string | number;
  public parser: express.NextFunction | null = null;
  private url: string;
  public options: Object | null;
  private mongoose: mongoose.Mongoose;
  public apiRouter = express.Router();
  constructor() {
    this.startup = express();
    this.mongoose = mongoose;
    if (process.env.NODE_ENV == "production") {
      this.url = `mongodb+srv://${process.env.userProd}@${process.env.cluster}/${process.env.dbProd}?${process.env.cloudSetting}`;
    } else {
      this.url = `mongodb+srv://${process.env.userDev}@${process.env.cluster}/${process.env.dbDev}?${process.env.cloudSetting}`;
    }
  }
  setPort(port?: number): Startup {
    this.port = process.env.PORT || port;
    return this;
  }
  withBodyParser(p: any): Startup {
    this.parser = p;
    this.startup.use(p);
    return this;
  }
  withLogger(): Startup {
    this.startup.use(loggerMiddleware);
    return this;
  }
  setCors(): Startup {
    this.startup.use(cors());
    return this;
  }
  withErrorHandlerMiddleware(): Startup {
    this.startup.use(errorMiddleware);
    return this;
  }
  testCall(): Startup {
    // this.startup.get("/", (req, res) => {
    //   res.send({ greeting: "Server running. Hello cruel world." });
    // });
    this.startup.get("/", async (req, res) => {
      let x = await new UserService().get({
        username: "user",
        password: "pwd",
      } as LoginUserDto);
      res.send(x);
    });
    return this;
  }
  testPost(): Startup {
    this.startup.post("/test", (req, res) => {
      res.send({ timestamp: Date.now() });
    });
    return this;
  }
  setMongoOptions(options: Object): Startup {
    this.options = options;
    return this;
  }
  connectMongo(): Startup {
    if (process.env.NODE_ENV !== "production") {
      this.mongoose.set("debug", true);
    }
    this.mongoose
      .connect(process.env.MONGODB_URI || this.url, this.options)
      .then(() => {
        console.log("🟢 The database is connected.");
        this.mongoose.Promise = global.Promise;
      })
      .catch((err: Error) => {
        throw new HttpException(500, "🔴 Unable to connect to the database.");
      });
    return this;
  }
  listening(): Startup {
    this.startup.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}  `);
    });
    return this;
  }
  attachRouter(route: string, controllers: any): Startup {
    attachControllers(this.apiRouter, controllers);
    this.startup.use(route, this.apiRouter);
    return this;
  }
  buildReact(pathReact : string)
  {
    this.startup.use(express.static(path.join(__dirname,pathReact)))
    this.startup.get('/*',
    (req,res) => {
      res.sendFile(path.join(__dirname, pathReact,'index.html'))
    })
    return this;
  }
}
export default Startup;

/*
throwError(err: string): never {
    throw new Error(err);
  }  
  app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
*/
