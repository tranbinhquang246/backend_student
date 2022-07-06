import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/createStudent.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { Student } from './schema/student.schema';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentsServices: StudentsService) {}

  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this.studentsServices.getAllStudents();
  }

  @Get(':studentId')
  async getOneStudents(@Param('studentId') studentId: string) {
    return this.studentsServices.getOneStudents(studentId);
  }

  @Post()
  async createStudent(
    @Body() createUserDto: CreateStudentDto,
    @Res() response,
  ): Promise<Student> {
    return this.studentsServices.createStudent(createUserDto, response);
  }
  @Put('/:id')
  async updateStudent(
    @Res() response,
    @Param('id') studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsServices.updateStudent(
      studentId,
      updateStudentDto,
      response,
    );
  }

  @Delete(':studentId')
  async remove(@Param('studentId') studentId: string, @Res() response) {
    return this.studentsServices.deleteStudent(studentId, response);
  }
}
