'use strict';

const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const tableElement=document.getElementById('sales-table');
const state={
    allCookieStand:[],
};

function CookieStand(locationName,minCustomersPerHour,maxCustomersPerHour,avgCookiesPerSale){
    this.locationName=locationName;
    this.minCustomersPerHour=minCustomersPerHour;
    this.maxCustomersPerHour=maxCustomersPerHour;
    this.avgCookiesPerSale=avgCookiesPerSale;
    this.customerEachHour=[];
    this.cookieEachHour=[];
    this.totaldailyCookie=0;
}
CookieStand.prototype.calcCustomersEachHour=function(){
    for(let i=0;i<hours.length;i++){
        this.customerEachHour.push(generateRandomNumb(this.minCustomersPerHour,this.maxCustomersPerHour));
    }
};
CookieStand.prototype.calcCookieEachHour=function(){
    this.calcCustomersEachHour();
    for(let i=0; i<hours.length;i++){ 
        const oneHour=Math.ceil(this.customerEachHour[i]*this.avgCookiesPerSale);
        this.cookieEachHour.push(oneHour);
        this.totaldailyCookie +=oneHour;
    }
};
CookieStand.prototype.render=function(){
    this.calcCookieEachHour();
    const tableRow=document.createElement('tr');
    let tableDataElement=document.createElement('td');
    tableDataElement.textContent=this.locationName;
    tableRow.appendChild(tableDataElement);
    for(let i=0;i<hours.length;i++){
        tableDataElement=document.createElement('td');
        tableDataElement.textContent=this.cookieEachHour[i];
        tableRow.appendChild(tableDataElement);
    }
    const tableHeader=document.createElement('th');
    tableHeader.textContent=this.totaldailyCookie;
    tableRow.appendChild(tableHeader);
    tableElement.appendChild(tableRow);
}

let seattle=new CookieStand('seatle',23,65,6.3);
let tokyo=new CookieStand('Tokyo',3,24,1.2);
let dubai=new CookieStand('Dubai',11,38,3.7);
let paris=new CookieStand('Paris',20,38,2.3);
let lima=new CookieStand('lima',2,16,4.6);
state.allCookieStand.push(seattle,tokyo,dubai,paris,lima);

function generateRandomNumb(min, max) {
    return Math.floor(Math.random() * (max - min+1)) + min;
}
function makeHeaderRow(){
    const tableRow=document.createElement('tr');
    let tableHeader=document.createElement('th');
    tableHeader.textContent='Locations';
    tableRow.appendChild(tableHeader);
    for(let i=0;i<hours.length;i++){
        tableHeader=document.createElement('th');
        tableHeader.textContent=hours[i];
        tableRow.appendChild(tableHeader);
    }
    tableHeader=document.createElement('th');
    tableHeader.textContent='Locations total';
    tableRow.appendChild(tableHeader);
    tableElement.appendChild(tableRow);
}

function makeFooterRow(){
    const tableRow=document.createElement('tr');
    let tableHeader=document.createElement('th');
    tableHeader.textContent='Hourly total';
    tableRow.appendChild(tableHeader);
    let totalOfTotals=0;
    for(let i=0; i<hours.length;i++){
        let hourlytotal=0;
        for(let j=0;j<state.allCookieStand.length;j++){
            hourlytotal+=state.allCookieStand[j].cookieEachHour[i];
            totalOfTotals +=state.allCookieStand[j].cookieEachHour[i];
        }
        tableHeader=document.createElement('th');
        tableHeader.textContent=hourlytotal;
        tableRow.appendChild(tableHeader);
    }
    tableHeader=document.createElement('th');
    tableHeader.textContent=totalOfTotals;
    tableRow.appendChild(tableHeader);
    tableElement.appendChild(tableRow);
}

function renderTable(){
    makeHeaderRow();
    for(let i=0;i<state.allCookieStand.length;i++){
        state.allCookieStand[i].render();
    }
    makeFooterRow();
}
renderTable();