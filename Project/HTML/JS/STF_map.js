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
let currentMarkers=[];
function locateAirport()
{
  let airportsData=getSelectedAirportDataLocalStorage();
  if (currentMarkers.length>0)
  {
    for (let i = 0; i < currentMarkers.length; i++)
    {
      currentMarkers[i].remove();
    }
  }
  for(let i=0;i<airportsData.length;i++)
  {
    let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
    let popup = new mapboxgl.Popup({ offset: 20});
    marker.setLngLat([airportsData[i].longitude,airportsData[i].latitude]);
    let text=`${airportsData[i].airportCode}<br>`
    text+=`Airport Name:${airportsData[i].name}<br>`
    text+=`City:${airportsData[i].city}<br>`
    text+=`Country:${airportsData[i].country}<br>`
    popup.setHTML(text);
    marker.setPopup(popup);

    marker.addTo(map);
    popup.addTo(map);
    currentMarkers.push(marker)
  }
}
// Airplanes
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
//locate Airplanes and chosed aiprport
let airplaneData=getAirplanesDataLocalStorage();
let airplaneInAirport=[];
map.on('click', function(e)
{
    let airplaneInAirport=[];
  let airportsData=getAirportsDataLocalStorage();
  let coordinates=e.lngLat
  for (let i=0;i<airportsData.length;i++)
  {
    if(coordinates.lng.toFixed(2)==airportsData[i].longitude.toFixed(2) && coordinates.lat.toFixed(2)==airportsData[i].latitude.toFixed(2))
    {
      //clear markers
      if (currentMarkers.length>0)
      {
        for (let i = 0; i < currentMarkers.length; i++)
        {
          currentMarkers[i].remove();
        }
      }
      //add marker for selected airport
      let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
      let popup = new mapboxgl.Popup({ offset: 20});
      marker.setLngLat([airportsData[i].longitude,airportsData[i].latitude]);
      let text=`${airportsData[i].airportCode}<br>`
      text+=`Airport Name:${airportsData[i].name}<br>`
      text+=`City::${airportsData[i].city}<br>`
      text+=`Country:${airportsData[i].country}<br>`
      popup.setHTML(text);
      marker.setPopup(popup);

      marker.addTo(map);
      popup.addTo(map);
      currentMarkers.push(marker)
      //add airplane in airport
       let location=airportsData[i].airportCode;
       for(let k=0;k<airplaneData.airplanes.length;k++)
       {
         console.log(airplaneData.airplanes[k].location==location)
         if (airplaneData.airplanes[k].location==location)
         {
           airplaneInAirport.push(airplaneData.airplanes[k])
           let tableRef=document.getElementById("table")
           let output="";
           tableRef.innerHTML=output;
         }
         else
         {
           let tableRef=document.getElementById("table")
           let output="No Airplane is Available in this Airport";
           tableRef.innerHTML=output;
           //let distance = function distance
            //if (distance<=airplaneData.aipalenes[k].range)
            //{markrers+theairplen information and airport}
         }
       }
    }
  }
});
//
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
function showAvailableAirplane(airplaneInAirport)
{
  //when airplane is  Available
  if (airplaneInAirport != "")
  {
    let tableRef=document.getElementById("table")
    let output="";
    tableRef.innerHTML=output;
  }
  //When airplane is NOT Available
  else
  {
    let tableRef=document.getElementById("table")
    let output="No Airplane is Available in this Airport";
    tableRef.innerHTML=output;
  }
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
window.addEventListener("load",function(){airplaneCallback()})


/*function showAirplane()
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
        //show airports on the map
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
}*/
/*function showRange(coordinates)
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
}*/
