/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diagnostico } from './diagnostico.entity';

@Injectable()
export class DiagnosticoService {
  constructor(
    @InjectRepository(Diagnostico)
    private readonly diagnosticoRepository: Repository<Diagnostico>,
  ) {}

  async create(diagnostico: Partial<Diagnostico>): Promise<Diagnostico> {
    if (!diagnostico.descripcion || diagnostico.descripcion.length > 200) {
      throw new Error('La descripción debe tener como máximo 200 caracteres.');
    }
    const nuevoDiagnostico = this.diagnosticoRepository.create(diagnostico);
    return this.diagnosticoRepository.save(nuevoDiagnostico);
  }

  async findOne(id: string): Promise<Diagnostico> {
    const diagnostico = await this.diagnosticoRepository.findOne({ where: { id } });
    if (!diagnostico) throw new NotFoundException('Diagnóstico no encontrado');
    return diagnostico;
  }

  async findAll(): Promise<Diagnostico[]> {
    return this.diagnosticoRepository.find();
  }

  async delete(id: string): Promise<void> {
    await this.diagnosticoRepository.delete(id);
  }
}
