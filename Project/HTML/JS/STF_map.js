mapboxgl.accessToken = "pk.eyJ1Ijoicm95eXVsIiwiYSI6ImNrYTUxb3FyZjA3OW0zZnA0dm9kc3g4M24ifQ.CddGHFtKeVdpE02MP4n4gg";
const DARKSKY_KEY = "0e195afd5dd4381cf43dc3f53ea53094";
let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [145.135844,-37.911103],
        zoom: 11
});
//locate user
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
//locate Airport
function positionCallback()
{
  let url ="https://eng1003.monash/api/v1/airports/";
  let data =
  {
    u: "ylii0235",
    key: DARKSKY_KEY,
    country:"",
    city:"",
    callback: "updateAirportsLocalStorage"
  };
  webServiceRequest(url,data);
}
let currentMarkers=[];
let airportsData=getAirportsDataLocalStorage();
function locateAirport()
{
  if (currentMarkers.length>0)
  {
    for (let i = 0; i < currentMarkers.length; i++)
    {
      currentMarkers[i].remove();
    }
  }

  for (let i = 0; i < airportsData.length; i++)
  {
    let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
    let popup = new mapboxgl.Popup({ offset: 20});
  	marker.setLngLat([airportsData[i].longitude,airportsData[i].latitude]);
    let text=`${airportsData[i].airportCode}<br>${airportsData[i].name}`
    popup.setHTML(text);
    marker.setPopup(popup);

    marker.addTo(map);
    popup.addTo(map);

    currentMarkers.push(marker)
  }
}


//locate Airplane
function airplaneCallback()
{
  let url ="https://eng1003.monash/api/v1/planes/";
  let data =
  {
    u: "ylii0235",
    key: DARKSKY_KEY,
    callback: "updateAirplanesLocalStorage"
  };
  webServiceRequest(url,data);
}
let airplanes=getAirplanesDataLocalStorage().airplanes;
function locateAirplane()
{
  for(let i=0;i<airplanes.length;i++)
  {
    for(let k=0;k<airportsData.length;k++)
    {
      if(airplanes[i].location==airportsData[k].airportCode)
      {
        let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
        let popup = new mapboxgl.Popup({ offset: 20});
      	marker.setLngLat([airportsData[k].longitude,airportsData[k].latitude]);
        let text=`${airplanes[i].id}<br>${airplanes[i].location}`
        popup.setHTML(text);
        marker.setPopup(popup);

        marker.addTo(map);
        popup.addTo(map);
      }
    }
  }
}


function calculateDistance()
{
		 let R = 6371e3;
		 let φ1 = this.location1[1] * Math.PI/180;
		 let φ2 = this.location2[1] * Math.PI/180;
		 let Δφ = (this.location2[1]-this.location1[1]) * Math.PI/180;
		 let Δλ = (this.location2[0]-this.location1[0]) * Math.PI/180;
		 let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) *Math.sin(Δλ/2) * Math.sin(Δλ/2);
		 let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		 let distance =(R * c)/1000;
     return distance;
}
window.addEventListener("load",function(){positionCallback()})
window.addEventListener("load",function(){airplaneCallback()})
window.addEventListener("load",function(){locateAirplane()})
