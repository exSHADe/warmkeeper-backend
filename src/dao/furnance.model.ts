import { model, Schema, Document } from "mongoose";
import { Furnace } from "../types/models";

const furnaceSchema: Schema = new Schema({
  userId : {type:String},
  name : {type:String},
  typ : {type:String}
});
furnaceSchema.set("toJSON", {
  timestamps:true,
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) 
  {
    delete ret._id;
  }
});
const furnaceModel = model<Furnace & Document>("Furnace", furnaceSchema, "furnace");

export default furnaceModel;
