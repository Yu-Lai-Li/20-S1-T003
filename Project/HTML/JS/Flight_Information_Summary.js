CONST KEY="39J";
let sample=
{
  airplane:{id:00,registation:"",location:"",range:"",speed:"",type:"",status:"",airline:""},
  distance:0,
  departure:
  {
    airport:"eded",
    coordinates:[12,1],
    time:00
  },
  waypoint:[
    {airport:"eded",
    coordinates:[12,1],
    time:00},
    {airport:"eded",
    coordinates:[12,1],
    time:00}],
  arrival:
  {
    airport:"eded",
    coordinates:[122,-22],
    time:21
  },
}
let sData = JSON.stringify(sample);
localStorage.setItem(KEY, data);
let stringData = localStorage.getItem(KEY);
let dataS=JSON.parse(stringData);

//map display
let latCenter=dataS.departure.coordinates[0]+dataS.arrival.coordinates[0]/2;
let longCenter=dataS.departure.coordinates[1]+dataS.arrival.coordinates[1]/2;
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ2aW5ka2F1ciIsImEiOiJjamt0c20wcXIwOTE3M29tbXYyc2M2aXhsIn0.mOrPB0bbVVm9NitiWvz96w';
let map = new mapboxgl.Map({
  container: 'map',
  center: [latCenter,longCenter],
  zoom: 10,
  style: 'mapbox://styles/mapbox/streets-v9'
});

//MAPmaker
let markersSummary=[];
function displayMarker()
{
  let markerD = new mapboxgl.Marker({ "color": "#000000" });
  markerD.setLngLat(dataS.departure.coordinates);
  markerD.addTo(map);
  markersSummary.push(markerD);
  let markerA = new mapboxgl.Marker({ "color": "#000000" });
  markerA.setLngLat(dataS.arrival.coordinates);
  markerA.addTo(map);
  markersSummary.push(markerA);
  for(let i=0;i<dataS.waypoint;i++)
  {
    let markerW = new mapboxgl.Marker({ "color": "#000000" });
    markerW.setLngLat(dataS.waypoint[i].coordinates)
    markerW.addTo(map);
    markersSummary.push(markerW);
  }
}

//mappOLyline
/*function displayPolyline()
{
  let objectSummary =
  {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
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
}*/

//airplane INFO
function displayAirplaneInfo()
{
    let registationRef=document.getElementById("registation");
    registationRef.innerHTML=`<p>${dataS.airplane.registation}</p>`;
    let locationRef=document.getElementById("location")
    locationRef.innerHTML=`<p>${dataS.airplane.location}</p>`;
    let rangeRef=document.getElementById("range")
    rangeRef.innerHTML=`<p>${dataS.airplane.range}</p>`;
    let averageSpeedRef=document.getElementById("averageSpeed")
    averageSpeedRef.innerHTML=`<p>${dataS.airplane.speed}</p>`;
    let typeRef=document.getElementById("type")
    typeRef.innerHTML=`<p>${dataS.airplane.type}</p>`;
    let statusRef=document.getElementById("status")
    statusRef.innerHTML=`<p>${dataS.airplane.status}</p>`;
    let airlineRef=document.getElementById("airline")
    airlineRef.innerHTML=`<p>${dataS.airplane.airline}</p>`;
}

//Route in text summary display !!!!!filling in innerHTML get from localStorage
function routeDisplaySummary()
{
  let originFISRef=document.getElementById("originSummary");
  originFISRef.innerHTML=dataS.departure.airport;
  if (dataS.waypoint.length!=0)//if has a waypoint
  {
    let wayPointSummaryFISRef=document.getElementById("wayPointSummary");
    for (let i=0;i<dataS.waypoint.length;i++)
    {
      wayPointSummaryFISRef.innerHTML+=``;
    }
    wayPointSummaryFISRef.innerHTML+="<img src="Images/arrow.png" alt="arrowIcon" width="15" height="15">";
  }
  let destinationFISRef=document.getElementById("destinationSummary")
  destinationFISRef.innerHTML=dataS.arrival.airport;
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


const DARKSKY_KEY = "23cecf2fa8b63fd126e3d01a36980bb8"
let url = "https://eng1003.monash/api/v1/darksky/";
let dataDeparture = {
    u: "lgon0004",
    key: DARKSKY_KEY,
    lat: ,
    lng: ,
    time: ,
    callback: "departureWeatherCallback"
}
 webServiceRequest(url,dataDeparture);
 let dataArrival = {
     u: "lgon0004",
     key: DARKSKY_KEY,
     lat: ,
     lng: ,
     time: ,
     callback: "arrivalWeatherCallback"
 }
 webServiceRequest(url,dataArrival);
function departureWeatherCallback()
{
  let output=`<p>Summary: ${weather.daily.summary}</p>`;
  output+=`<p>Current Temperature: ${weather.currently.temperature}</p>`;
  let departureSummaryWeatherRef=document.getElementById("departureSummaryWeather");
  departureSummaryWeatherRef.innerHTML=output;
  let arrivalSummaryWeatherRef=document.getElementById("arrivalSummaryWeather");
  arrivalSummaryWeatherRef.innerHTML=;
}
function arrivalWeatherCallback()
{
  let output=`<p>Summary: ${weather.daily.summary}</p>`;
  output+=`<p>Current Temperature: ${weather.currently.temperature}</p>`;
  let arrivalSummaryWeatherRef=document.getElementById("arrivalSummaryWeather");
  arrivalSummaryWeatherRef.innerHTML=output;
}
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
