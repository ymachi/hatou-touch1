import mongoose from "mongoose";

const boxSchema = new mongoose.Schema({
   
   name: {
      type: String,
      required: true,
      minLength: 5,
   },
   
   category: {
      type: String,
      required: true,
   },
   
   image: {
      type: String,
      required: true,
      default: "default-product.png"
   },
   
   description: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
   },
   
   price:{
      amount: {
         type: Number,
         required: true,
         default: 0,
         min: 0,
         max: 9999,
      },
      
      currency: {
         type: String,
         enum: ["EUR"],
         required: true,
         default: "EUR"      
      }
      
      
},

  ingredients : [],

   

},{
   timestamps: true // createdAt, updateAT
})

const Box = mongoose.model("Box", boxSchema);

export default Box