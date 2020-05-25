mapboxgl.accessToken = "pk.eyJ1Ijoicm95eXVsIiwiYSI6ImNrYTUxb3FyZjA3OW0zZnA0dm9kc3g4M24ifQ.CddGHFtKeVdpE02MP4n4gg";
const DARKSKY_KEY = "0e195afd5dd4381cf43dc3f53ea53094";
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [145.135844,-37.911103],
  zoom: 11
})

if('geolocation' in navigator)
{
  navigator.geolocation.getCurrentPosition(positionCallback);
}
else
{
  alert("Geolocation Is Not Available");
}

function positionCallback(position)
{
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  map.panTo([lng,lat]);
  let url ="https://eng1003.monash/api/v1/darksky/";
  let data =
  {
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
  //show weather
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

  deleteRoute()
  {
    localStorage.removeItem("routeInformation") //remove data about route
  }


  //  Display feature function apply to all
  displayItem() {
    //retrieve Information
    let displayItem =
    sessionStorage.getItem("gfg");
    //display item
    document.getElementById(
      "coloumn_on_table").innerHTML = displayItem
    }

    dispaydepature(){}
    dispayArrivalTime(){}
    let routeInformation="";
    toString()
    {
      routeInformation += "origin: ,destination:, waypoints:, arrival time:, departure time:, total distance:" //add retrieval of information
      return routeInformation
    }
  }

class WeatherInformation
{
  constructor(location,temperature,typeOfWeather)
  {
    this._location=location;
    this._temperature= temperature;
    this._typeOfWeather=typeOfWeather;
  }
  get location(){return this._location;}
  get temperature(){return this._temperature;}
  get typeOfWeather(){return this._typeOfWeather;}

  set location(newLocation){this._location=newLocation;}
  set temperature(newTemperature){this._temperature=newTemperature;}
  set typeOfWeather(newType){this._typeOfWeather=newType;}

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

class CoordinateOfLocation
  {
    constructor(lng1,lat1,lng2,lat2)
    {
      this._location1=[lng1,lat1];
      this._location2=[lng2,lat2];
      this._distance =0;
    }
      get location1(){return this._location1;}
      get location2(){return this._location2;}
      get distance(){return this._distance;}


      set distance(newDistance){this._distance=newDistance;}

	  calculateDistance()
	  {
		 let R = 6371e3;
		 let φ1 = this.location1[1] * Math.PI/180;
		 let φ2 = this.location2[1] * Math.PI/180;
		 let Δφ = (this.location2[1]-this.location1[1]) * Math.PI/180;
		 let Δλ = (this.location2[0]-this.location1[0]) * Math.PI/180;
		 let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) *Math.sin(Δλ/2) * Math.sin(Δλ/2);
		 let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		 this.distance =(R * c)/1000;

		 return this.distance;
	  }
	  toString()
	  {}
  }
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

function storeFleetInformation()
{
  let fleetInformation = JOSN.parse(localStorage.getItem("fleet-data"))
}
