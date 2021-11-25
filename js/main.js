'use strict'

import {getElementFromArr, randomNumber, getLocation} from './modules/util.js';
import {features,type, photos, checkin, checkout,description} from './modules/data.js';

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

const secondType = arr[1].offer.type;
const firstEl = arr[0];
const imageUrl = firstEl.author.avatar;
const title = firstEl.offer.title;
const address = firstEl.offer.address;
const price = firstEl.offer.price + ' ' + '₴/ночь';
const rooms = firstEl.offer.rooms;
const guest = firstEl.offer.guests;
const checki = firstEl.offer.checkin;
const checkou = firstEl.offer.checkout;
const feature = firstEl.offer.features;
const descriptio = firstEl.offer.description;
const photo = firstEl.offer.photos;

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
const canvas = document.querySelector('#map-canvas');

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

let newFeatures = features.map(features=> {
  return` <li class="popup__feature popup__feature--${features}"></li>`
}).join('');
valueFeatures.innerHTML = newFeatures;
valueDescription.textContent = description;

let newPhotos = photos.map(photos => {
  return`<img src='${photos}' class="popup__photo"  width="45" height="40" alt="Фотография жилья"/>`
}).join('');
popPhotos.innerHTML = newPhotos;

canvas.appendChild(wrapper);







