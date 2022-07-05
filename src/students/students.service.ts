import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStudentDto } from "./dto/createStudent.dto";
import { UpdateStudentDto } from "./dto/updateStudent.dto";
import { Student, StudentDocument} from "./schema/student.schema";

@Injectable()
export class StudentsService {
    constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) {}


    async getAllStudents(): Promise<Student[]> {
        return this.studentModel.find().exec()
    }

    async getOneStudents(studentId:string): Promise<Student[]> {
        return this.studentModel.findById(studentId);
    }

    async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
        const newStudent = new this.studentModel(createStudentDto).save();
        return newStudent;
    }

    async deleteStudent(studentId: string) {
        const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
        if (!deletedStudent) {
          throw new NotFoundException(`Student #${studentId} not found`);
        }
        return this.studentModel.find().exec();
    }

    async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto) {
        const existingStudent = await this.studentModel.findByIdAndUpdate(studentId, updateStudentDto, { new: true });
       if (!existingStudent) {
         throw new NotFoundException(`Student #${studentId} not found`);
       }
       return this.studentModel.find().exec();
    }
}

