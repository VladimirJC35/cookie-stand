'use strict';
const Seattle = {
    locationName: 'Seattle',
    minClientPerHour: 23,
    maxClientPerHour: 70,
    agvCookiePerSale: 6.3,
    cookieEachhour: [],
    estimate: function () {
        this.cookieEachHour = estimateSales(this);
    }
};

const Tokyo = {
    locationName: 'Tokyo',
    minClientPerHour: 23,
    maxClientPerHour: 60,
    agvCookiePerSale: 5.3,
    cookieEachhour: [],
    estimate: function () {
        /* Estimate es  */
        this.cookieEachHour = estimateSales(this);
    }
};

const Dubai = {
    locationName: 'Dubai',
    minClientPerHour: 20,
    maxClientPerHour: 45,
    agvCookiePerSale: 4.3,
    cookieEachhour: [],
    estimate: function () {
        this.cookieEachHour = estimateSales(this);
    }
};

const Paris = {
    locationName: 'Paris',
    minClientPerHour: 15,
    maxClientPerHour: 80,
    agvCookiePerSale: 7.3,
    cookieEachhour: [],
    estimate: function () {
        this.cookieEachHour = estimateSales(this);
    }
};

const Lima = {
    locationName: 'Lima',
    minClientPerHour: 13,
    maxClientPerHour: 95,
    agvCookiePerSale: 8.3,
    cookieEachhour: [],
    estimate: function () {
        this.cookieEachHour = estimateSales(this);
    }
};
/*const seatle ={

    locationName: 'Seattle',
    minClientPerHour:23,
    macClientPerhour:65,
    avgCookiePerSale:6.3,
    CookiePerHour: [],
    }*/

const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const stores = [Seattle, Tokyo, Dubai, Paris, Lima];

function generateRandomNumb(min, max) {
    return Math.floor(Math.random() * (max - min+1)) + min;
}

function estimateSales(store) {
    const sale = [];
    for(let i = 0; i < hours.length; i++) {
        const numCustomers = generateRandomNumb(store.minClientPerHour, store.maxClientPerHour);
        const hourSale = Math.ceil(numCustomers*store.agvCookiePerSale);
        sale.push(hourSale);
    }
    return sale;
}

function render(store) {  //muestra la lista de cada tienda
    let total = 0;
    const root = document.getElementById('root');
    const location = document.createElement('section');
    location.classList.add('location');
    root.appendChild(location);
    const tittle = document.createElement('h2');
    tittle.textContent = store.locationName;
    location.appendChild(tittle);
    const list = document.createElement('ul');
    location.appendChild(list);
    for (let i = 0; i < hours.length; i++) {
        total += store.cookieEachHour[i];
        const litsItems = document.createElement('li');
        litsItems.textContent = hours[i] + ': ' + store.cookieEachHour[i] + ' cookies';
        list.appendChild(litsItems);
    }
    const totalItems = document.createElement('il');
    totalItems.textContent = 'total ' + total + ' cookies';
    list.appendChild(totalItems);
}

function runApplication() {
    for (let i = 0; i < stores.length; i++) {
        stores[i].estimate();
        render(stores[i]);
    }
}

runApplication();
