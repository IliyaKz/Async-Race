import { storage } from "../storage";
import { getPackOfCars } from "../apy-components/cars-api";
import { getPackOfWinners } from "../apy-components/winners-api";
import { driveCar, startCar, stopCar } from "../apy-components/engine-api";
import { calcDistance, drawAnimation } from "../utilities";
import { renderGarage, renderWinners } from "./ui-render";
import { IStorage } from "../interfacesAndTypes";
import { carsLimit, winnersLimit } from "../constants";

export function setterOfDisabled(
  elements: Array<string>,
  value: boolean
): void {
  elements.forEach((item) => {
    const target = document.querySelector(`${item}`) as
      | HTMLInputElement
      | HTMLButtonElement;
    if (!target) {
      return;
    }

    target.disabled = value;
  });
}

export function updatePaginationNext(
  page: keyof IStorage,
  count: keyof IStorage,
  limit: number
): void {
  if (Number(storage[page]) * limit < Number(storage[count])) {
    setterOfDisabled([".next-button"], false);
    return;
  }

  setterOfDisabled([".next-button"], true);
}

export function updatePaginationPrev(page: keyof IStorage): void {
  if (Number(storage[page]) > 1) {
    setterOfDisabled([".prev-button"], false);
    return;
  }

  setterOfDisabled([".prev-button"], true);
}

export async function updateStateGarage() {
  const { cars, count } = await getPackOfCars(storage.carsPage);

  storage.cars = cars;
  storage.carsCount = count;

  updatePaginationNext("carsPage", "carsCount", carsLimit);
  updatePaginationPrev("carsPage");
}

export async function updateStateWinners() {
  const { winners, count } = await getPackOfWinners(
    storage.winnersPage,
    10,
    storage.sortBy,
    storage.sortOrder
  );

  storage.winners = winners;
  storage.winnersCount = count;

  updatePaginationNext("winnersPage", "winnersCount", winnersLimit);
  updatePaginationPrev("winnersPage");
}

function animateCar(id: number, time: number): void {
  const car = document.querySelector(`#car-${id}`) as HTMLElement;
  const stop = document.querySelector(`#flag-${id}`) as HTMLElement;
  if (!car || !stop) {
    return;
  }

  const distance = Math.floor(calcDistance(car, stop));

  storage.animation[id] = drawAnimation(car, distance, time);
}

export async function startDriving(id: number) {
  setterOfDisabled([`#start-${id}`], true);

  const { velocity, distance } = await startCar(id);
  const time = Math.round(distance / velocity);

  setterOfDisabled([`#stop-${id}`], false);

  animateCar(id, time);

  const { success } = await driveCar(id);
  if (!success) {
    window.cancelAnimationFrame(storage.animation[id].id as number);
  }

  return { success, id, time };
}

export async function stopDriving(id: number): Promise<void> {
  setterOfDisabled([`#stop-${id}`], true);

  await stopCar(id);

  setterOfDisabled([`#start-${id}`], false);

  const car = document.querySelector(`#car-${id}`) as HTMLElement;
  if (!car) {
    return;
  }

  car.style.transform = "translateX(0)";

  if (storage.animation[id])
    window.cancelAnimationFrame(storage.animation[id].id as number);
}

export async function setSortOrder(sortBy: string): Promise<void> {
  storage.sortOrder = storage.sortOrder === "asc" ? "desc" : "asc";
  storage.sortBy = sortBy;

  await updateStateWinners();

  const winners = document.querySelector(".winners-view") as HTMLElement;
  if (!winners) {
    return;
  }
  winners.innerHTML = renderWinners();
}

export async function changePage(param: number): Promise<void> {
  if (storage.view === "garage") {
    storage.carsPage = storage.carsPage + param;
    await updateStateGarage();

    const garage = document.querySelector(".garage-container") as HTMLElement;
    if (!garage) {
      return;
    }
    garage.innerHTML = renderGarage();
  }

  if (storage.view === "winners") {
    storage.winnersPage = storage.winnersPage + param;
    await updateStateWinners();

    const winners = document.querySelector(".winners-view") as HTMLElement;
    if (!winners) {
      return;
    }
    winners.innerHTML = renderWinners();
  }
}

export function showMessage(name: unknown, time: unknown): void {
  const message = document.querySelector(".message") as HTMLElement;
  const messageName = document.querySelector(".message-name") as HTMLElement;
  const messageTime = document.querySelector(".message-time") as HTMLElement;
  if (!message || !time || !name) {
    return;
  }

  messageName.innerHTML = `${name} won!`;
  messageTime.innerHTML = `Time: ${time}`;
  message.classList.add("visible");
}

export function hideMessage(): void {
  const message = document.querySelector(".message") as HTMLElement;
  if (!message) {
    return;
  }
  message.classList.remove("visible");
}

export function changeView(active: string, inactive: string): void {
  const actEl = document.querySelector(`.${active}-view`) as HTMLElement;
  const inactEl = document.querySelector(`.${inactive}-view`) as HTMLElement;
  if (!actEl || !inactEl) {
    return;
  }

  actEl.style.display = "flex";
  inactEl.style.display = "none";

  storage.view = active;
}
