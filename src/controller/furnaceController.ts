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
import { CreateFurnaceDto, PutFurnaceDto } from "../dto";
import { HttpException } from "../exceptions";
import { FurnaceService } from "../services"; 

@Controller("/furnace")
class FurnaceController {
  private furnaceService : FurnaceService;
  constructor() {
    this.furnaceService = new FurnaceService();
  }

  @Get("/")
  async getList(@Response() res) {
    const temp = await this.furnaceService.list();
    if (temp) {
      res.send(temp).status(200);
    } else {
      throw new HttpException(500, "Internal error");
    }
  }
  @Post("/create")
  async postCreate(@Response() res, @Request() req) {
    const newFurnace = req.body as CreateFurnaceDto;
    const temp = await this.furnaceService.create(newFurnace);
    if (temp) {
      res.send(temp).status(201);
    } else {
      throw new HttpException(500, "Internal error");
    }
  }
  @Put('/:id') //>>
  async putById(@Response() res,@Request() req, @Params('id') id:string)
  {
    const changeFurnace = req.body as PutFurnaceDto;
    const temp = await this.furnaceService.putById(id,changeFurnace);
    if (temp) {
      res.send(temp).status(200);
    } else {
      throw new HttpException(500, "Internal error");
    }
  }
  @Get("/:id")
  async getById(@Response() res, @Params("id") id: string) {
    const temp = await this.furnaceService.readById(id);
    if (temp) {
      res.send(temp).status(200);
    } else {
      throw new HttpException(500, "Internal error");
    }
  }
  @Delete('/:id')
  async deleteById(@Response() res, @Params('id') id:string )
  {
      const temp = await this.furnaceService.deleteById(id);
      if (temp) {
        res.send(temp).status(200);
      } else {
        throw new HttpException(500, "Internal error");
      }
  }
  @Patch('/:id')
  async patchById(@Response() res,@Request() req, @Params('id') id:string)
  {
    const changeFurnace = req.body as PutFurnaceDto;
    const temp = await this.furnaceService.patchById(id,changeFurnace);
    if (temp) {
      res.send(temp).status(200);
    } else {
      throw new HttpException(500, "Internal error");
    }
  }
}
export default FurnaceController;