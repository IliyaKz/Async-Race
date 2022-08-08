import { storage } from "../storage";
import { carsLimit } from "../constants";
import { ICarWithId } from "../interfacesAndTypes";
import { generateCarsPack, race } from "../utilities";
import { renderGarage, renderWinners } from "./ui-render";
import { deleteWinner, saveWinnersData } from "../apy-components/winners-api";
import {
  createNewCar,
  deleteCar,
  getOneCar,
  updateCar,
} from "../apy-components/cars-api";
import {
  changePage,
  changeView,
  hideMessage,
  setSortOrder,
  setterOfDisabled,
  showMessage,
  startDriving,
  stopDriving,
  updatePaginationNext,
  updatePaginationPrev,
  updateStateGarage,
  updateStateWinners,
} from "./ui-functions";

function addStartButtonListener(): void {
  document.body.addEventListener("click", async (event: Event) => {
    if ((event.target as HTMLElement).classList.contains("start-button")) {
      const id = +(event.target as HTMLElement).id.slice(6);
      startDriving(id);
    }
  });
}

function addStopButtonListener(): void {
  document.body.addEventListener("click", async (event: Event) => {
    if ((event.target as HTMLElement).classList.contains("stop-button")) {
      const id = +(event.target as HTMLElement).id.slice(5);
      stopDriving(id);
    }
  });
}

function addSelectButtonListener(): void {
  document.body.addEventListener("click", async (event: Event) => {
    if ((event.target as HTMLElement).classList.contains("select-button")) {
      storage.selectedCar = await getOneCar(
        +(event.target as HTMLElement).id.slice(7)
      );

      const upName = document.querySelector(".update-name") as HTMLInputElement;
      const upColor = document.querySelector(
        ".update-color"
      ) as HTMLInputElement;
      if (!upName || !upColor) {
        return;
      }

      upName.value = storage.selectedCar.name;
      upColor.value = storage.selectedCar.color;

      setterOfDisabled(
        [".update-name", ".update-color", ".update-submit"],
        false
      );
    }
  });
}

function addRemoveButtonListener(): void {
  document.body.addEventListener("click", async (event: Event) => {
    if ((event.target as HTMLElement).classList.contains("remove-button")) {
      const id = +(event.target as HTMLElement).id.slice(7);

      await deleteCar(id);
      await deleteWinner(id);

      await updateStateGarage();

      const garage = document.querySelector(".garage-container") as HTMLElement;
      if (!garage) {
        return;
      }
      garage.innerHTML = renderGarage();
    }
  });
}

function addGeneratorListener(): void {
  const target = document.querySelector(
    ".generator-button"
  ) as HTMLButtonElement;
  if (!target) {
    return;
  }

  target.addEventListener("click", async () => {
    setterOfDisabled([".generator-button"], true);

    const cars = generateCarsPack();
    await Promise.all(
      cars.map(async (c) => {
        const res = await createNewCar(c);
        return res;
      })
    );

    await updateStateGarage();
    const garage = document.querySelector(".garage-container") as HTMLElement;
    if (!garage) {
      return;
    }
    garage.innerHTML = renderGarage();

    setterOfDisabled([".generator-button"], false);
  });
}

function addRaceListener(): void {
  const target = document.querySelector(".race-button") as HTMLButtonElement;
  if (!target) {
    return;
  }

  target.addEventListener("click", async () => {
    setterOfDisabled([".race-button"], true);
    setterOfDisabled([".reset-button"], false);

    const winner = await race(startDriving);
    await saveWinnersData(winner.id as number, winner.time as number);

    showMessage(winner.name, winner.time);
  });
}

function addResetListener(): void {
  const target = document.querySelector(".reset-button") as HTMLButtonElement;
  if (!target) {
    return;
  }

  target.addEventListener("click", async () => {
    setterOfDisabled([".reset-button"], true);

    (storage.cars as Array<ICarWithId>).map(({ id }) => stopDriving(id));

    hideMessage();

    setterOfDisabled([".race-button"], false);
  });
}

function addPrevButtonListener(): void {
  const target = document.querySelector(".prev-button") as HTMLButtonElement;
  if (!target) {
    return;
  }

  target.addEventListener("click", async () => {
    await changePage(-1);
  });
}

function addNextButtonListener(): void {
  const target = document.querySelector(".next-button") as HTMLButtonElement;
  if (!target) {
    return;
  }
  target.addEventListener("click", async () => {
    await changePage(1);
  });
}

function addViewsSwitcherListener(): void {
  const targetGarage = document.querySelector(
    ".garage-switch"
  ) as HTMLButtonElement;
  const targetWinners = document.querySelector(
    ".winners-switch"
  ) as HTMLButtonElement;
  if (!targetGarage || !targetWinners) {
    return;
  }

  targetGarage.addEventListener("click", async () => {
    changeView("garage", "winners");

    updatePaginationNext("carsPage", "carsCount", carsLimit);
    updatePaginationPrev("carsPage");
  });

  targetWinners.addEventListener("click", async () => {
    changeView("winners", "garage");

    await updateStateWinners();
    const winners = document.querySelector(".winners-view") as HTMLElement;
    if (!winners) {
      return;
    }
    winners.innerHTML = renderWinners();
  });
}

function addSortListeners(): void {
  document.body.addEventListener("click", async (event: Event) => {
    if ((event.target as HTMLElement).classList.contains("table-wins")) {
      setSortOrder("wins");
    }
  });

  document.body.addEventListener("click", async (event: Event) => {
    if ((event.target as HTMLElement).classList.contains("table-time")) {
      setSortOrder("time");
    }
  });
}

function addCreateListener(): void {
  const target = document.querySelector(".create-form") as HTMLFormElement;
  if (!target) {
    return;
  }

  target.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    const inputName = document.querySelector(
      ".create-name"
    ) as HTMLInputElement;
    const inputColor = document.querySelector(
      ".create-color"
    ) as HTMLInputElement;
    if (!inputName || !inputColor) {
      return;
    }

    await createNewCar({ name: inputName.value, color: inputColor.value });

    await updateStateGarage();
    const garage = document.querySelector(".garage-container") as HTMLElement;
    if (!garage) {
      return;
    }
    garage.innerHTML = renderGarage();

    inputName.value = "";
    inputColor.value = "#ffffff";

    setterOfDisabled([".create-form"], true);
  });
}

function addUpdateListener(): void {
  const target = document.querySelector(".update-form") as HTMLFormElement;
  if (!target) {
    return;
  }

  target.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    const inputName = document.querySelector(
      ".update-name"
    ) as HTMLInputElement;
    const inputColor = document.querySelector(
      ".update-color"
    ) as HTMLInputElement;
    if (!inputName || !inputColor) {
      return;
    }

    await updateCar(
      { name: inputName.value, color: inputColor.value },
      (storage.selectedCar as ICarWithId).id
    );

    await updateStateGarage();
    const garage = document.querySelector(".garage-container") as HTMLElement;
    if (!garage) {
      return;
    }
    garage.innerHTML = renderGarage();

    inputName.value = "";
    inputColor.value = "#ffffff";

    setterOfDisabled([".update-name", ".update-color", ".update-submit"], true);

    storage.selectedCar = null;
  });
}

function addMessageCloser(): void {
  document.body.addEventListener("click", () => {
    hideMessage();
  });
}

export async function listen(): Promise<void> {
  addRaceListener();
  addResetListener();
  addMessageCloser();
  addSortListeners();
  addCreateListener();
  addUpdateListener();
  addGeneratorListener();
  addPrevButtonListener();
  addNextButtonListener();
  addStopButtonListener();
  addStartButtonListener();
  addSelectButtonListener();
  addRemoveButtonListener();
  addViewsSwitcherListener();
}
