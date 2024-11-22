/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, Body, BadRequestException } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { Paciente } from './paciente.entity';

@Controller('pacientes')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  async create(@Body() paciente: Partial<Paciente>): Promise<Paciente> {
    try {
      return await this.pacienteService.create(paciente);
    } catch (error) {
      if (error.message === 'El nombre del paciente debe tener al menos 3 caracteres.') {
        throw new BadRequestException(error.message);
      }
      throw error; // Lanzar otras excepciones que no sean de negocio
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Paciente> {
    return this.pacienteService.findOne(id);
  }

  @Get()
  findAll(): Promise<Paciente[]> {
    return this.pacienteService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.pacienteService.delete(id);
  }

  @Post(':pacienteId/medicos/:medicoId')
  addMedicoToPaciente(
    @Param('pacienteId') pacienteId: string,
    @Param('medicoId') medicoId: string,
  ): Promise<Paciente> {
    return this.pacienteService.addMedicoToPaciente(pacienteId, medicoId);
  }
}
