import mongoose from "mongoose";
// import bcrypt from 'bcrypt'
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "In Progress"],
      default: "Pending",
    },
    location: {
      type: String,
    },
    climateDescription: {
      type: String,
    },
    temperature: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
