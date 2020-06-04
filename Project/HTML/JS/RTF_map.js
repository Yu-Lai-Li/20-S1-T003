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
  console.log(weather.currently.icon)
}
//update final time
//update fianl data
//update final airplane
//update final airportss
//update aiprlane list
//update Route
//navigation to next page
//windowEVENT
//
let backRef=document.getElementById("back")
backRef.addEventListener("click",function(){window.location="STF_Route.html"})
let confirmRef=document.getElementById("confirm")
confirmRef.addEventListener("click",function()
{
  confirm("Are Sure Make This Route?")
  {
    window.location="Flight_Has_Been_Booked.html";
  }
})
