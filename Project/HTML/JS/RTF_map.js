mapboxgl.accessToken = "pk.eyJ1Ijoicm95eXVsIiwiYSI6ImNrYTUxb3FyZjA3OW0zZnA0dm9kc3g4M24ifQ.CddGHFtKeVdpE02MP4n4gg";
const DARKSKY_KEY = "0e195afd5dd4381cf43dc3f53ea53094";
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [145.135844,-37.911103],
  zoom: 11
})
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
}
//show the path on the map
let airplaneData=getSelectedAirplaneLocalStorage();
let airportsData=getAirportsDataLocalStorage();
let origin=[];
function findOrigin()
{
  for(let i=0;i<airportsData.length;i++)
  {
    if(airplaneData.location==airportsData[i].airportCode)
    {
      map.panTo([airportsData[i].longitude,airportsData[i].latitude])
      origin.push(airportsData[i].longitude);
      origin.push(airportsData[i].latitude);
    }
  }
}
function showThePath()
{
  let pathData=getWaypointsListDataLocalStorage();
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
}
//update final time
class TimeList
{
  constructor()
  {
    this._timeList=[];
  }
  get timeList(){return this._timeList}

  addTime(time)
  {
    this._timeList.push(time)
  }
  formData()
  {

  }
}
let timeList=new TimeList;
function timeLists()
{
  let time =getTime();
  timeList.addTime(time);
  updateTimeList(timeList);
}
//update fianl data
//update final airportss
//update aiprlane list
//update Route
//
window.addEventListener("load",function(){findOrigin()})
window.addEventListener("load",function(){showThePath()})
let backRef=document.getElementById("back")
backRef.addEventListener("click",function(){window.location="STF_Route.html"})
let confirmRef=document.getElementById("confirm")
confirmRef.addEventListener("click",function()
{
  confirm("Are Sure Make This Route?")
  {
    timeLists();
    window.location="Flight_Has_Been_Booked.html";
  }
})
