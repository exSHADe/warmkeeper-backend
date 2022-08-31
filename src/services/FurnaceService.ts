import { furnaceModel } from "../dao";
import { CreateFurnaceDto, PutFurnaceDto } from "../dto";
import { HttpException } from "../exceptions";
import { CRUD } from "../types/interfaces/crud.interface";
import { Furnace } from "../types/models";

class FurnaceService implements CRUD<Furnace | string>
{
    private dbContext = furnaceModel;
    constructor() {}
    async list(): Promise<Array<Furnace>> 
    {
        const furnaceContext = await this.dbContext.find();
        return furnaceContext as Array<Furnace>;
    }
    async create(resource : CreateFurnaceDto) : Promise<Furnace>
    {
        if (!resource) throw new HttpException(400, "Given resources are empty");
        const createdFurnace = await this.dbContext.create(resource);
        return createdFurnace as Furnace;
    }
    async putById(id:string,resource:PutFurnaceDto) : Promise<Furnace>
    {
        const furnaceContext = await this.dbContext.findById(id);
        if (!resource) throw new HttpException(400, "Given resources are empty");
        if (!furnaceContext) return null;
        Object.assign(furnaceContext,resource);
        await furnaceContext.save();
        return furnaceContext as Furnace;
    }
    async readById(id:string): Promise<Furnace>
    {
        const furnaceContext = await this.dbContext.findById(id);
        if (!furnaceContext) return null;
        return furnaceContext as Furnace;
    }
    async deleteById(id: string): Promise<string | null> {
        const furnaceContext = await this.dbContext.findById(id);
        if (!furnaceContext) return null;
        await furnaceContext.deleteOne({id:id});
        return `Furnace ${furnaceContext.name} has been removed.`
    }
    async patchById(id:string, resource: PutFurnaceDto) : Promise<Furnace|null>
    {
        const furnaceContext = await this.dbContext.findById(id);
        if (!resource) throw new HttpException(400, "Given resources are empty");
        if (!furnaceContext) return null;
        if (furnaceContext.name != resource.name && resource.name != null)
        {
            Object.assign(furnaceContext, {name: resource.name });
            await furnaceContext.save();
        }
        if(furnaceContext.userId != resource.userId && resource.userId != null)
        {
            Object.assign(furnaceContext, {userId: resource.userId});
            await furnaceContext.save();
        }
        if(furnaceContext.typ != resource.typ && resource.typ != null)
        {
            Object.assign(furnaceContext, {typ: resource.typ});
            await furnaceContext.save();
        }
        return furnaceContext as Furnace;
    }
}
export default FurnaceService;