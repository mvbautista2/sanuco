import pkg from "mongoose";
const { Schema, model } = pkg;

const VideoSchema = new Schema({
    id: String,
    title: String,
    category: String,
    url: String,
    type: String,
});

export default model("Video", VideoSchema);
