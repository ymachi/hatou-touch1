import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

   visitor: {
      lastname: {
         type: String,
         required: true,
         uppercase: true, 
         trim: true,
         minlength: 3,
         maxLength: 255
      },

      firstname: {
         type: String,
         required: true,
         lowercase: true,
         trim: true,
         minlength: 3,
         maxLength: 255
      },

      email: {
         type: String,
         required: true,
         lowercase: true,
         maxLength: 320
      },

      tel: {
         type: String,
         required: true,
      },

      address: {
         type: String,
         required: true,
      },
   },
   
   userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
   },
   
   boxsId: {
      type: Array,
      required: true,
      default: []
   },
   
   totalPrice: {
      type: Number,
      required: true,
   },
   
   numberOrder:{
      type: String,
      required: true,
      unique: true
   },
   
   message: {
      type: String,
   },
   
   
   remise: {
      type: Boolean,
      default: false
   },

   delivery: {
      type: Boolean,
      default: false
   },
   
   status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "refused"],
      default: "pending"
   },
   
   
   
}, {
   timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

export default Order;