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
//locate Nearby Airport
let countryRef=document.getElementById("country")
let cityRef=document.getElementById("city")
let timeRef=document.getElementById("time")
let dataRef=di=document.getElementById("date")
function positionCallback()
{
  let url ="https://eng1003.monash/api/v1/airports/";
  let data =
  {
    u: "ylii0235",
    key: DARKSKY_KEY,
    country:countryRef.value,
    city:cityRef.value,
    callback: "updateSelectedAirportsLocalStorage"
  };
  webServiceRequest(url,data);
}
//locate Nearby Airplane
function airplaneCallback()
{
  let url ="https://eng1003.monash/api/v1/planes/";
  let data =
  {
    u: "ylii0235",
    key: DARKSKY_KEY,
    callback: "locateAirplane"
  };
  webServiceRequest(url,data);
}

let currentMarkers=[];
function locateAirplane(data)
{
  if (currentMarkers.length>0)
  {
    for (let i = 0; i < currentMarkers.length; i++)
    {
      currentMarkers[i].remove();
    }
  }
  let airportsData=getSelectedAirplanesDataLocalStorage();
  let selectedAirplanes=getAirplanesDataLocalStorage().airplanes;
  for(let i=0;i<selectedAirplanes.length;i++)
  {
    for(let k=0;k<airportsData.length;k++)
    {
      if(selectedAirplanes[i].location==airportsData[k].airportCode)
      {
        let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
        let popup = new mapboxgl.Popup({ offset: 20});
      	marker.setLngLat([airportsData[k].longitude,airportsData[k].latitude]);
        let text=`ID:${selectedAirplanes[i].id}<br>`
        text+=`Registration:${selectedAirplanes[i].registration}<br>`
        text+=`Fly Range:${selectedAirplanes[i].range}<br>`
        text+=`AvgSpeed:${selectedAirplanes[i].avgSpeed}<br>`
        text+=`Type:${selectedAirplanes[i].type}<br>`
        text+=`Status:${selectedAirplanes[i].status}<br>`
        text+=`Airline:${selectedAirplanes[i].airline}<br>`
        popup.setHTML(text);
        marker.setPopup(popup);

        marker.addTo(map);
        popup.addTo(map);
        currentMarkers.push(marker)
      }
    }
  }
}

//Show Range of Airplane
map.on('click', function(e) {
  let airportsData=getAirportsDataLocalStorage();
  let coordinates=e.lngLat
  for (let i=0;i<airportsData.length;i++)
  {

    if(coordinates.lng.toFixed(2)==airportsData[i].longitude.toFixed(2) && coordinates.lat.toFixed(2)==airportsData[i].latitude.toFixed(2))
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
  if (currentMarkers.length>0)
  {
    for (let i = 0; i < currentMarkers.length; i++)
      {
        currentMarkers[i].remove();
        console.log(currentMarkers)
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
  <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp"  id = "availableTable">
    <thead>
      <tr>
        <th class="mdl-data-table__cell--non-numeric" id ="tableAir" >Airline</th>
        <th class="mdl-data-table__cell" id="tableID" >ID</th>
        <th class="mdl-data-table__cell--non-numeric" id="tableReg" >Registration</th>
        <th class="mdl-data-table__cell--non-numeric" id="tableType"  >Type</th>
        <th class="mdl-data-table__cell--non-numeric" id="tableLoc" >Location</th>
        <th class="mdl-data-table__cell" id="tableRange" >Range</th>
        <th class="mdl-data-table__cell" id="tableSpeed" >Average Speed</th>
        <th class="mdl-data-table__cell--non-numeric" id="tableStatus" >Status</th>
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
