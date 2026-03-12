import path from 'path';
import DBconnection from "../../config/database";
import fs from 'fs';
import courseModel from "../../model/courseModel";
import dotenv from 'dotenv';

// dotenv config
dotenv.config({ path: path.join(__dirname, '../../config.env') });

// connect to DB
DBconnection();

// Read data
const coursesFile = path.join(__dirname, 'course.json');
let courses = [];
if (fs.existsSync(coursesFile)) {
    courses = JSON.parse(fs.readFileSync(coursesFile, 'utf-8'));
}

// Insert data into DB
const insertData = async () => {
    try {
        if (courses.length > 0) {
            await courseModel.create(courses);
            console.log('Data Inserted');
        } else {
            console.log('No course data found');
        }
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// Delete data from DB
const destroyData = async () => {
    try {
        await courseModel.deleteMany();
        console.log('Data Destroyed');
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

if (process.argv[2] === '-i') {
    insertData();
} else if (process.argv[2] === '-d') {
    destroyData();
}