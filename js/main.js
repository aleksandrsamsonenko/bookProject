'use strict'

import {getElementFromArr, randomNumber, getLocation} from './modules/util.js';
import {features,type, photos, checkin, checkout} from './modules/data.js';



let arr = new Array(10).fill().map((u,index) => ({
  author:{
    avatar:`img/avatars/user0${randomNumber(1,8)}.png`,
  },
  offer:{
    title:'title',
    address: 'address',
    price: '200',
    type: getElementFromArr(type, 3),
    rooms: randomNumber(1,20),
    guests: randomNumber(1,40),
    checkin: getElementFromArr(checkin, 1),
    checkout: getElementFromArr(checkout, 0),
    features:getElementFromArr(features, 2),
    photos: getElementFromArr(photos, 1),
  },
  location:{
    x: getLocation(35.65000,35.70000),
    y: getLocation(139.70000,139.80000),
  },
}
));
console.log(arr)



