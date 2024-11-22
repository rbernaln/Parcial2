/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PacienteController } from '../paciente/paciente.controller';
import { PacienteService } from '../paciente/paciente.service';
import { Paciente } from '../paciente/paciente.entity';

describe('PacienteController', () => {
  let controller: PacienteController;
  let service: PacienteService;

  const mockPaciente: Paciente = {
    id: '1',
    nombre: 'Juan Pérez',
    genero: 'Masculino',
    medicos: [],
    diagnosticos: [],
  };

  const mockPacienteService = {
    create: jest.fn((paciente) => {
      if (paciente.nombre.length < 3) {
        throw new Error('El nombre del paciente debe tener al menos 3 caracteres.');
      }
      return Promise.resolve({ ...mockPaciente, ...paciente });
    }),
    findOne: jest.fn((_id) => Promise.resolve(mockPaciente)), 
    findAll: jest.fn(() => Promise.resolve([mockPaciente])),
    delete: jest.fn((_id) => Promise.resolve()), 
    addMedicoToPaciente: jest.fn((_pacienteId, medicoId) =>
      Promise.resolve({ ...mockPaciente, medicos: [{ id: medicoId, nombre: 'Dr. Smith' }] }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacienteController],
      providers: [
        {
          provide: PacienteService,
          useValue: mockPacienteService,
        },
      ],
    }).compile();

    controller = module.get<PacienteController>(PacienteController);
    service = module.get<PacienteService>(PacienteService);
  });

  it('Debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Debe crear un paciente correctamente', async () => {
      const dto = { nombre: 'Juan Pérez', genero: 'Masculino' };
      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...mockPaciente, ...dto });
    });

    it('Debe lanzar una excepción si el nombre tiene menos de 3 caracteres', async () => {
      const dto = { nombre: 'Jo', genero: 'Masculino' };

      await expect(controller.create(dto)).rejects.toThrow(
        'El nombre del paciente debe tener al menos 3 caracteres.',
      );
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('Debe obtener un paciente por ID', async () => {
      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockPaciente);
    });
  });

  describe('findAll', () => {
    it('Debe obtener todos los pacientes', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockPaciente]);
    });
  });

  describe('delete', () => {
    it('Debe eliminar un paciente por ID', async () => {
      await controller.delete('1');

      expect(service.delete).toHaveBeenCalledWith('1');
    });
  });

  describe('addMedicoToPaciente', () => {
    it('Debe asignar un médico a un paciente', async () => {
      const result = await controller.addMedicoToPaciente('1', '2');

      expect(service.addMedicoToPaciente).toHaveBeenCalledWith('1', '2');
      expect(result.medicos).toHaveLength(1);
      expect(result.medicos[0].id).toBe('2');
    });
  });
});
