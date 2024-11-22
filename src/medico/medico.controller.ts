/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { Medico } from './medico.entity';

@Controller('medicos')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Post()
  create(@Body() medico: Partial<Medico>): Promise<Medico> {
    return this.medicoService.create(medico);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Medico> {
    return this.medicoService.findOne(id);
  }

  @Get()
  findAll(): Promise<Medico[]> {
    return this.medicoService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.medicoService.delete(id);
  }
}
