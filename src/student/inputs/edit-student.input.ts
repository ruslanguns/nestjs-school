import { InputType, PartialType } from "@nestjs/graphql";
import { CreateStudentInput } from "./student.input";


@InputType()
export class EditStudentInput extends PartialType(CreateStudentInput) {}