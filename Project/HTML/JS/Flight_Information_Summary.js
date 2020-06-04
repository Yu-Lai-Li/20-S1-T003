//Map Display
let xx=localStorage.getItem(/*"key"*/);
let xxx=JSON.parse(xx);
let latCenter=xxx.location1[0]+xxx.location2[0]/2;
let longCenter=xxx.location1[1]+xxx.location2[1]/2;
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ2aW5ka2F1ciIsImEiOiJjamt0c20wcXIwOTE3M29tbXYyc2M2aXhsIn0.mOrPB0bbVVm9NitiWvz96w';
let map = new mapboxgl.Map({
  container: 'map',
  center: [latCenter,longCenter],
  zoom: 10,
  style: 'mapbox://styles/mapbox/streets-v9'
});

//Button Function
function deleteFlight()
{
  let confirmDeleteFlightSummary=confirm("Are you sure you want to delete this flight?");
  if (confirmDeleteFlightSummary==true)
  {
    RouteList.deleteRoute();//delete from the storage
    window.location="Homepage.html";
  }
}
function returnHome()
{
  window.location="Homepage.html";
}

//Route in text summary display !!!!!filling in innerHTML get from localStorage
let yy=localStorage.getItem(/*key*/);
let yyy=JSON.parse(yy);
function routeDisplaySummary()
{
  let originFISRef=document.getElementById("originSummary");
  originFISRef.innerHTML=yy.orgin;
  if ()//if has a waypoint
  {
    let wayPointSummaryFISRef=document.getElementById("wayPointSummary")
    wayPointSummaryFISRef.innerHTML=yy.waypoint;
    wayPointSummaryFISRef.innerHTML+="<img src="Images/arrow.png" alt="arrowIcon" width="15" height="15">";
  }
  let destinationFISRef=document.getElementById("destinationSummary")
  destinationFISRef.innerHTML=yy.destination;
}
function DateDisplaySummary()
{
  let departureDateDisplayRef=document.getElementById("departureDateSummary")
  departureDateDisplayRef.innerHTML=yy.departureTime;
  let arrivalDateDisplayRef=document.getElementById("estimatedArrivalSummary")
  arrivalDateDisplayRef.innerHTML=yy.arrivalTime;
}
function distanceDisplay()
{
  let distanceFISRef=document.getElementById{"distanceSummary"};
  distanceFISRef.innerHTML=yy.totalDistance;
}
function displayAirplaneInfo()
{
  let registrationRef=document.getElementById("registration")
  registrationRef.innerHTML=;
  let locationRef=document.getElementById("location")
  locationRef.innerHTML=;
  let rangeRef=document.getElementById("range")
  rangeRef.innerHTML=;
  let averageSpeedRef=document.getElementById("averageSpeed")
  averageSpeedRef.innerHTML=;
  let typeRef=document.getElementById("type")
  typeRef.innerHTML=;
  let statusRef=document.getElementById("status")
  statusRef.innerHTML=;
  let airlineRef=document.getElementById("airline")
  airlineRef.innerHTML=;
}
function displayWeatherSummary()
{
  weatherCallback()
  let departureSummaryWeatherRef=document.getElementById("departureSummaryWeather")
  departureSummaryWeatherRef.innerHTML=;
  let arrivalSummaryWeatherRef=document.getElementById("arrivalSummaryWeather")
  arrivalSummaryWeatherRef.innerHTML=;
}
