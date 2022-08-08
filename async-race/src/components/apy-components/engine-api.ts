import {
  IDriveParams,
  IEngineParams,
  IFetchOptions,
} from "../interfacesAndTypes";

export async function startCar(id: number): Promise<IEngineParams> {
  const options: IFetchOptions = {
    method: "PATCH",
  };

  const res = (
    await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, options)
  ).json() as Promise<IEngineParams>;

  return res;
}

export async function stopCar(id: number): Promise<IEngineParams> {
  const options: IFetchOptions = {
    method: "PATCH",
  };

  const res = (
    await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=stopped`, options)
  ).json() as Promise<IEngineParams>;

  return res;
}

export async function driveCar(id: number): Promise<IDriveParams> {
  const options: IFetchOptions = {
    method: "PATCH",
  };

  const res = await fetch(
    `http://127.0.0.1:3000/engine?id=${id}&status=drive`,
    options
  ).catch();

  if (res.status === 200) {
    const resJSON = await res.json();
    return { ...resJSON };
  }
  return {
    success: false,
  };
}
