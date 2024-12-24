import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
    contentType: { type: String, required: true },
    url: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
});

const Image = mongoose.models.Image || mongoose.model("Image", ImageSchema);

export default Image;
