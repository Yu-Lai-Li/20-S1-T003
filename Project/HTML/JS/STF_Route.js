//mapbox
mapboxgl.accessToken = "pk.eyJ1Ijoicm95eXVsIiwiYSI6ImNrYTUxb3FyZjA3OW0zZnA0dm9kc3g4M24ifQ.CddGHFtKeVdpE02MP4n4gg";
const DARKSKY_KEY = "0e195afd5dd4381cf43dc3f53ea53094";
let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [145.135844,-37.911103],
        zoom: 11
});
if('geolocation' in navigator)
{
  navigator.geolocation.getCurrentPosition(currentLocationCallback);
}
else
{
  alert("Geolocation Is Not Available");
}
function currentLocationCallback(position)
{
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  map.panTo([lng,lat]);
}
function displayInformation()
{
  let divRef = document.getElementById("selectedFlightInformation")
  let information=getSelectedAirplaneLocalStorage();
  let time=getTime();
  let date=getDate();
  let output="";
      output+=`<br><h3>For<br> ${information.registration} in ${information.location}`;
      output+=`<br>at ${time}|| ${date}</h3>`;
    divRef.innerHTML=output;

}
window.addEventListener("load",function(){displayInformation()})
let airplaneData=getAirplanesDataLocalStorage();
//Route
class Route
{
  constructor(airportN,code,lat,lng)
  {
    this._airportName=airportN;
    this._code=code;
    this._latitude=lat;
    this._longitude=lng;
  }
    get airportName(){return this._airportName}
    get code(){return this._code}
    get latitude(){return this._latitude}
    get longitude(){return this._longitude}

    set airportName(newName){ this._airportName}
    set code(newCode){this._code}
    set latitude(newLat){this._latitude}
    set longitude(newLng){this._longitude}

    fromData(data)
    {
      this._airportName=data._airportName;
      this._code=data._code;
      this._latitude=data._latitude;
      this._longitude=data._longitude;
    }
}
//RouteList
class RouteList
{
  constructor()
  {
    this._routeList=[];
  }
    get routeList(){return this._routeList}
  addRoute(route)
  {
    this._routeList.push(route)
  }
  formData(data)
  {
    this._routeList = [];
    for(let i = 0; i < data.routeList.length; i++)
    {
      let route = new Route();
      route.fromData(data._routeList[i]);
      this._lockers.push(route);
    }
  }
}
//
map.on('click', function(e)
{
  let airportsData=getAirportsDataLocalStorage();
  let coordinates=e.lngLat
  for (let i=0;i<airportsData.length;i++)
  {
    if(coordinates.lng.toFixed(1)==airportsData[i].longitude.toFixed(1) && coordinates.lat.toFixed(1)==airportsData[i].latitude.toFixed(1))
    {

    }
  }
});
function calculateDistance(latitude1,longitude1,latitude2,longitude2)
{
		 let R = 6371e3;
		 let φ1 = latitude1 * Math.PI/180;
		 let φ2 = latitude2 * Math.PI/180;
		 let Δφ = (latitude2-latitude1) * Math.PI/180;
		 let Δλ = (longitude2-longitude1) * Math.PI/180;
		 let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) *Math.sin(Δλ/2) * Math.sin(Δλ/2);
		 let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		 let distance =(R * c)/1000;
     return distance;
}
function calculateTimeNeeded(speed)
{
  //distancs/speed
}
function showPath()
{
  let object = {
    type: "geojson",
    data:
    {
      type: "Feature",
      properties: {},
      geometry:
      {
        type: "LineString",
        coordinates: []
      }
    }
  };
  for(let i = 0; i < locations.length; i++)
  {
    object.data.geometry.coordinates.push(locations[i].coordinates);
  }

  map.addLayer({
    id: "routes",
    type: "line",
    source: object,
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#888", "line-width": 6 }
  });
}
