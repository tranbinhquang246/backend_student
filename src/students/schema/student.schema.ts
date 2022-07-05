import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StudentDocument = Student & Document;

@Schema()
export class Student {

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    age: number;

    @Prop()
    classroom: string;

    @Prop()
    avatar: string;
}


export const StudentSchema = SchemaFactory.createForClass(Student);