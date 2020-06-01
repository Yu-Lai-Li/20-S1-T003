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
/*function locateAirport()
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
}*/


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
function search()
{
  countryRef=document.getElementById("country")
  cityRef=document.getElementById("city")
}
let currentMarkers1=[];
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
        let text=`ID:${airplanes[i].id}<br>`
        text+=`Registration:${airplanes[i].registration}<br>`
        text+=`Fly Range:${airplanes[i].range}<br>`
        text+=`AvgSpeed:${airplanes[i].avgSpeed}<br>`
        text+=`Type:${airplanes[i].type}<br>`
        text+=`Status:${airplanes[i].status}<br>`
        text+=`Airline:${airplanes[i].airline}<br>`
        popup.setHTML(text);
        marker.setPopup(popup);

        marker.addTo(map);
        popup.addTo(map);
        currentMarkers1.push(marker)
      }
    }
  }
}
//Show Range of Airplane
map.on('click', function(e) {
  let coordinates=e.lngLat
  for (let i=0;i<airportsData.length;i++)
  {
    if(Math.round(coordinates.lng)==Math.round(airportsData[i].longitude) && Math.round(coordinates.lat)==Math.round(airportsData[i].latitude))
    {
      showRange(coordinates)
      showAirpotsInTheRange();
      showAvailableAirplane()
    }
  }
});
function showRange(coordinates)
{
  map.addSource('circle', {
    "type": "geojson",
    "data": {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [coordinates.lng,coordinates.lat]
      },
      "properties": {}
    }
  });

  map.addLayer({
    id: 'circle',
    type: 'circle',
    source: 'circle',
    paint: {
      'circle-color': '#00b7bf',
      'circle-radius': 100,
      'circle-opacity': 0.2,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#333',
    },
  });
}
function showAirpotsInTheRange()
{
  if (currentMarkers1.length>0)
  {
    for (let i = 0; i < currentMarkers1.length; i++)
      {
        currentMarkers1[i].remove();
        console.log(currentMarkers1)
      }
  }
  // IDEA: if (distance<=range){show on the map}
}
//show Available Airplane in Table
function showAvailableAirplane()
{
  let tableRef=document.getElementById("table")
  let output=""
  output +=
  `
  <table class="mdl-data-table mdl-js-data-table" id = "availableTable">
    <thead>
      <tr>
        <th class="mdl-data-table__cell--non-numeric" id ="tableAir" onclick="sortTableByAirline()">Airline</th>
        <th class="mdl-data-table__cell" id="tableID" onclick="sortTableById()">ID</th>
        <th class="mdl-data-table__cell--non-numeric" id="tableReg" onclick="sortTableByRegistration()">Registration</th>
        <th class="mdl-data-table__cell--non-numeric" id="tableType" onclick="sortTableByType()" >Type</th>
        <th class="mdl-data-table__cell--non-numeric" id="tableLoc" onclick="sortTableByLocation()">Location</th>
        <th class="mdl-data-table__cell" id="tableRange" onclick= "sortTableByRange()">Range</th>
        <th class="mdl-data-table__cell" id="tableSpeed" onclick="sortTableByAvgSpeed()">Average Speed</th>
        <th class="mdl-data-table__cell--non-numeric" id="tableStatus" onclick="sortTableByStatus">Status</th>
      </tr>
    </thead>
    <tbody>
  `;
  tableRef.innerHTML=output;
}
function calculateDistance(location1,location2)
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
function calculateTimeNeeded(speed)
{
  //distancs/speed
}
window.addEventListener("load",function(){positionCallback()})
window.addEventListener("load",function(){airplaneCallback()})
window.addEventListener("load",function(){locateAirplane()})
