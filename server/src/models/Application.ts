import mongoose, { type InferSchemaType } from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    countryCode: {
      type: String,
      required: true,
      uppercase: true,
      minlength: 2,
      maxlength: 2,
      index: true,
    },
    countryName: { type: String, required: true, trim: true, maxlength: 100 },
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      index: true,
    },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    travelDate: { type: String, trim: true, maxlength: 30 },
    message: { type: String, trim: true, maxlength: 1500 },
    language: {
      type: String,
      enum: ["fr", "en", "ar", "tz"],
      default: "fr",
      required: true,
    },
    status: {
      type: String,
      enum: ["received", "in-review", "completed"],
      default: "received",
      required: true,
      index: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export type ApplicationDocument = InferSchemaType<typeof applicationSchema>;
export const Application = mongoose.model("Application", applicationSchema);
