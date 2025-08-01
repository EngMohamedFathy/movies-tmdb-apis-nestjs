import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from '../../services/admin/movies.service';
import { TmdbJobService } from '../../jobs/tmdb-sync.job';


// Mock services
const mockMoviesService = {
  findAll: jest.fn(),
};

const mockCacheContext = {}; // Add mocked methods if used in controller

const mockTmdbJobService = {
  startJob: jest.fn(),
};

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: mockMoviesService,
        },
        {
          provide: 'CacheContext',
          useValue: mockCacheContext,
        },
        {
          provide: TmdbJobService,
          useValue: mockTmdbJobService,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
