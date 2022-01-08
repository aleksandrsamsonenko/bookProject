'use strict'

import {getElementFromArr, randomNumber, getLocation} from './modules/util.js';
import {features,type, photos, checkin, checkout,description} from './modules/data.js';


const canvas = document.querySelector('#map-canvas');

const form = document.querySelector('.ad-form__element--time');
const formElement = document.querySelector('.ad-form');

const mapFilters = document.querySelector('.map__filters');//скрытие
const filtersSelect = mapFilters.querySelectorAll('select');
const mapFeatures = document.querySelector('.map__features');
const featuresInput = mapFeatures.querySelectorAll('input');
const mapForm = document.querySelector('.ad-form');
const mapFormInput = mapForm.querySelectorAll('fieldset');
const mapForms = document.querySelector('.ad-form');//добавление класса

let arr = new Array(10).fill().map((u,index) => ({
  author:{
    avatar:`img/avatars/user0${randomNumber(1,8)}.png`,
  },
  offer:{
    title:'Большой дом',
    address: 'Стратегическое шосе 2а',
    price: '500',
    type: getElementFromArr(type, 3),
    rooms: randomNumber(1,20),
    guests: randomNumber(1,40),
    checkin: getElementFromArr(checkin, 1),
    checkout: getElementFromArr(checkout, 0),
    features:getElementFromArr(features, 2),
    description:getElementFromArr(description, 1),
    photos: photos,
  },
  location:{
    x: getLocation(35.65000,35.70000),
    y: getLocation(139.70000,139.80000),
  },
}
));


const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const elType = formElement.querySelector('#type');
const elPrice = formElement.querySelector('#price');






timeIn.addEventListener('change',inTime );
timeOut.addEventListener('change', outTime);
elType.addEventListener('change',typeEl );




function inTime(evt){
  const timeIn  = evt.target.value;
  document.getElementById('timeout').value = timeIn;
}

function outTime(evt){
  const timeOut  = evt.target.value;
  document.getElementById('timein').value = timeOut;
}

function typeEl(event){
  const elType = event.target.value;

  let minPrice;
  switch (elType ) {
    case 'palace':
      minPrice = 10000;
      break;
    case 'flat':
      minPrice = 1000;
      break;
    case 'bungalow':
      minPrice = 0;
      break;
    case 'house':
      minPrice = 5000;
      break;
  }
  elPrice.min = minPrice;
  elPrice.placeholder = minPrice;
}

/*filtersSelect.forEach(el=>el.disabled = true);

featuresInput.forEach(el=>el.disabled = true);

mapFormInput.forEach(el=>el.disabled = true);

mapForms.classList.add('ad-form--disabled');*/

const L = window.L
const LAT = 35.68525;
const LNG = 139.75146;
const mapZoom = 13;


const mapOptions = {
  center: [LAT, LNG],
  zoom: mapZoom
}
const map = new L.map("map-canvas", mapOptions);
const layer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");


export function mapInit() {

  map.addLayer(layer);
  const mainPin = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [80, 160],

  });

  const LeafletIcon = L.Icon.extend ({
    options: {
      iconSize: [38,95],
      iconAnchor: [22,94],
      popupAnchor: [-3,-76],
    }
  })

  const greenIcon = new LeafletIcon({iconUrl: './img/pin.svg'})
  var marker = L.marker([35.68535,139.75156],{icon:greenIcon}).addTo(map);
  const orangeIcon = new LeafletIcon({iconUrl: './img/pin.svg'})
  var marker = L.marker([51.5,-0.09],{icon:orangeIcon}).addTo(map);

  arr.forEach(el=>{
    const orangeIcon = new LeafletIcon({iconUrl: './img/pin.svg'})
    var marker = L.marker([el.location.x,el.location.y],{icon:orangeIcon}).addTo(map);

    marker.bindPopup(renderCarts(el)).openPopup();
  })

  const mainMarker = L.marker([LAT, LNG], {
    icon: mainPin,
    draggable: true,

  }).addTo(map)}

  mapInit()

function renderCarts(offer) {
  const imageEl= document.querySelector('#card');
  const cloneElement = imageEl.cloneNode(true);
  const wrapper = cloneElement.content.querySelector('.popup');
  const image = wrapper.querySelector('.popup__avatar');
  const text = wrapper.querySelector('.popup__title');
  const dress = wrapper.querySelector('.popup__text--address');
  const cost = wrapper.querySelector('.popup__text--price');
  const valueType = wrapper.querySelector('.popup__type');
  const valueCapacity = wrapper.querySelector('.popup__text--capacity');
  const valueTime = wrapper.querySelector('.popup__text--time');
  const valueFeatures = wrapper.querySelector('.popup__features');
  const valueDescription = wrapper.querySelector('.popup__description');
  const popPhotos = wrapper.querySelector('.popup__photos');


  const firstEl = offer;
  const secondType = firstEl.offer.type;
  const imageUrl = firstEl.author.avatar;
  const title = firstEl.offer.title;
  const address = firstEl.offer.address;
  const price = firstEl.offer.price + ' ' + '₴/ночь';
  const rooms = firstEl.offer.rooms;
  const guest = firstEl.offer.guests;
  let typeTex;
  switch (secondType ) {
    case 'palace':
      typeTex = 'Дворец';
      break;
    case 'flat':
      typeTex = 'Квартира';
      break;
    case 'bungalow':
      typeTex = 'Бунгало';
      break;
    case 'house':
      typeTex = 'Дом';
      break;
  }

  image.src = imageUrl;
  text.textContent = title;
  dress.textContent = address;
  cost.textContent = price;
  valueType.textContent = typeTex;
  valueCapacity.textContent = `${rooms}комнаты для ${guest}гостей`;
  valueTime.textContent = `Заезд после ${checkin[0]}, выезд до ${checkout[2]}`;


  valueFeatures.innerHTML = renderFeatures(firstEl.offer.features);
  valueDescription.textContent = description;

  popPhotos.innerHTML = renderPhotos(firstEl.offer.photos);


  return wrapper;

}

function renderFeatures (features) {
  let newFeatures = features.map(features=> {
    return` <li class="popup__feature popup__feature--${features}"></li>`
  }).join('');
  return newFeatures;
}



function renderPhotos (photos) {
  let newPhotos = photos.map(photos => {
    return`<img src='${photos}' class="popup__photo"  width="45" height="40" alt="Фотография жилья"/>`
  }).join('');
  return newPhotos;
}




document.getElementById('title').setAttribute('required', '');

document.getElementById('price').setAttribute('required', '');

const price = document.querySelector('#price')
function validation(evt){
  const typeHousing = document.querySelector('#type')
  if (typeHousing.value === 'flat' &&  evt.target.value < "1000") {
    evt.target.setCustomValidity('The price cannot be less 1000');
    price.reportValidity();
  }
  else if (typeHousing.value === 'house' && evt.target.value  < "5000"){
    evt.target.setCustomValidity('The price cannot be less 5000 ');
    price.reportValidity();
  }
  else if (typeHousing.value === 'palace' && evt.target.value  < "10000"){
    evt.target.setCustomValidity('The price cannot be less 10000');
    price.reportValidity();
  }

}
price.addEventListener('change',validation);

const room_number = document.querySelector('#room_number')
function validationRoom(evt){
 const guestsValue = document.querySelector('#capacity');
  if (guestsValue.value === '1' &&  evt.target.value !== "1") {
    debugger
    evt.target.setCustomValidity('для 1 гостя');
    room_number.reportValidity();
  }
  else if (guestsValue.value !== '2' && guestsValue.value !== '1' && evt.target.value === "2" ){
    evt.target.setCustomValidity('для 2 гостей');
    room_number.reportValidity();
  }
  else if (guestsValue.value === '0' && evt.target.value === "3") {
    evt.target.setCustomValidity('для 3 гостей');
    room_number.reportValidity();
  }
}
room_number.addEventListener('change',validationRoom);

const capacity = document.querySelector('#capacity')
function validationСapacity(evt){
  const capacityValue = document.querySelector('#room_number');
  if (capacityValue.value === '1' &&  evt.target.value !== "1") {
    evt.target.setCustomValidity('1 комната');
    capacity.reportValidity();
  }
  else if (capacityValue.value !== '2' && capacityValue.value !== '1' && evt.target.value === "2" ){
    evt.target.setCustomValidity('2 комнаты');
    capacity.reportValidity();
  }
  else if (capacityValue.value === '3' && evt.target.value === "0") {
    evt.target.setCustomValidity('3 комнаты');
    capacity.reportValidity();
  }

}
capacity.addEventListener('change',validationСapacity);
