'use strict'

let arr = new Array(10).fill().map((u,index) => ({
  author:{
    avatar:'img/avatars/user01.png',
  },
  offer:{
    title:'title',
    address: 'address',
    price: '200',
    type: 'palace',
    rooms: '5',
    guests: '5',
    checkin: '12:00',
    checkout: '13:00',
    features:['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    photos:['http://o0.github.io/assets/images/tokyo/hotel1.jpg','http://o0.github.io/assets/images/tokyo/hotel2.jpg','http://o0.github.io/assets/images/tokyo/hotel3.jpg.'],
  },
  location:{
    x: 35.65000,
    y: 139.70000,
  },
}
));
console.log(arr)


const getElementFromArr = (arr, number) => {

    const currentElement = arr[number]
    console.log(currentElement)
  };
  getElementFromArr(features, 2);
