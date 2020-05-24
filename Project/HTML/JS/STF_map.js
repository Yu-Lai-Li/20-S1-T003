mapboxgl.accessToken = "pk.eyJ1Ijoicm95eXVsIiwiYSI6ImNrYTUxb3FyZjA3OW0zZnA0dm9kc3g4M24ifQ.CddGHFtKeVdpE02MP4n4gg";
const DARKSKY_KEY = "0e195afd5dd4381cf43dc3f53ea53094";
let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [145.135844,-37.911103], // starting position [lng, lat]
        zoom: 11 // starting zoom
})

/*function getInformationFromCustomer()
{
  let fleetInformation = {Date:"",Time:"",Country:"",Airport:""};
  let dateRef=document.getElementById("date")
  let timeRef=document.getElementById("time")
  let countryRef = document.getElementById ("country");
  let airportRef = document.getElementById("airport")


  fleetInformation.Date=dateRef.value
  fleetInformation.Time=timeRef.value}
  fleetInformation.Country = countryRef.value
  fleetInformation.Airport= airportRef.value

  if (typeof(Storage) !== "undefined")
  {
  	localStorage.setItem("fleet-data",JSON.stringify(fleetInformation));
  	let nutritionalData= JSON.parse(localStorage.getItem("fleet-data"));
  }
  else
  {
  	console.log("localStorage is not supported by current browser.");
  }
}*/

function search()
{
  let fleetInformation = {Date:"",Time:"",Country:"",Airport:""};
  let dateRef=document.getElementById("date")
  let timeRef=document.getElementById("time")
  let countryRef = document.getElementById ("country");
  let airportRef = document.getElementById("airport")


  //fleetInformation.Date=dateRef.value
  //fleetInformation.Time=timeRef.value}
  //fleetInformation.Country = countryRef.value
  //fleetInformation.Airport= airportRef.value


}
