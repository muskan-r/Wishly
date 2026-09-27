import BirthdayPage from "../models/BirthdayPage.js";
import crypto from "crypto";
import { generateBirthdayMessage } from "../services/aiService.js";

/* ----------------------------------
   Create Birthday Page
---------------------------------- */
export const createPage = async (req, res) => {
  try {
    const {
      name,
      relationship,
      traits,
      photoUrl,
      songUrl,
    } = req.body;

    /* ------------------------------
       Validation
    ------------------------------ */

    if (!name?.trim() || !traits?.trim()) {
      return res.status(400).json({
        message: "Name and traits are required.",
      });
    }

    /* ------------------------------
       Generate AI message
    ------------------------------ */

    const message = await generateBirthdayMessage({
      name: name.trim(),
      relationship: relationship?.trim() || "",
      traits: traits.trim(),
    });

    /* ------------------------------
       Create unique slug
    ------------------------------ */

    const cleanName = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const randomId = crypto
      .randomBytes(3)
      .toString("hex");

    const slug = `${cleanName}-${randomId}`;

    /* ------------------------------
       Save to MongoDB
    ------------------------------ */

    const page = await BirthdayPage.create({
      name: name.trim(),
      relationship: relationship?.trim() || "",
      traits: traits.trim(),
      photoUrl: photoUrl || null,
      songUrl: songUrl?.trim() || "",
      message,
      slug,
    });

    /* ------------------------------
       Response
    ------------------------------ */

    res.status(201).json({
      message: "Birthday page created successfully ✨",
      slug: page.slug,
    });

  } catch (error) {
    console.error("Create page error:", error);

    res.status(500).json({
      message: "Failed to create birthday page.",
    });
  }
};
/* ----------------------------------
   Get Birthday Page
---------------------------------- */

export const getPage = async (req, res) => {
  try {
    const { slug } = req.params;

    const page = await BirthdayPage.findOne({ slug });

    if (!page) {
      return res.status(404).json({
        message: "Birthday page not found.",
      });
    }

    res.status(200).json({
      page,
    });
  } catch (error) {
    console.error("Get page error:", error);

    res.status(500).json({
      message: "Failed to load birthday page.",
    });
  }
};
