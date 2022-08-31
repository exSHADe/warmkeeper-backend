import { model, Schema, Document } from "mongoose";
import { Measure } from "../types/models";

const measureSchema: Schema = new Schema({
  furnaceId : {type:String},
  fuelLevel : {type:Number},
  temperature : {type:Number},
  powerSupply : {type:Boolean}
});
measureSchema.set("toJSON", {
  timestamps:true,
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) 
  {
    delete ret._id;
  }
});
const measureModel = model<MeasureDB & Document>("measure", measureSchema, "measure");

export default measureModel;
