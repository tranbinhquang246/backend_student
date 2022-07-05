import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { CreateStudentDto } from "./dto/createStudent.dto";
import { UpdateStudentDto } from "./dto/updateStudent.dto";
import { Student } from "./schema/student.schema";
import { StudentsService } from "./students.service";

@Controller('students')
export class StudentController {
    constructor(private readonly studentsServices:StudentsService){}

    @Get()
        async getAllStudents(): Promise<Student[]> {
            return this.studentsServices.getAllStudents();
    }

    @Get(':studentId')
        async getOneStudents(@Param('studentId') studentId: string): Promise<Student[]> {
            return this.studentsServices.getOneStudents(studentId);
    }

    @Post()
        async createStudent(@Body() createUserDto: CreateStudentDto): Promise<Student> {
            return this.studentsServices.createStudent(createUserDto)
  } 
    @Put('/:id')
    async updateStudent(@Res() response,@Param('id') studentId: string,
        @Body() updateStudentDto: UpdateStudentDto) {
            try {
            const existingStudent = await this.studentsServices.updateStudent(studentId, updateStudentDto);
            return response.status(HttpStatus.OK).json({
            message: 'Student has been successfully updated',
            existingStudent,});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete(':studentId')
        async remove(@Param('studentId') studentId: string) {
            return this.studentsServices.deleteStudent(studentId);
    }


}