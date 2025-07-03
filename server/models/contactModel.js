import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
   
   lastname: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      minLength: 3,
      maxLength: 20
   },
   
   firstname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxLength: 20
   },
   
   email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxLength: 320
   },
   
   tel: {
      type: String,
      required: true,
      unique: true
   },
   
   message: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 3000,
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

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;