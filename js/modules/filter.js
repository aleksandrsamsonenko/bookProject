import {getMarkerInfo} from "./fetch.js";
import {mapInit} from "../main.js";



export async function formChange() {
  debugger
  const requestURL = 'http://24.javascript.pages.academy/keksobooking/data'
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
    })
  //get data from server

}
