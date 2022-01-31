import {getMarkerInfo} from "./fetch.js";
import {mapInit, delitPopups} from "../main.js";



export async function formChange() {
  const requestURL = 'https://24.javascript.pages.academy/keksobooking/data'
  getMarkerInfo('GET', requestURL)
    .then(data => {
      delitPopups();
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

const mapFilters = document.querySelector(".map__filters")

mapFilters.addEventListener("change", filter)

export function filter(event, data){
  debugger
  let  filteredOffers =[]
  let bluePin = document.querySelectorAll('[title*="My another Location"]')
  bluePin.forEach(el => el.remove())


  const houseType = document.getElementById("housing-type")
  const housePrice = document.getElementById("housing-price")


  let houseTypeValue = houseType.value
  let housePriceValue = housePrice.value


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
    return housingTypeHandler(elem) && housingPriceHandler(elem) && featuresFilter(elem)
  }
  filteredOffers = data.filter(commonFilter)
  getMarkerInfo (filteredOffers)
}
