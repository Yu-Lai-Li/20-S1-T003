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
