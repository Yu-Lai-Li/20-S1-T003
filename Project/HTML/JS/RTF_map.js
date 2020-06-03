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
  console.log(weather.currently.icon)
}




/*class RouteList
{
  constructor(origin="",destination="",arrivalTime=0,departureTime=0,totalDistance=0)
  {
    this._origin=origin;
    this._destination=destination;
    this._waypoints=[];//waypoints in array list
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

  addWayPoints(platform)
  {
    this.waypoints.push(platform);
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
*/
