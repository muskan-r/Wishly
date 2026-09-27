import mongoose from "mongoose";

const birthdayPageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    relationship: {
      type: String,
      trim: true,
      default: "",
    },

    traits: {
      type: String,
      required: true,
      trim: true,
    },

    photoUrl: {
      type: String,
      default: null,
    },

    songUrl: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      default: "",
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const BirthdayPage = mongoose.model("BirthdayPage", birthdayPageSchema);

export default BirthdayPage;