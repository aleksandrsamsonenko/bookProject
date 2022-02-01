import {getMarkerInfo} from "./fetch.js";
import {mapInit, delitPopups,} from "../main.js";



export async function formChange() {
  const requestURL = 'https://24.javascript.pages.academy/keksobooking/data'
  getMarkerInfo('GET', requestURL)
    .then(data => {

      console.log(data);
      const typefFilter = document.querySelector('#housing-type')
      //get value from select
      const typeFilterValue = typefFilter.value;
      //filter by value
      const filterdDataByType = data.filter(el=>el.offer.type === typeFilterValue)
      // cut 10
      const cutFilteredDataByType = filterdDataByType.splice(0,10)
      console.log(cutFilteredDataByType)
      mapInit(cutFilteredDataByType);
    })

  //get data from server

}



export function filter(){
  let  filteredOffers =[]
  let bluePin = document.querySelectorAll('[title*="My another Location"]')
  bluePin.forEach(el => el.remove())


  const houseType = document.getElementById("housing-type")
  const housePrice = document.getElementById("housing-price")
  const houseRooms = document.getElementById("housing-rooms")
  const houseGuests = document.getElementById("housing-guests")


  let houseTypeValue = houseType.value
  let housePriceValue = housePrice.value
  let houseRoomsValue = houseRooms.value
  let houseGuestsValue = houseGuests.value


  function housingTypeHandler(elem){

    if(houseTypeValue === "palace"){
      return elem.offer.type === "palace"
    }
    if(houseTypeValue === "flat"){
      return elem.offer.type === "flat"
    }
    if(houseTypeValue === "house"){
      return elem.offer.type === "house"
    }
    if(houseTypeValue === "bungalow"){
      return elem.offer.type === "bungalow"
    }
    if (houseTypeValue === "any"){
      return true
    }
  }

  function housingPriceHandler(elem){

    if (housePriceValue === "low"){
      return  elem.offer.price < 10000
    }
    if (housePriceValue === "middle"){
      return elem.offer.price >= 10000 && elem.offer.price <= 50000
    }
    if (housePriceValue === "high"){
      return elem.offer.price > 50000
    }
    if (housePriceValue === "any"){
      return true
    }
  }

  function housingRoomHandler(elem){

    if (houseRoomsValue === "1"){
      return  elem.offer.rooms === "1"
    }
    if (houseRoomsValue === "2"){
      return elem.offer.rooms === "2"
    }
    if (houseRoomsValue === "3"){
      return elem.offer.rooms === "3"
    }
    if (houseRoomsValue === "any"){
      return true
    }
  }

  function housingGuestsHandler(elem){

    if (houseGuestsValue === "1"){
      return  elem.offer.guests === "1"
    }
    if (houseGuestsValue === "2"){
      return elem.offer.guests === "2"
    }
    if (houseGuestsValue === "0"){
      return elem.offer.guests === "0"
    }
    if (houseGuestsValue === "any"){
      return true
    }
  }



  let featuresFilter = function (elem) {

    const filterFeaturesCheckboxes = document.querySelectorAll('.map__features input[type=checkbox]:checked');
    let filtered = true;
    if (filterFeaturesCheckboxes.length && elem.offer.features) {
      filterFeaturesCheckboxes.forEach(function (chBox) {
        if (!elem.offer.features.includes(chBox.value) ) {
          filtered = false;
        }
      });
    }
    return filtered;
  };



  let commonFilter = function (elem) {
    return housingTypeHandler(elem) && housingPriceHandler(elem) && featuresFilter(elem)&& housingGuestsHandler(elem)&& housingRoomHandler(elem)
  }
  const requestURL = 'https://24.javascript.pages.academy/keksobooking/data'
  getMarkerInfo('GET', requestURL)
    .then(data => {
      delitPopups();
      filteredOffers = data.filter(commonFilter)
      mapInit(filteredOffers)
      console.log(filteredOffers)
      }
    )

}
