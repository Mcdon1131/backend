import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    roomType: {
      type: String,
      enum: ["Self-contained", "Single room", "Shared"],
      required: true,
    },
    facilities: { type: [String], default: [] },
    imgUrl: { type: String, required: true },
    description: { type: String, trim: true },
    distance: { type: String, trim: true },
    agentName: { type: String, required: true, trim: true },
    agentPhone: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Hostel", hostelSchema);
