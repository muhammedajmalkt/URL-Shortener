import mongoose from "mongoose";

const shortLinkSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const Url = mongoose.model("ShortLink", shortLinkSchema);
export default  Url
