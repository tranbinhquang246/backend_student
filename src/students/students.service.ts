import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/createStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { Student, StudentDocument } from './schema/student.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async getAllStudents(): Promise<Student[]> {
    const data = this.studentModel.find().exec();
    return data;
  }

  async getOneStudents(studentId: string) {
    const findStudent = await this.studentModel.findById(studentId);
    if (!findStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return findStudent;
  }

  async createStudent(
    createStudentDto: CreateStudentDto,
    @Res() response,
  ): Promise<Student> {
    const newStudent = await new this.studentModel(createStudentDto).save();
    if (!newStudent) {
      throw new BadRequestException(`Request Failed`);
    }
    return response.json({
      message: 'Student has been successfully created',
    });
  }

  async deleteStudent(studentId: string, @Res() response) {
    const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return response.json({
      message: 'Student has been successfully deleted',
    });
  }

  async updateStudent(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
    @Res() response,
  ) {
    const updateStudent = await this.studentModel.findByIdAndUpdate(
      studentId,
      updateStudentDto,
      { new: true },
    );
    if (!updateStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return response.json({
      message: 'Student has been successfully updated',
    });
  }
}
