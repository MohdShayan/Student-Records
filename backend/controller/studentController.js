import mongoose from "mongoose";
import STUDENT from "../model/studentSchema.js";

export const getAllStudents = async (req, res) => {
  const { course, age } = req.query;
  let query = {};
  if (course) {
    query.course = { $regex: course, $options: "i" };
  }
  if (age && !isNaN(Number(age))) {
    query.age = Number(age);
  }
  try {
    const allstudents = await STUDENT.find(query);
    if (allstudents.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }
    res.json(allstudents);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createStudent = async (req, res) => {
  const { name, age, course } = req.body;
  const student = new STUDENT({ name, age, course });
  try {
    await student.save();
    res.status(201).json({ message: "Student created successfully" });
  } catch (error) {
    res.status(500).json({
      success: "Error in creating the student",
      message: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const delstudent = await STUDENT.findByIdAndDelete(studentId);
    if (!delstudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: "Error in deleting the student",
      message: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const student = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid student ID" });
  }

  try {
    const updatedStudent = await STUDENT.findByIdAndUpdate(id, student, {
      new: true,
    });
    res
      .status(200)
      .json({
        message: "Student updated successfully",
        updatedSTudent: updatedStudent,
      });
  } catch (error) {
    console.error("Error updating student:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
