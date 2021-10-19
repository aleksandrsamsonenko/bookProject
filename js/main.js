'use strict'

const features =['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const type = [ 'palace','flat','house','bungalow'];
const photos= ['http://o0.github.io/assets/images/tokyo/hotel1.jpg','http://o0.github.io/assets/images/tokyo/hotel2.jpg','http://o0.github.io/assets/images/tokyo/hotel3.jpg.'];
const checkin = ['12:00', '13:00', '14:00'];
const checkout = ['12:00', '13:00', '14:00'];
//функция поиска елемента по массиву
const getElementFromArr = (arr, number) => {
  const currentElement = arr[number]
  return currentElement;
};
//функция рандомного числа в диапазоне от startNumber до endNumber
const randomNumber=(startNumber, endNumber)=>{
  const number = Math.floor(Math.random() * (endNumber - startNumber) + startNumber);
  return number;
}
//Location
function getLocation(min, max){
  const calcNum = Math.random() * (max - min) + min;
  const locationFix = calcNum.toFixed(5);
  const locationNum = (locationFix)* 1;
  return locationNum;
}


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



