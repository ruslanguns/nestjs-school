import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './lesson/lesson.entity';
import { Student } from './student/student.entity';
import { StudentModule } from './student/student.module';
import { UpperCaseDirective } from './shared/directives';
import { DATABASE_CONFIG } from './config/constants';
import databaseConfig from './config/database.config';
import serverConfig from './config/server.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig, serverConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        url: config.get<string>(DATABASE_CONFIG),
        synchronize: true,
        useUnifiedTopology: true,
        entities: [
          Lesson,
          Student
        ]
      })
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      schemaDirectives: {
        upper: UpperCaseDirective
      }
    }),
    LessonModule,
    StudentModule
  ],
})
export class AppModule {}
