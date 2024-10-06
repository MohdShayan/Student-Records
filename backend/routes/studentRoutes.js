import express from "express";
import { updateStudent,deleteStudent,createStudent, getAllStudents } from "../controller/studentController.js";

const router= express.Router();

router.post('/',createStudent);
router.get('/',getAllStudents);
router.delete('/:id',deleteStudent)
router.put('/:id',updateStudent)


export default router