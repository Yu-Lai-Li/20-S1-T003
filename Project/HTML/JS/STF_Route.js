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
