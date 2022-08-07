import { storage } from '../storage';
import { ICarWithId } from '../interfacesAndTypes';
import { generateCarsPack, race } from '../utilities';
import { renderGarage, renderWinners } from './ui-render';
import { deleteWinner, saveWinnersData } from '../apy-components/winners-api';
import { createNewCar, deleteCar, getOneCar, updateCar } from '../apy-components/cars-api';
import { changePage, changeView, hideMessage, setSortOrder, setterOfDisabled, showMessage, startDriving, stopDriving, updatePaginationNext, updatePaginationPrev, updateStateGarage, updateStateWinners } from './ui-functions';
import { carsLimit } from '../constants';

function addStartButtonListener() {
  document.body.addEventListener('click', async (event: Event) => {
    
    if ((event.target as HTMLElement).classList.contains('start-button')) {

      const id = +(event.target as HTMLElement).id.slice(6);
      startDriving(id);

    }
  });
}

function addStopButtonListener() {
  document.body.addEventListener('click', async (event: Event) => {

    if ((event.target as HTMLElement).classList.contains('stop-button')) {

      const id = +(event.target as HTMLElement).id.slice(5);
      stopDriving(id);

    }
  });
}

function addSelectButtonListener() {
  document.body.addEventListener('click', async (event: Event) => {

    if ((event.target as HTMLElement).classList.contains('select-button')) {

      storage.selectedCar = await getOneCar(+(event.target as HTMLElement).id.slice(7));

      const upName = (document.querySelector('.update-name') as HTMLInputElement);
      const upColor = (document.querySelector('.update-color') as HTMLInputElement);
      if (!upName || !upColor) {
        return;
      }

      upName.value = storage.selectedCar.name;
      upColor.value = storage.selectedCar.color;

      setterOfDisabled(['.update-name', '.update-color', '.update-submit'], false);
    }
  });
}

function addRemoveButtonListener() {
  document.body.addEventListener('click', async (event: Event) => {

    if ((event.target as HTMLElement).classList.contains('remove-button')) {

      const id = +(event.target as HTMLElement).id.slice(7);

      await deleteCar(id);
      await deleteWinner(id);

      await updateStateGarage();

      const garage = (document.querySelector('.garage-container') as HTMLElement);
      if (!garage) {
        return;
      }

      garage.innerHTML = renderGarage();
    }
  });
}

function addGeneratorListener() {
  document.body.addEventListener('click', async (event: Event) => {

    if ((event.target as HTMLButtonElement).classList.contains('generator-button')) {

      setterOfDisabled(['.generator-button'], true);


      const cars = generateCarsPack();
      await Promise.all(cars.map(async (c) => { 
        const res = await createNewCar(c);
        return res;
      }));

      await updateStateGarage();
      const garage = (document.querySelector('.garage-container') as HTMLElement);
      if (!garage) {
        return;
      }

      garage.innerHTML = renderGarage();

      setterOfDisabled(['.generator-button'], false);
    }
  });
}

function addRaceListener() {
  document.body.addEventListener('click', async (event: Event) => {

    if ((event.target as HTMLButtonElement).classList.contains('race-button')) {

      setterOfDisabled(['.race-button'], true);
      setterOfDisabled(['.reset-button'], false);

      const winner = await race(startDriving);
      await saveWinnersData(winner.id as number, winner.time as number);

      showMessage(winner.name, winner.time);
    }
  });
}

function addResetListener() {
  document.body.addEventListener('click', async (event: Event) => {

    if ((event.target as HTMLButtonElement).classList.contains('reset-button')) {

      setterOfDisabled(['.reset-button'], true);

      (storage.cars as Array<ICarWithId>).map(({ id }) => stopDriving(id));

      hideMessage();

      setterOfDisabled(['.race-button'], false);
    }
  });
}

function addPrevButtonListener() {
  document.body.addEventListener('click', async (event: Event) => {
    if ((event.target as HTMLButtonElement).classList.contains('prev-button')) {
      await changePage(-1);
    }
  });
}

function addNextButtonListener() {
  document.body.addEventListener('click', async (event: Event) => {
    if ((event.target as HTMLButtonElement).classList.contains('next-button')) {
      await changePage(1);
    }
  });
}

function addViewsSwitcherListener() {
  document.body.addEventListener('click', async (event: Event) => {
    if ((event.target as HTMLButtonElement).classList.contains('garage-switch')) {
      changeView('garage', 'winners');

      updatePaginationNext('carsPage', 'carsCount', carsLimit);
      updatePaginationPrev('carsPage');
    }

    if ((event.target as HTMLButtonElement).classList.contains('winners-switch')) {
      changeView('winners', 'garage');

      await updateStateWinners();
      const winners = (document.querySelector('.winners-view') as HTMLElement);
      if (!winners) {
        return;
      }

      winners.innerHTML = renderWinners();
    }
  });
}

function addSortListeners() {
  document.body.addEventListener('click', async (event: Event) => {

    if ((event.target as HTMLButtonElement).classList.contains('table-wins')) {
      setSortOrder('wins');
    }

    if ((event.target as HTMLButtonElement).classList.contains('table-time')) {
      setSortOrder('time');
    }
  });
}

function addCreateListener() {
  const target = document.querySelector('.create-form') as HTMLFormElement;
  if (!target) {
    return;
  }
  
  target.addEventListener('submit', async (event: Event) => {
    event.preventDefault();

    const inputName = document.querySelector('.create-name') as HTMLInputElement;
    const inputColor = document.querySelector('.create-color') as HTMLInputElement;
    if (!inputName || !inputColor) {
      return;
    }

    await createNewCar({ name: inputName.value, color: inputColor.value });

    await updateStateGarage();
    
    const garage = (document.querySelector('.garage-container') as HTMLElement);
    if (!garage) {
      return;
    }

    garage.innerHTML = renderGarage();

    const crName = (document.querySelector('.create-name') as HTMLInputElement);
    const crColor = (document.querySelector('.create-color') as HTMLInputElement);
    if (!crName || !crColor) {
      return;
    }

    crName.value = '';
    crColor.value = '#ffffff';

    setterOfDisabled(['.create-form'], true);
  });

}

function addUpdateListener() {
  const target = document.querySelector('.update-form') as HTMLFormElement;
  if (!target) {
    return;
  }
  
  target.addEventListener('submit', async (event: Event) => {
    event.preventDefault();

    const inputName = document.querySelector('.update-name') as HTMLInputElement;
    const inputColor = document.querySelector('.update-color') as HTMLInputElement;
    if (!inputName || !inputColor) {
      return;
    }

    await updateCar({ name: inputName.value, color: inputColor.value }, (storage.selectedCar as ICarWithId).id);

    await updateStateGarage();
    const garage = (document.querySelector('.garage-container') as HTMLElement);
    if (!garage) {
      return;
    }

    garage.innerHTML = renderGarage();

    const upName = (document.querySelector('.update-name') as HTMLInputElement);
    const upColor = (document.querySelector('.update-color') as HTMLInputElement);
    if (!upName || !upColor) {
      return;
    }

    upName.value = '';
    upColor.value = '#ffffff';

    setterOfDisabled(['.update-name', 'update-color', 'update-submit'], true);

    storage.selectedCar = null;
  });

}

function addMessageCloser() {
  document.body.addEventListener('click', () => {
    hideMessage();
  });
}

export async function listen() {
  addStartButtonListener();
  addStopButtonListener();
  addSelectButtonListener();
  addRemoveButtonListener();
  addGeneratorListener();
  addRaceListener();
  addResetListener();
  addPrevButtonListener();
  addNextButtonListener();
  addViewsSwitcherListener();
  addSortListeners();
  addCreateListener();
  addUpdateListener();
  addMessageCloser();
} 