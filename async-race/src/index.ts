import './styles/main.css';
import { storage } from '../src/components/storage';
import { ICarWithId, IWinnerWithCar } from './components/interfacesAndTypes';
import { listen } from './components/ui-components.ts/ui-listeners';
import { render } from './components/ui-components.ts/ui-render';
import { updateStateGarage } from './components/ui-components.ts/ui-functions';
import { getPackOfCars } from './components/apy-components/cars-api';
import { getPackOfWinners } from './components/apy-components/winners-api';

function init() {
  document.addEventListener('DOMContentLoaded', () => {
    ((async () => {
      storage.cars = (await getPackOfCars(1)).cars as Array<ICarWithId>;
      storage.carsCount = (await getPackOfCars(1)).count as string;
      storage.winners = (await getPackOfWinners(1)).winners as Array<IWinnerWithCar>;
      storage.winnersCount = (await getPackOfWinners(1)).count as string;
      console.log(storage);
      await render();
      await updateStateGarage();
      await listen();
    })());
  });
}
init();

