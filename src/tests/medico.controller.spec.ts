/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MedicoController } from '../medico/medico.controller';
import { MedicoService } from '../medico/medico.service';
import { Medico } from '../medico/medico.entity';
import { NotFoundException } from '@nestjs/common';

describe('MedicoController', () => {
  let controller: MedicoController;
  let service: MedicoService;

  const mockMedico: Medico = {
    id: '1',
    nombre: 'Dr. Juan Pérez',
    especialidad: 'Cardiología',
    telefono: '123456789',
    pacientes: [],
  };

  const mockMedicoService = {
    create: jest.fn((medico) => Promise.resolve({ id: '1', ...medico })),
    findOne: jest.fn((id) =>
      id === '1' ? Promise.resolve(mockMedico) : Promise.reject(new NotFoundException()),
    ),
    findAll: jest.fn(() => Promise.resolve([mockMedico])),
    delete: jest.fn((id) =>
      id === '1' ? Promise.resolve() : Promise.reject(new NotFoundException()),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicoController],
      providers: [
        {
          provide: MedicoService,
          useValue: mockMedicoService,
        },
      ],
    }).compile();

    controller = module.get<MedicoController>(MedicoController);
    service = module.get<MedicoService>(MedicoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new medico', async () => {
      const dto = { nombre: 'Dr. Juan Pérez', especialidad: 'Cardiología', telefono: '123456789' };
      const result = await controller.create(dto);
      expect(result).toEqual({ id: '1', ...dto });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('should return a medico by ID', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockMedico);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if medico is not found', async () => {
      await expect(controller.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all medicos', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockMedico]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a medico by ID', async () => {
      await expect(controller.delete('1')).resolves.not.toThrow();
      expect(service.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if medico is not found', async () => {
      await expect(controller.delete('2')).rejects.toThrow(NotFoundException);
    });
  });
});
