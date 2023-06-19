import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    required: false,
    type: String,
  },
  githubId: {
    required: false,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
});

export default mongoose.model("User", userSchema);
