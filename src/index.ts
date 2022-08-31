import Startup from "./buildPatterns/Startup";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import { FurnaceController, LoginController, UserController , MeasureController} from "./controller";
dotenv.config({ path: __dirname + "/.env" });
process.on("uncaughtException", (reason, p) => {
  console.error(reason);
});
process.on("unhandledRejection", (reason, p) => {
  console.log(reason);
});
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const server = new Startup()
  .setPort(3000)
  .setMongoOptions(options)
  .connectMongo()
  .withErrorHandlerMiddleware()
  .withLogger()
  .setCors()
  .withBodyParser(bodyParser.json())
  .withBodyParser(bodyParser.urlencoded({ extended: true }))
  .attachRouter('/api',[UserController,LoginController,FurnaceController,MeasureController])
  .listening()
  .buildReact('build')
  .testCall()
  .testPost();
