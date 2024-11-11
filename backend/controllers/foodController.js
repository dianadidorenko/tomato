import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import foodModel from "../models/foodModel.js";

// Добавление элемента пищи
const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const imageFile = req.file;

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const imageUrl = imageFile.filename;

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      image: imageUrl,
      date: Date.now(),
    };

    const product = new foodModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding food item" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error getting food list" });
  }
};

// Получаем путь к текущему файлу
const __filename = fileURLToPath(import.meta.url);
// Получаем путь к текущей директории
const __dirname = dirname(__filename);

const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "ID is required" });
    }

    const food = await foodModel.findById(id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    if (food.image) {
      const imagePath = join(__dirname, "..", "uploads", food.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await foodModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error removing food item" });
  }
};

export { addFood, listFood, removeFood };
