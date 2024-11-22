/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './medico/medico.entity'; 
import { Paciente } from './paciente/paciente.entity';
import { Diagnostico } from './diagnostico/diagnostico.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'parcial',
      entities: [Medico, Paciente, Diagnostico], 
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Medico, Paciente, Diagnostico]), 
  ],
})
export class AppModule {}
