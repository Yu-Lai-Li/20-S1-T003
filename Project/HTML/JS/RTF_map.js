
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
  constructor("date")
  {
    this._date =""
  }
     get date(){return this._date;}

     set date(newDate){this._date = newDate}
}

class RouteList
{}

class WeatherInformation
{}

class PlaneList
{}

class InformationOfAirplane
{}

class CooridinateOfLocation
{}
