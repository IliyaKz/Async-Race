import { winnersLimit } from "../constants";
import { IWinner, IWinnersPack, IWinnerWithCar } from "../interfacesAndTypes";
import { createSortParams } from "../utilities";
import { getOneCar } from "./cars-api";

export async function getWinner(id: number): Promise<IWinner> {
  const res = (
    await fetch(`http://127.0.0.1:3000/winners/${id}`)
  ).json() as Promise<IWinner>;

  return res;
}

export async function getWinnerStatus(id: number): Promise<number> {
  const res = (await fetch(`http://127.0.0.1:3000/winners/${id}`))
    .status as number;

  return res;
}

export async function deleteWinner(id: number): Promise<object> {
  const options = {
    method: "DELETE",
  };

  const res = (
    await fetch(`http://127.0.0.1:3000/winners/${id}`, options)
  ).json() as Promise<object>;

  return res;
}

export async function createNewWinner(body: IWinner): Promise<IWinner> {
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = (
    await fetch("http://127.0.0.1:3000/winners", options)
  ).json() as Promise<IWinner>;

  return res;
}

export async function updateWinner(
  body: IWinner,
  id: number
): Promise<IWinner> {
  const options = {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = (
    await fetch(`http://127.0.0.1:3000/winners/${id}`, options)
  ).json() as Promise<IWinner>;

  return res;
}

export async function saveWinnersData(id: number, time: number): Promise<void> {
  const status = await getWinnerStatus(id);

  if (status === 404) {
    const winnerData: IWinner = {
      id,
      wins: 1,
      time,
    };

    await createNewWinner(winnerData);

    return;
  }

  const winner = await getWinner(id);
  const winnerData: IWinner = {
    id,
    wins: winner.wins + 1,
    time: winner.time > time ? time : winner.time,
  };

  await updateWinner(winnerData, id);
}

export async function getPackOfWinners(
  page: number,
  limit = winnersLimit,
  sort?: string | null,
  order?: string | null
): Promise<IWinnersPack> {
  const res = (await fetch(
    `http://127.0.0.1:3000/winners/?_page=${page}&_limit=${limit}${createSortParams(
      sort,
      order
    )}`
  )) as Response;
  const count = res.headers.get("X-Total-Count") as string;

  const winners: Array<IWinnerWithCar> = await Promise.all(
    (
      await res.json()
    ).map(async (item: IWinner) => {
      return { ...item, car: await getOneCar(item.id as number) };
    })
  );

  const pack: IWinnersPack = {
    winners: winners,
    count: count,
  };

  return pack;
}
