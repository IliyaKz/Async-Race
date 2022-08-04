interface IWinner {
  id?: number;
  wins: number;
  time: number;
}

interface IWinnerWithCar extends IWinner {
  car: ICarWithId;
}

interface IWinnersPack {
  winners: Array<IWinnerWithCar>;
  count: string;
}

interface ICar {
  name: string;
  color: string;
}

interface ICarWithId extends ICar {
  id: number;
  isEngineStarted?: string
}

interface ICarsPack {
  cars: Array<ICarWithId>;
  count: string;
}

interface IEngineParams {
  distance: number;
  velocity: number;
}

interface IDriveParams {
  success: boolean;
}

interface IAnimationState {
  id?: number;
}

interface IFetchOptions {
  method: string;
  body?: string;
  headers?: {
    'Content-Type': string;
  }
}

interface IProm {
  success?: boolean;
  id?: string | number;
  time: string | number;
}

interface ICoordinate {
  x: number;
  y: number;
}

interface IStorage {
  carsPage: number;
  cars: Array<ICarWithId> | null;
  carsCount: string | null;
  winnersPage: number;
  winners: Array<IWinnerWithCar> | null;
  winnersCount: string | null;
  animation: Record<string | number, IAnimationState>;
  view: string;
  sortBy: null | string;
  sortOrder: null | string;
}

interface IWinData {
  id: number;
  time: number;
}

type Callback = (id: number) => Promise<{
  success: boolean;
  id: number;
  time: number;
}>;

export { IWinData, Callback, IWinner, ICar, ICarWithId, IAnimationState, IProm, IFetchOptions, ICarsPack, IEngineParams, IDriveParams, IWinnerWithCar, IWinnersPack, ICoordinate, IStorage };