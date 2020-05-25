
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

    set origin(newOrigin) { this._origin=newOrigin;}
    set destination(newDestination) {this._destination=newDestination;}
    set waypoints(newWaypoints) { this._waypoints=newWaypoints;}
    set arrivalTime(newArrivalTime) { this._arrivalTime=newArrivalTime;}
    set departureTime(newDepartureTime) {this._departureTime=newDepartureTime;}

    addWaypoints(waypoints){}
    deleteRoute(){}
    displayRoutes(){}
    dispaydepature(){}
    dispayArrivalTime(){}
    toString(){}

  }

  class WeatherInformation
  {
    constructor(location,temperature,typeOfWeather)
    {
       this._location=location;
       this._temperature= temperature;
       this._typeOfWeather=typeOfWeather;
    }
  }

  class PlaneList
  {
    constructor(numberOfAirplane,stateOfAirplane)
    {
      this._numberOfAirplane=numberOfAirplane;
      this._stateOfAirplane=stateOfAirplane;
    }
      get numberOfAirplane(){return this._numberOfAirplane;}
      get stateOfAirplane(){return this._stateOfAirplane;}

      set numberOfAirplane(newNumber){this._numberOfAirplane=newNumber;}
      set stateOfAirplane(newState){this._stateOfAirplane=newState;}
  }

  class InformationOfAirplane
  {
    constructor(model,speed,manufacturer,company,availability, capacity,flyingRange)
     {
        this._model = model;
        this._speed = speed;
        this._manufacturer=manufactuer;
        this._company=company;
        this._availability=availability;
        this._capacity=capacity;
        this._flyingRange=flyingRange;
        this._timeNeeded =0;
      }
        get model(){return this._model;}
        get speed(){return this._speed;}
        get manufactuer(){return this._manufacturer;}
        get company(){return this._company;}
        get availability(){return this._availability;}
        get capacity(){return this._capacity;}
        get flyingRange(){return this.flyingRange;}
        get timeNeeded(){return this._timeNeeded;}

        set model(newModel){this._model=newModel;}
        set speed(newSpeed){this._speed=newSpeed;}
        set manufactuer(newManufacturer){ this._manufacturer=newManufacturer;}
        set company(newCompany){ this._company=newCompany;}
        set availability(newAvailabilty){ this._availability=newAvailabilty;}
        set capacity(newCapacity){ this._capacity=newCapacity;}
        set flyingRange(newFlyingRange){this.flyingRange=newFlyingRange;}
        set timeNeeded(newTime){this._timeNeeded= newTime;}

        addFlights(){}
        toString(){}
        displayInformation(){}

  }

  class CooridinateOfLocation
  {
    constructor(lng1,lat1,alt1,lng2,lat2,alt2)
    {
      this._location1=[lng1,lat1,alt1];
      this._location2=[lng2,lat2,alt2];
      this._distance = 0;
    }
      get location1(){return this._location1;}
      get location2(){return this._location2;}
      get distance(){return this._distance;}


      set location1(newLng1,newlat1,newAlt1){this._location1=[newLng1,newlat1,newAlt1];}
      set location2(newLng2,newlat2,newAlt2){this._location1=[newLng2,newlat2,newAlt2];}
      set distance(newDitance){this._distance=newDistance;}

  }
