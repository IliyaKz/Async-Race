import { ICarWithId, IWinnerWithCar } from '../interfacesAndTypes';
import { storage } from '../storage';

function renderCar(color: string): string {
  const str = `
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
    <path style="fill:${color}" d="M577.5 210.7c-1.6.8-3.7 2.2-4.6 
    2.9-1.2 1.1-2.1 1.1-4.7.2-2.7-1.1-3.5-1-5.9.8-3.6 2.5-10 15.2-11.5 22.6-1.1 5.4-1.1 5.9 1.1 8.1 
    1.2 1.4 3.7 3.3 5.6 4.3 2.5 1.3 3.3 2.4 3.3 4.4-.2 5.9 1.9 7.8 21.8 19.5l15.6 9.2-3.6 2.2c-13.1 8.1-10 23.9 
    6.2 31.3 3.4 1.6 8.9 3.1 12.2 3.5 3.3.3 6 .9 6 1.4 0 1.6-12.8 1.8-116.6 2.3l-106 .6-3.2-4.5c-3.7-5.3-3.9-6.1-1.2-7 7.1-2.3 
    10.2-24.5 5.5-40.3-1.7-5.8-10.5-19.6-13.4-21.1-1.1-.6-4.9-1.1-8.4-1.1-4.9 0-7 .5-9 2-4.1 3.2-9.4 14.9-10.2 22.3-.7 6.1.4 
    16.1 2 20.1.8 1.7.5 1.8-4.1 1.2-8.8-1.3-8.5-.5-5.4-10.9 5.3-17.9 11-49.1 9.3-50.8-.6-.6-3.8-1.3-7.2-1.6l-6.1-.6v-3.8c0-3.7-.1-3.8-4.6-4.5-7.3-1.1-12.2 
    0-16 3.7-4.2 4-6.5 9.6-10.9 25.6-5.2 19-9 32.2-9.5 32.7-.3.2-8.4 1.2-18 2-9.6.9-21.8 2.3-27 3.2-9.8 1.5-48 9.7-53.9 11.6-2.4.7-3.9.7-5.5-.1-1.8-1-6.3-.5-24.1 
    2.8C111.1 316.7 65.9 323 45 323c-7.6 0-14.1.4-14.4.8-.2.4.2 4.6 1.1 9.2 1.2 7.2 1.3 11.4.3 27-.6 10.2-1.5 22.3-2.1 26.9l-1 8.5-10.5 16-10.5 16 .6 8c2.5 31.2 
    5.1 45.6 11.1 61.1 6.1 15.6 6.1 16.1 2.5 21.5-1.7 2.4-2.7 4.8-2.2 5.3 2.3 2.3 25.7 5.7 55.6 8.2 27.8 2.3 37.3 1.9 38.3-1.7.4-1.5 1.4-1.8 7.1-1.7 11.5.2 11.8.4 
    15.5 9.4 21.8 52.9 81.9 78 135 56.4 21.7-8.8 42-27.5 52.5-48.2l3.4-6.7h5.2c9.6 0 14.5 1.1 14.5 3.1 0 1.8 4.1 1.9 143.3 1.9 78.7 0 204.2-.3 278.8-.7 130.9-.6 135.6-.7 
    135.1-2.5-.4-1.7.4-1.8 12.4-1.8l12.9.1 4.5 7.1c8.4 13.3 22.6 26.6 37 34.6 27.3 15.3 63.1 16.7 92.5 3.7 7.8-3.5 20.6-12 27.7-18.4 6.5-5.9 16.7-19 20.4-26.2l2.4-4.9h14c13.6 
    0 14 .1 14 2.1v2.1l51.8-.4c39.1-.3 52.2-.7 54-1.6 1.7-1 2.2-2.2 2.2-5.2 0-2.1-.4-4.1-1-4.5-.5-.3-3.9-.8-7.5-1.2-7.3-.7-7.4-.8-5.3-8.7 1.1-4.1 1.5-4.5 4.9-5.1 2-.4 4.5-1.3 5.6-2 
    1.6-1.2 1.3-1.4-3.4-2.1l-5.2-.7.5-6.1c.8-8.7.7-8.6 6.1-8.6 6.9 0 17.6-1.9 19.1-3.4 2.5-2.4 3.5-18.3 
    2.8-44.1-.7-26.5-1.5-35.6-4.1-44.5-3.2-10.7-20.6-24.5-43.8-34.7-68.2-30.1-208.8-50.6-391.4-57.3-26.6-1-27.3-1-30.9-3.5-5-3.4-12.3-5.5-21.4-6.2-6.9-.5-8.4-1-18.5-6.8-46.9-26.6-133.4-68.3-157.5-76-3-.9-6-2.3-6.6-3.1-1.4-1.7-7.7-4.4-10.1-4.4-1 
    .1-3.1.8-4.8 1.7zM195 533.6c1.3 1.3 1.3 1.6 0 2.4-2.1 1.4-8.1 3-11.1 3-4.2 0-11.5-2.9-14-5.7l-2.4-2.5 13 .7c9.1.5 13.4 1.1 14.5 2.1zm85.8 3.5c5.6 0 6.3.2 4.2 1-3 1.3-11.9.4-13.4-1.2-.8-.9-.6-1 
    .7-.5 1 .3 4.9.6 8.5.7zm725 1.9c7.7 2.4 20.2 2.6 28.2.5 6.6-1.7 7.2-1.1 6.7 6.1-.5 7.1-4.5 13.6-10.5 17.1-3.9 2.3-5.9 2.8-11.2 2.8-8.9-.1-15.7-4.1-19.6-11.8-2.1-4-2.9-11.9-1.5-14.5.7-1.2 1.3-2.2
     1.4-2.2.1 0 3.1.9 6.5 2zm-789 8c7.7 2.4 21.6 2.7 28.7.5 2.7-.8 5.2-1.2 5.7-.9.4.3.8 2.4.8 4.6 0 13.1-9.4 22.8-22.3 22.8-12.2 0-22.9-12.5-21.1-24.8.3-2.3.9-4.2 1.3-4.2.3 0 3.5.9 6.9 2z"/>
  </svg>
  `;

  return str;
}
function renderCarName(obj: ICarWithId): string {
  const str = `<div class="car-name-container">
    ${obj.name}
  </div>`;

  return str;
}

function renderTrack(obj: ICarWithId): string {
  const str = `<div class="track">
    <div class="car-container">
      <div class="control-panel">
        <button class="button select-button" id="select-${obj.id}">Select</button>
        <button class="button remove-button" id="remove-${obj.id}">Remove</button>
        <div class="car-controllers">
          <button class="button start-button" id="start-${obj.id}" ${obj.isEngineStarted ? 'disabled' : ''}>▶</button>
          <button class="button stop-button" id="stop-${obj.id}" ${!obj.isEngineStarted ? 'disabled' : ''}>◼</button>
        </div>
      </div>
      <div class="car" id="car-${obj.id}">
        ${renderCar(obj.color)}
      </div>
    </div>
    <div class="flag" id="flag-${obj.id}">
      <svg class="flag-icon" data-name="Layer 1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path d="m448.24 140.92-.77-.77c-19.39-19.2-39.75-31.51-62.15-37.62l-1.8-.47-2.06-.53c-17.63-4.21-36.52-4.7-59-1.51l-2.73.42-1.43.21c-15.69 2.48-31.56 6.39-46.92 10.19-4.94 1.22-9.88 2.44-14.81 3.62-20 4.76-41.36 9.16-62.57 9.16-21.56 0-40.81-4.58-58.74-14l3.58-20.32A8 8 0 1 0 123 86.54L63.75 422.68a8 8 0 0 0 6.49 9.32 7.34 7.34 0 0 0 1.39.13 8 8 0 0 0 7.87-6.62l24.33-137.95c17.08 15.13 35 25.12 54.48 30.43l1.79.46 2.08.53a135 135 0 0 0 31.66 3.59 194.88 194.88 0 0 0 27.36-2.07l2.73-.41 1.42-.21c15.69-2.48 31.56-6.39 46.92-10.19 4.94-1.22 9.88-2.44 14.81-3.61 20-4.76 41.35-9.16 62.57-9.16 22.89 0 43.19 5.16 62.05 15.76l2.43 1.37.52-2.74c3.74-19.76 7.48-39.28 11.11-58v-.13c3.72-19.19 7.45-38.14 11.08-56.32v-.15c3.72-18.66 7.45-37 11.08-54.66zM348 292.87c-20 .22-40.05 4.15-58.88 8.57v-.28q5.19-31.52 10.36-62.94c16.48-3.58 37.66-7.31 58.93-6.05-.22 1.29-.45 2.59-.67 3.89l-.42 2.39q-.48 2.81-1 5.62l-.36 2.09c-2.57 15.29-5.26 30.93-7.96 46.71zm-161.71-111 .84-4.88c.16-.88.31-1.75.46-2.64a5442 5442 0 0 0 1.26-7.33 1.06 1.06 0 0 0 0-.19c2.22-12.88 4.47-26 6.73-39.19 20-.21 40-4.15 58.88-8.56v.15q-5.19 31.58-10.38 63.06c-16.49 3.58-37.66 7.31-58.93 6.05l.48-2.79c.24-1.27.45-2.49.66-3.72zm109.73 53c-8.25 1.84-16.6 3.89-24.69 5.89-11.2 2.77-22.75 5.62-34.14 7.89q5.2-31.44 10.41-63c8.25-1.84 16.6-3.89 24.69-5.89 11.2-2.77 22.75-5.62 34.15-7.89q-5.22 31.44-10.42 63zM180.47 192c-.13.75-.25 1.49-.38 2.24-.28 1.58-.55 3.17-.83 4.76-.17 1-.33 1.91-.5 2.87-.29 1.69-.59 3.39-.88 5.09l-.21 1.18c-2.55 14.68-5.09 29.2-7.58 43.38-20-3.54-38.17-11.82-55.46-25.24l9.42-53.45A125.09 125.09 0 0 0 180.47 192zm242 57.54a125.52 125.52 0 0 0-59.3-21c.11-.63.21-1.25.32-1.88q.48-2.72.94-5.41l.27-1.53c.36-2.1.73-4.21 1.09-6.3l.06-.34q1.44-8.26 2.86-16.43.54-3 1.06-6.06v-.1c.45-2.56.89-5.11 1.34-7.65.05-.3.1-.6.16-.9l1.23-7 .08-.43c.32-1.83.64-3.64.95-5.45 21.41 3.8 40.81 13.05 59.22 28.24-3.38 16.83-6.84 34.41-10.3 52.22zm-41.74-144.08q-1.17 6.5-2.34 13.12l-.08.43q-2.06 11.51-4.13 23.29c-.05.24-.09.49-.13.74q-1.87 10.58-3.76 21.3c-17.22-2.51-36.09-1.73-59 2.43l3.8-22.93 1.38-8.27c.39-2.37.78-4.73 1.18-7.1q2-12.18 4.05-24.34c22.67-3.31 41.51-2.89 59.03 1.33zM162.89 315q1.19-6.6 2.38-13.3v-.27c2.65-14.86 5.34-30 8-45.34h.13c2 .3 4.08.54 6.16.75h.42c4.45.42 9 .65 13.74.65a215.59 215.59 0 0 0 38.51-3.87q-.93 5.56-1.85 11.13-4.27 25.82-8.56 51.52c-22.57 3.38-41.41 2.96-58.93-1.27z"/>
      </svg>
    </div>
  </div>`;
  
  return str;
}

export function renderGarage(): string {
  const str = `<div class="garage-header">
    <h1 class="garage-title">Cars in garage: ${storage.carsCount}</h1>
    <h2 class="garage-page">Page: ${storage.carsPage}</h2>
  </div>
  <div class="tracks">
    ${(storage.cars as Array<ICarWithId>).map((car) => `
      <div>${renderCarName(car)}${renderTrack(car)}</div>
    `).join('')}
  </div>`;
  return str;
}

export function renderWinnersItems(): string {
  const res = (storage.winners as Array<IWinnerWithCar>).map((item, index) => {
    return `<tr>
      <td class="tab-col tab-number">${index + 1}</td>
      <td class="tab-col tab-car">${renderCar(item.car.color)}</td>
      <td class="tab-col tab-name">${item.car.name}</td>
      <td class="tab-col tab-wins">${item.wins}</td>
      <td class="tab-col tab-time">${item.time}</td>
    </tr>`;
  }).join('');

  return res;
}

function renderTableButtons(): string {
  const str = `<div class="table-buttons-container">
    <button class="button table-button table-wins">
      ${storage.sortBy === 'wins' ? `Wins: ${storage.sortOrder}` : 'Wins: unsorted'}
    </button>
    <button class="button table-button table-time">
      ${storage.sortBy === 'time' ? `Time: ${storage.sortOrder}` : 'Time: unsorted'}
    </button>
  </div>`;

  return str;
}

export function renderWinners(): string {
  const str = `<div class="winners-header">
    <h1 class="winners-title">Winners: ${storage.winnersCount}</h1>
    <h2 class="winners-page">Page: ${storage.winnersPage}</h2>
  </div>
  <div class="table-container">
    ${renderTableButtons()}
    <table class="table">
      <thead>
        <th class="tab-head">N</th>
        <th class="tab-head">Car</th>
        <th class="tab-head">Name</th>
        <th class="tab-head">Wins</th>
        <th class="tab-head">Best time</th>
      </thead>
      <tbody>
        ${renderWinnersItems()}
      </tbody>
    </table>
  </div>`;

  return str;
}

function renderViewsSwitcher(): string {
  const str = `<div class="view-switcher">
    <div class="switchers-container">
      <button class="button switch-button garage-switch">garage</button>
      <button class="button switch-button winners-switch">winners</button>
    </div>
  </div>`;

  return str;
}

function renderForms(): string {
  const str = `<div class="forms-container">
  <form class="form create-form">
    <input class="input create-name" name="name" type="text" autocomplete="off">
    <input class="color create-color" name="color" type="color" value="#ffffff">
    <button class="button create-button" type="submit">Create</button>
  </form>
  <form class="form update-form" id="update">
    <input class="input update-name" name="name" type="text" autocomplete="off" disabled>
    <input class="color update-color" name="color" type="color" value="#ffffff" disabled>
    <button class="button update-button update-submit" type="submit" disabled>Update</button>
  </form>
  </div>`;

  return str;
}

function renderGarageButtons(): string {
  const str = `<div class="controllers-buttons">
    <button class="button race-button">Rase</button>
    <button class="button reset-button" disabled>Reset</button>
    <button class="button generator-button">Generate cars</button>
  </div>`;

  return str;
}

function renderMessage(): string {
  const str = `<div>
  <p class="message"></p>
  </div>`;

  return str;
}

function renderPagination(): string {
  const str = `<div class="pagination">
    <div class="pagination-container">
      <button class="button pag-button prev-button" disabled>Prev</button>
      <button class="button pag-button next-button" disabled>Next</button>
    </div>
  </div>`;

  return str;
}

function renderPage(): string {
  const str = `
  <header class="header">
    ${renderViewsSwitcher()}
  </header>
  <main class="main">
    <section class="garage-view" id="garage-view">
      <div class="main-controllers">
        <div class="main-controllers-container">
          ${renderForms()}
          ${renderGarageButtons()}
        </div>
      </div>
        <div class="garage-container">
          ${renderGarage()}
        </div>
        ${renderMessage()}
      </section>
    <section class="winners-view" id="winners-view" style="display: none">
      ${renderWinners()}
    </section>
  </main>
  <footer class="footer">
    ${renderPagination()}
  </footer>`;

  return str;
}

export async function render() {
  const content = document.createElement('content') as HTMLElement;
  content.classList.add('content');
  content.innerHTML = renderPage();

  document.body.appendChild(content);
}