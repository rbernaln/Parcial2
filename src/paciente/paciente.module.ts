/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './paciente.entity';
import { Medico } from '../medico/medico.entity'; 
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente, Medico])], // Registrar Medico
  controllers: [PacienteController],
  providers: [PacienteService],
})
export class PacienteModule {}
