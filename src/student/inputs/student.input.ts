import { InputType, Field } from "@nestjs/graphql";
import { MinLength, IsString } from "class-validator";

@InputType()
export class CreateStudentInput {

  @MinLength(3)
  @IsString()
  @Field()
  firstname: string;

  @MinLength(3)
  @IsString()
  @Field()
  lastname: string;

}