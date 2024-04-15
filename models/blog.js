import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const { Schema } = mongoose;

import User from "./user";
import Tag from "./tag";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 160,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
      minLength: 160,
      maxLength: 20000,
    },
    excerpt: {
      type: String,
      maxLength: 320,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: Tag,
      },
    ],
    featuredImage: String,
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

blogSchema.plugin(uniqueValidator, { message: "is already taken." });

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
