import { carsLimit } from '../constants';
import { ICar, ICarsPack, ICarWithId, IFetchOptions } from '../interfacesAndTypes';

export async function createNewCar(body: ICar): Promise<ICarWithId> {
  const options: IFetchOptions = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = (await fetch('http://127.0.0.1:3000/garage', options)).json() as Promise<ICarWithId>;
  // console.log(res, 'crC');
  return res;
}

export async function updateCar(body: ICar, id: number): Promise<ICarWithId> {
  const options: IFetchOptions = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = (await fetch(`http://127.0.0.1:3000/garage/${id}`, options)).json() as Promise<ICarWithId>;
  // console.log(res, 'up');
  return res;
}

export async function deleteCar(id: number): Promise<object> {
  const options: IFetchOptions = {
    method: 'DELETE',
  };

  const res = (await fetch(`http://127.0.0.1:3000/garage/${id}`, options)).json() as Promise<object>;

  return res;
}

export async function getOneCar(id: number): Promise<ICarWithId> {
  const res = (await fetch(`http://127.0.0.1:3000/garage/${id}`)).json() as Promise<ICarWithId>;
  // console.log(res, 'gt1');
  return res;
}

export async function getPackOfCars(page: number, limit = carsLimit): Promise<ICarsPack> {
  const res = (await fetch(`http://127.0.0.1:3000/garage/?_page=${page}&_limit=${limit}`)) as Response;
  const count = res.headers.get('X-Total-Count') as string;

  const pack: ICarsPack = {
    cars: await res.json(),
    count: count,
  };
  // console.log(res, count, pack);
  return pack;
}