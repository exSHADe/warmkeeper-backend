import {
    Controller,
    Delete,
    Get,
    Params,
    Patch,
    Post,
    Put,
    Request,
    Response,
  } from "@decorators/express";
import { CreateMeasureDto, PutMeasureDto } from "../dto";
import { HttpException } from "../exceptions";
import { AuthMiddleware } from "../middlewares";
import { MeasureService } from "../services";

@Controller("/measure")
class MeasureController {
  private measureService : MeasureService;
  constructor() {
    this.measureService = new MeasureService();
  }

  @Get("/",[AuthMiddleware])
  async getList(@Response() res) {
    const temp = await this.measureService.list();
    if (temp) {
      res.send(temp).status(200);
    } else {
      throw new HttpException(500, "Internal error");
    }
  }
  @Post("/create")
  async postCreate(@Response() res, @Request() req) {
    const measure = req.body as CreateMeasureDto;
    const temp = await this.measureService.create(measure);
    if (temp) {
      res.send(temp).status(201);
    } else {
      throw new HttpException(500, "Internal error");
    }
  }
  @Put('/:id',[AuthMiddleware]) //>>
  async putById(@Response() res,@Request() req, @Params('id') id:string)
  {
    const changeMeasure = req.body as PutMeasureDto;
    const temp = await this.measureService.putById(id,changeMeasure);
    if (temp) {
      res.send(temp).status(200);
    } else {
      throw new HttpException(500, "Internal error");
    }
  }
  @Get("/:id",[AuthMiddleware])
  async getById(@Response() res, @Params("id") id: string) {
    const temp = await this.measureService.readById(id);
    if (temp) {
      res.send(temp).status(200);
    } else {
      throw new HttpException(500, "Internal error");
    }
  }
  @Delete('/:id',[AuthMiddleware])
  async deleteById(@Response() res, @Params('id') id:string )
  {
      const temp = await this.measureService.deleteById(id);
      if (temp) {
        res.send(temp).status(200);
      } else {
        throw new HttpException(500, "Internal error");
      }
  }
  @Patch('/:id',[AuthMiddleware])
  async patchById(@Response() res,@Request() req, @Params('id') id:string)
  {
    const changeMeasure = req.body as PutMeasureDto;
    const temp = await this.measureService.patchById(id,changeMeasure);
    if (temp) {
      res.send(temp).status(200);
    } else {
      throw new HttpException(500, "Internal error");
    }
  }
}
export default MeasureController;