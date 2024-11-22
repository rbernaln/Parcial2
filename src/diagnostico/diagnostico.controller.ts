/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { DiagnosticoService } from './diagnostico.service';
import { Diagnostico } from './diagnostico.entity';

@Controller('diagnosticos')
export class DiagnosticoController {
  constructor(private readonly diagnosticoService: DiagnosticoService) {}

  @Post()
  create(@Body() diagnostico: Partial<Diagnostico>): Promise<Diagnostico> {
    return this.diagnosticoService.create(diagnostico);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Diagnostico> {
    return this.diagnosticoService.findOne(id);
  }

  @Get()
  findAll(): Promise<Diagnostico[]> {
    return this.diagnosticoService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.diagnosticoService.delete(id);
  }
}
