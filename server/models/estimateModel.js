import mongoose from "mongoose";

const estimateSchema = new mongoose.Schema(
  {
    lastname: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },

    firstname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxLength: 320,
    },

    tel: {
      type: String,
      required: true,
      unique: true,
    },

    address: {
      type: String,
      required: true,
    },

    invited: {
      type: Number,
      required: true,
      default: 20,
    },

    event: {
      type: String,
      required: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    message: {
      type: String,
      required: false,
    },

    compagny: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "refused"],
      default: "pending",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const Estimate = mongoose.model("Estimate", estimateSchema);

export default Estimate;
