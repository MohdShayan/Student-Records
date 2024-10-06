import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 1
    },
    course: {
        type: String,
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true 
});

const STUDENT = mongoose.model('Student', studentSchema);
export default STUDENT;
