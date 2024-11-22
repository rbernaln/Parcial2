/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoModule } from './medico/medico.module'; 
import { PacienteModule } from './paciente/paciente.module'; 
import { DiagnosticoModule } from './diagnostico/diagnostico.module'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'parcial',
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    MedicoModule, 
    PacienteModule, 
    DiagnosticoModule, 
  ],
})
export class AppModule {}
