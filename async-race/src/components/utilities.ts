import { storage } from './storage';
import { carsNames, carsModels } from './constants';
import { ICar, IAnimationState, IProm, ICarWithId, Callback } from './interfacesAndTypes';

export function createSortParams(sort?: string | null, order?: string | null): string {
  return (sort && order) ? `&_sort=${sort}&_order=${order}` : '';
}

function generateRandom(n: number): number {
  return Math.floor(Math.random() * n);
}

function generateColor(): string {
  const chars = '0123456789ABCDEF';
  let res = '';

  for (let i = 0; i < 6; i++) {
    res += chars[generateRandom(16)];
  }
  
  return `#${res}`;
}

function generateName(): string {
  return `${carsNames[generateRandom(carsNames.length)]} ${carsModels[generateRandom(carsModels.length)]}`;
}

export function generateCarsPack(): Array<ICar> {
  return Array.from({ length: 100 }).map(() => {
    return { name: generateName(), color: generateColor() };
  });
}

export function calcDistance(el1: HTMLElement, el2: HTMLElement): number {
  const res: number = (el2.getBoundingClientRect().left - el1.getBoundingClientRect().left) + el2.getBoundingClientRect().width;
  // console.log(res);
  return res;
}

export function drawAnimation(car: HTMLElement, dist: number, duration: number): IAnimationState {
  let startTime: number | null = null;
  let carOffset: number = car.offsetLeft;
  const frames: number = (duration / 1000) * 60;

  const dX = (dist - car.offsetLeft) / frames;

  const state: IAnimationState = {};

  function animate(time: number) {

    if (!startTime) {
      startTime = time;
    }

    carOffset += dX;
    car.style.transform = `translateX(${carOffset}px)`;

    if (carOffset < dist) {
      state.id = window.requestAnimationFrame(animate);
    }
  }

  state.id = window.requestAnimationFrame(animate);
  
  return state;
}
 
async function startCars(promises: Array<Promise<IProm>>, idents: Array<number>): Promise<Record<string, unknown>> {
  const promiseRes = await Promise.race(promises);
  const { success, id, time } = promiseRes;

  console.log(await Promise.race(promises));

  if (!success) {
    const ind = idents.findIndex((item) => item === id);
    const newPromises = promises.filter((el, index) => index !== ind);
    const newIdents = idents.filter((el, index) => index !== ind);
    return startCars(newPromises, newIdents);
  }
  console.log( { ...(storage.cars as Array<ICarWithId>).find((item) => item.id === id) });

  const winnersCar = (storage.cars as Array<ICarWithId>).find((item) => item.id === id);
  const winnersTime = +((time as number / 1000).toFixed(2));

  return { ...winnersCar, time: +winnersTime };
}

export async function race(callback: Callback) {
  const promises = (storage.cars as Array<ICarWithId>).map(({ id }) => callback(id));

  const winners = await startCars(promises, (storage.cars as Array<ICarWithId>).map((car) => car.id));

  return winners;
}