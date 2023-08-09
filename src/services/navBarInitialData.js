
import { signal } from "@preact/signals-react";
import axios from 'axios';
const Url = 'https://modulo-2-jsonserver-sprint2.onrender.com/';
export const genres = signal([]);
export const nearbyCinemas = signal([]);
export const activeDates = signal([]);

export async function getGenres() {
  const result = await axios.get(Url + `genres`);
  let data = [];

  result.data.forEach(element => {
    data.push({ value: element.id, label: element.name });
  });
  genres.value = data;
}

export async function getNearbyCinemas() {
  const result = await axios.get(Url + `cinemas`);
  let data = [];
 
  result.data.forEach(element => {
    data.push({ value: element.id, label: element.name });
  });
  nearbyCinemas.value = data;
}

export async function getActiveDates() {
  const result = await axios.get(Url + `shedules?active=true`);
  let tempData = [];
  result.data.forEach(element => {
    tempData.push(element.day + '-' + element.month);
  });
  let uniqueDates = [...new Set(tempData)];
  let data = [];
  

  uniqueDates.forEach((date, index) => { data.push({ value: date, label: date }) })
  activeDates.value = data;

}
