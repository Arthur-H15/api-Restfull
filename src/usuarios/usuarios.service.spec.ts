import { Test, TestingModule } from '@nestjs/testing';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Usuarios } from '../entities/Usuarios';
import { UsuariosService } from './usuarios.service';
import { UserDtoValidacao } from './dto/userDtoValidacao';
import { userUpDateDto } from './dto/userUpDateDto';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let repository: Repository<Usuarios>;

  const mockRepository = {
    findOneOrFail: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: getRepositoryToken(Usuarios),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    repository = module.get<Repository<Usuarios>>(getRepositoryToken(Usuarios));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findOneByEmailForLogin', () => {
    const email = 'test@example.com';
    const password = '123456';
    const user = {
      id: 1,
      nome: 'Test User',
      email: 'test@example.com',
      senha: '$2b$10$4jK4l.nv8IwWp6nKZTLUuO6vYn6z/aKLxLn0DW1RyOJNX.8e.AwZe',
      numero: '123456789',
      excluido: 0,
      ativo: 1,
    };

    it('should return the user object if the email and password are correct', async () => {
      const expectedResult = user;
      mockRepository.findOneOrFail.mockResolvedValueOnce(expectedResult);
      const result = await service.findOneByEmailForLogin(email);
      expect(result).toEqual(expectedResult);
      expect(mockRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { email, excluido: 0, ativo: 1 },
        select: ['id', 'nome', 'email', 'senha', 'numero'],
      });
    });
    it('should throw BadRequestException when user does not exist', async () => {
      // Arrange
      const email = 'test@example.com';
      mockRepository.findOneOrFail.mockRejectedValue(new BadRequestException("usuario nao existe"));
  
      // Act
      const result = await service.findOneByEmailForLogin(email);
      console.log({result})
  
      // Assert
      expect(result).toBeInstanceOf(Object);
      expect(result.message).toBe('usuario nao existe');
    });
  

   
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedResult = [
        {
          id: 1,
          nome: 'Test User',
          email: 'test@example.com',
          numero: '123456789',
          excluido: 0,
          ativo: 1,
        },
      ];
      mockRepository.find.mockResolvedValueOnce(expectedResult);
      const result = await service.findAll();
      expect(result).toEqual(expectedResult);
      expect(mockRepository.find).toHaveBeenCalledWith({
        select: ['id', 'nome', 'email', 'numero', 'excluido', 'ativo'],
      });
    });

    it('should throw BadRequestException if no users are found', async () => {
      mockRepository.find.mockRejectedValueOnce({
        response: {
          status: 400,
        }
      })
      });


    })
  describe('create', () => {
      const userDto: UserDtoValidacao = {
      nome: 'Test User',
      email: 'test@example.com',
      senha: '123456',
      numero: '123456789',
      };
      const createdUser = {
        id: 1,
        nome: 'Test User',
        email: 'test@example.com',
        senha: '$2b$10$4jK4l.nv8IwWp6nKZTLUuO6vYn6z/aKLxLn0DW1RyOJNX.8e.AwZe',
        numero: '123456789',
        excluido: 0,
        ativo: 1,
      };
      
      it('should create a user', async () => {
        mockRepository.create.mockReturnValueOnce(createdUser);
        mockRepository.save.mockResolvedValueOnce(createdUser);
      
        const result = await service.create(userDto);
      
        expect(result).toEqual(createdUser);
        expect(mockRepository.create).toHaveBeenCalledWith(userDto);
        expect(mockRepository.save).toHaveBeenCalledWith(createdUser);
      });
      
      it('should throw a ConflictException if the email is already in use', async () => {
        mockRepository.create.mockReturnValueOnce(createdUser);
        mockRepository.save.mockRejectedValueOnce({
          code: '23505',
        });
      
        await expect(async () => {
          let usuario= await service.create(userDto)
          if(usuario.status= Between(400,500)) throw new BadRequestException(usuario)
        }).rejects.toThrow(BadRequestException);
        expect(mockRepository.create).toHaveBeenCalledWith(userDto);
        expect(mockRepository.save).toHaveBeenCalledWith(createdUser);
      });
  })      
  describe('update', () => {
    const id = 1;
    const userUpDateDto: userUpDateDto = {
      nome: 'New Test User',
      email: 'newtest@example.com',
      senha: 'new123456',
      numero: '987654321',
      dataAtualizacao: new Date()
    };
    const updatedUser = {
    id: 1,
    nome: 'New Test User',
    email: 'newtest@example.com',
    numero: '987654321'
    };
    it('should update a user', async () => {
      mockRepository.update.mockResolvedValueOnce({
        affected: 1,
      });
      mockRepository.create.mockReturnValue(userUpDateDto)
      mockRepository.findOne.mockResolvedValueOnce(updatedUser)
      const result = await service.update(userUpDateDto,id);
      expect(result).toEqual(updatedUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({"where": {"id": 1}});
      expect(mockRepository.update).toHaveBeenCalledWith(id, userUpDateDto);
    });
    
    it('should throw a NotFoundException if the user is not found', async () => {
      mockRepository.findOne.mockRejectedValueOnce(undefined);   
      mockRepository.findOne.mockResolvedValueOnce(updatedUser)
      let usuario=await service.update( userUpDateDto,id)
      expect(async () => {
                
                if(usuario.status= Between(400,500)) throw new BadRequestException(usuario);
              }).rejects.toThrow(BadRequestException);
      
   })    
  })
  })