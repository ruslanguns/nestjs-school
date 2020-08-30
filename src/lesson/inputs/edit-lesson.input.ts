import { InputType, PartialType } from "@nestjs/graphql";
import { CreateLessonInput } from "./lesson.input";

@InputType()
export class EditLessonInput extends PartialType(CreateLessonInput) {}
