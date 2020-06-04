//mapbox
mapboxgl.accessToken = "pk.eyJ1Ijoicm95eXVsIiwiYSI6ImNrYTUxb3FyZjA3OW0zZnA0dm9kc3g4M24ifQ.CddGHFtKeVdpE02MP4n4gg";
const DARKSKY_KEY = "0e195afd5dd4381cf43dc3f53ea53094";
let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [145.135844,-37.911103],
        zoom: 11
});
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
//show information
window.addEventListener("load",function(){displayInformation()})
//show selectedAirplane
let airplaneData=getSelectedAirplaneLocalStorage();
let airportsData=getAirportsDataLocalStorage();
let origin=[];
window.addEventListener("load",function(){displayLocation()});
function displayLocation()
{
  for(let i=0;i<airportsData.length;i++)
  if(airplaneData.location==airportsData[i].airportCode)
  {
    map.panTo([airportsData[i].longitude,airportsData[i].latitude])
    origin.push(airportsData[i].longitude);
    origin.push(airportsData[i].latitude);

    let marker = new mapboxgl.Marker({ "color": "#FF0D00" });
    let popup = new mapboxgl.Popup({ offset: 20});
    marker.setLngLat([airportsData[i].longitude,airportsData[i].latitude]);
    let text=`ID:${airplaneData.id}<br>`
    text+=`Fly Range:${airplaneData.range}<br>`
    text+=`AvgSpeed:${airplaneData.avgSpeed}<br>`
    text+=`Type:${airplaneData.type}<br>`
    text+=`Status:${airplaneData.status}<br>`
    text+=`Airline:${airplaneData.airline}<br>`
    popup.setHTML(text);
    marker.setPopup(popup);

    marker.addTo(map);
    popup.addTo(map);
  }
}
//Search for airports
let countryRef=document.getElementById("country");
let cityRef=document.getElementById("city");
let currentMarkers=[];
function positionCallback()
{
  let url ="https://eng1003.monash/api/v1/airports/";
  let data =
  {
    u: "ylii0235",
    key: DARKSKY_KEY,
    country:countryRef.value,
    city:cityRef.value,
    callback: "search"
  };
  webServiceRequest(url,data);
}
function search(data)
{
  if (currentMarkers.length>0)
  {
    for (let i = 0; i < currentMarkers.length; i++)
    {
      currentMarkers[i].remove();
    }
  }
  for(let i=0;i<data.length;i++)
  {
    let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
    let popup = new mapboxgl.Popup({ offset: 20});
    marker.setLngLat([data[i].longitude,data[i].latitude]);
    let text=`${data[i].airportCode}<br>`
    text+=`Airport Name:${data[i].name}<br>`
    text+=`City:${data[i].city}<br>`
    text+=`Country:${data[i].country}<br>`
    popup.setHTML(text);
    marker.setPopup(popup);

    marker.addTo(map);
    popup.addTo(map);
    currentMarkers.push(marker)
  }
}
//Route
class Waypoint
{
  constructor(airportN,code,lat,lng)
  {
    this._airportName=airportN;
    this._code=code;
    this._coordinates=[lng,lat]
  }
    get airportName(){return this._airportName}
    get code(){return this._code}
    get coordinates(){return this.coordinates}


    set airportName(newName){ this._airportName=newName}
    set code(newCode){this._code=newCode}
    set coordinates(newCoordinate){this._coordinates=newCoordinate}
    fromData(data)
    {
      this._airportName=data._airportName;
      this._code=data._code;
      this._coordinates=[data._coordinates[0],data._coordinates[1]];

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
//addWaypoints
let routeList= new RouteList();
map.on('click', function(e)
{
  let airportsData=getAirportsDataLocalStorage();
  let coordinates=e.lngLat
  for (let i=0;i<airportsData.length;i++)
  {
    if(coordinates.lng.toFixed(1)==airportsData[i].longitude.toFixed(1) && coordinates.lat.toFixed(1)==airportsData[i].latitude.toFixed(1))
    {
      let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
      let popup = new mapboxgl.Popup({ offset: 20});
      marker.setLngLat([airportsData[i].longitude,airportsData[i].latitude]);
      let text=`AirpoertName:${airportsData[i].name}<br>`
      text+=`Airport Code:${airportsData[i].airportCode}<br>`
      popup.setHTML(text);
      marker.setPopup(popup);

      marker.addTo(map);
      popup.addTo(map);
      let waypoints= new Waypoint(airportsData[i].name,airportsData[i].airportCode,airportsData[i].latitude,airportsData[i].longitude);
      routeList.addRoute(waypoints);
      updateRouteListLocalStorage(routeList);
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
function calculateTimeNeeded(distance)
{
  let airplaneData=getSelectedAirplaneLocalStorage();
  let time =distance/airplaneData.avgSpeed
  return time
}
//Dispaly Time Needed and distance
function displayDistanceAndTime()
{
  let distances=[];
  distances.push(origin);
  let pathData=getRouteListDataLocalStorage();
  for(let i=0;i<pathData._routeList.length;i++)
  {
      distances.push(pathData._routeList[i]._coordinates)
  }
  for(let k=0;k<distances.length;k++)
  {
    let distanceBetween=calculateDistance(distances[k][1],distances[k][0],distances[k+1][1],distances[k+1][0]);
    let timeNeeded=calculateTimeNeeded(distanceBetween);
    let totalDistance="";
        totalDistance+=distanceBetween;
      let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
      let popup = new mapboxgl.Popup({ offset: 40});
      marker.setLngLat([distances[k+1][0],distances[k+1][1]]);
      let text=`${distanceBetween.toFixed(2)} Km From Last Airport<br>`
      text+=`Needs ${timeNeeded.toFixed(3)} hours`
      popup.setHTML(text);
      marker.setPopup(popup);

      marker.addTo(map);
      popup.addTo(map);
  }
}
//showPathway
function showPath()
{

  let pathData=getRouteListDataLocalStorage();
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
  object.data.geometry.coordinates.push(origin);
  for(let i = 0; i < pathData._routeList.length; i++)
  {
    object.data.geometry.coordinates.push(pathData._routeList[i]._coordinates);
  }

  map.addLayer({
    id: "routes",
    type: "line",
    source: object,
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#888", "line-width": 6 }
  });
    displayDistanceAndTime()
}
let backRef=document.getElementById("back")
backRef.addEventListener("click",function(){window.location="Scheduling_The_Flight.html"})
