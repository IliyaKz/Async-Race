import { IStorage } from './interfacesAndTypes';

export const storage = {
  carsPage: 1,
  cars: null,
  carsCount: null,
  winnersPage: 1, 
  winners: null,
  winnersCount: null,
  animation: {},
  view: 'garage',
  sortBy: null,
  sortOrder: null,
  selectedCar: null,
} as IStorage;
