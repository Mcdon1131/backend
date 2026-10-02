import express from "express";
import Hostel from "../model/hostelModel.js";
import { generateImageUrl } from "../utilities/uploadImageUtils.js";
import upload from "../middleware/imageUploadMiddleware.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const hostels = await Hostel.find();
  return res.json({ success: true, data: hostels });
});

router.get("/:id", async (req, res) => {
  const hostel = await Hostel.findById(req.params.id);
  if (!hostel) {
    return res
      .status(404)
      .json({ success: false, message: "Hostel not found" });
  }
  return res.json({ success: true, data: hostel });
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, location, price, roomType, description, distance, agentName, agentPhone } = req.body;
    // one tick arrives as a string, several as an array, none as undefined
    const facilities = [].concat(req.body.facilities || []);
    const img = await generateImageUrl(req.file);

    const newHostel = await Hostel.create({
      name, location, price, roomType, facilities,
      description, distance, agentName, agentPhone,
      imgUrl: img.secure_url,
    });

    return res.status(201).json({
      success: true,
      data: newHostel,
      message: "Hostel created successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});
export default router;
