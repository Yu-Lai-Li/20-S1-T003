
mapboxgl.accessToken = "pk.eyJ1Ijoicm95eXVsIiwiYSI6ImNrYTUxb3FyZjA3OW0zZnA0dm9kc3g4M24ifQ.CddGHFtKeVdpE02MP4n4gg";
const DARKSKY_KEY = "0e195afd5dd4381cf43dc3f53ea53094";
let map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [145.135844,-37.911103], // starting position [lng, lat]
  zoom: 11 // starting zoom
})
if('geolocation' in navigator)
{
  navigator.geolocation.getCurrentPosition(positionCallback);
}
else
{
  alert("geolocation IS NOT available");
}

function positionCallback(position)
{
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  map.panTo([lng,lat]);
  let url ="https://eng1003.monash/api/v1/darksky/";
  let data ={
    u: "ylii0235",
    key: DARKSKY_KEY,
    lat: lat,
    lng: lng,
    callback: "weatherCallback"
  }
  webServiceRequest(url,data)
}

function weatherCallback(weather)
{
  if(weather.daily.summary=//TypeOfWeather)
    {
      //Picture
    }
  }

  function showFleetInformation()
  {
    let fleetInformation = JOSN.parse(localStorage.getItem("fleet-data"))
  }

  class Time
  {
    constructor(date)
    {
      this._date =""
    }
    get date(){return this._date;}

    set date(newDate){this._date = newDate;}
  }

  class RouteList
  {
    constructor(origin="",destination="",waypoints="",arrivalTime=0,departureTime=0,totalDistance=0)
    {
      this._origin=origin;
      this._destination=destination;
      this._waypoints=waypoints;//waypoints in array list
      this._arrivalTime=arrivalTime;
      this._departureTime=departureTime;
      this._totalDistance=totalDistance;
    }

    get origin() {return this._origin;}
    get destination() {return this._destination;}
    get waypoints() {return this._waypoints;}
    get numberOfWaypoints() {return this._waypoints.length;}
    get arrivalTime() {return this._arrivalTime;}
    get departureTime() {return this._departureTime;}
    get totalDistance() {return this._totalDistance;}

 set origin(newOrigin) {return this._origin=newOrigin;}
 set destination(newDestination) {return this._destination=newDestination;}
 set waypoints(newWaypoints) {return this._waypoints=newWaypoints;}
 set arrivalTime(newArrivalTime) {return this._arrivalTime=newArrivalTime;}
  set departureTime(newDepartureTime) {return this._departureTime=newDepartureTime;}

 addWaypoints(waypoints){}
 deleteRoute(){}
 displayRoutes(){}
 dispaydepature(){}
 dispayArrivalTime(){}
 toString(){}

}

class WeatherInformation
{}

class PlaneList
{}

class InformationOfAirplane
{
  constructor(model,speed,manufacturer,company,availability, capacity, flyingRange,locationOfAirplane)
  {
    this._model=model;
    this._speed=speed;
    this._manufacturer=manufactuer;
    this._company=company;
    this._availability=availability;
    this._capacity=capacity;
    this._flyingRange=flyingRange;
    this._locationOfAirplane=flyingRange;
  }

get model() {return this._model;}
get speed() {return this._speed;}
get manufactuer(){return this._manufacturer;}
get company () {return this._company;}
get availability() {return this._availability;}
get capacity(){return this._capacity;}
get flyingRange(){return this._flyingRange;}
get locationOfAirplane() {return this._locationOfAirplane;}


set availability(newAvailabilty) {return this._availability=newAvailabilty;}
set flyingRange(newFlyingRange){return this._flyingRange=newFlyingRange;}
set locationOfAirplane(newLocationOfAirplane) {return this._locationOfAirplane=newLocationOfAirplane;}

addFlights(){}
toString(){}
displayInformation(){}

}

class CooridinateOfLocation
{}
