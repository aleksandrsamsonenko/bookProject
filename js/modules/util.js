const helpers = {
  getLocation: function (min, max) {
    const calcNum = Math.random() * (max - min) + min;
    const locationFix = calcNum.toFixed(5);
    const locationNum = (locationFix)* 1;
    return locationNum;
  },
  randomNumber: function (startNumber, endNumber) {
    const number = Math.floor(Math.random() * (endNumber - startNumber) + startNumber);
    return number;
  },
  getElementFromArr: function (arr, number) {
  const currentElement = arr.slice(number);
  return currentElement;
  }

};




export const getLocation = helpers.getLocation;
export const randomNumber = helpers.randomNumber;
export const getElementFromArr = helpers.getElementFromArr;


