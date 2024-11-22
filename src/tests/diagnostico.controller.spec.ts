/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoController } from '../diagnostico/diagnostico.controller';
import { DiagnosticoService } from '../diagnostico/diagnostico.service';
import { Diagnostico } from '../diagnostico/diagnostico.entity';
import { NotFoundException } from '@nestjs/common';

describe('DiagnosticoController', () => {
  let controller: DiagnosticoController;
  let service: DiagnosticoService;

  const mockDiagnostico: Diagnostico = {
    id: '1',
    nombre: 'Gripe',
    descripcion: 'Infección viral común',
    paciente: null, // Puedes añadir un objeto de paciente mock si es necesario
  };

  const mockDiagnosticoService = {
    create: jest.fn((dto) => Promise.resolve({ id: '1', ...dto })),
    findOne: jest.fn((id) =>
      id === '1' ? Promise.resolve(mockDiagnostico) : Promise.reject(new NotFoundException()),
    ),
    findAll: jest.fn(() => Promise.resolve([mockDiagnostico])),
    delete: jest.fn((id) =>
      id === '1' ? Promise.resolve() : Promise.reject(new NotFoundException()),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosticoController],
      providers: [
        {
          provide: DiagnosticoService,
          useValue: mockDiagnosticoService,
        },
      ],
    }).compile();

    controller = module.get<DiagnosticoController>(DiagnosticoController);
    service = module.get<DiagnosticoService>(DiagnosticoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new diagnostico', async () => {
      const dto = { nombre: 'Gripe', descripcion: 'Infección viral común' };
      const result = await controller.create(dto);
      expect(result).toEqual({ id: '1', ...dto });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('should return a diagnostico by ID', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockDiagnostico);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if diagnostico is not found', async () => {
      await expect(controller.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all diagnosticos', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockDiagnostico]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a diagnostico by ID', async () => {
      await expect(controller.delete('1')).resolves.not.toThrow();
      expect(service.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if diagnostico is not found', async () => {
      await expect(controller.delete('2')).rejects.toThrow(NotFoundException);
    });
  });
});
