/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './medico.entity';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  async create(medico: Partial<Medico>): Promise<Medico> {
    if (!medico.nombre || !medico.especialidad) {
      throw new Error('Nombre y especialidad son obligatorios.');
    }
    const nuevoMedico = this.medicoRepository.create(medico);
    return this.medicoRepository.save(nuevoMedico);
  }

  async findOne(id: string): Promise<Medico> {
    const medico = await this.medicoRepository.findOne({ where: { id } });
    if (!medico) throw new NotFoundException('Médico no encontrado');
    return medico;
  }

  async findAll(): Promise<Medico[]> {
    return this.medicoRepository.find();
  }

  async delete(id: string): Promise<void> {
    const medico = await this.medicoRepository.findOne({
      where: { id },
      relations: ['pacientes'],
    });
    if (medico.pacientes.length > 0) {
      throw new Error('No se puede eliminar un médico con pacientes asociados.');
    }
    await this.medicoRepository.delete(id);
  }
}
