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
let countryRef=document.getElementById("country");
let cityRef=document.getElementById("city");
function time()
{
  let timeRef=document.getElementById("time").value;
  updateTime(timeRef);
}
function date()
{
  let dataRef=document.getElementById("date").value;
  updateDate(dataRef)
}

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

let airplaneInAirportTep=[];
let airplaneInAirport=[];
let coordinatesOfSelectedAirport=[];
map.on('click', function(e)
{
  let airplaneInAirportTep=[];
  let airplaneData=getAirplanesDataLocalStorage();
  let airportsData=getAirportsDataLocalStorage();
  let coordinates=e.lngLat
  for (let i=0;i<airportsData.length;i++)
  {
    if(coordinates.lng.toFixed(1)==airportsData[i].longitude.toFixed(1) && coordinates.lat.toFixed(1)==airportsData[i].latitude.toFixed(1))
    {
      //getCurrentSelectedAirport
      coordinatesOfSelectedAirport.unshift(airportsData[i])
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
         if (airplaneData.airplanes[k].location==location && airplaneData.airplanes[k].status=="available")
         {
           airplaneInAirport.unshift(airplaneData.airplanes[k])
           airplaneInAirportTep.unshift(airplaneData.airplanes[k])
           available(airplaneInAirportTep)
         }
         else
         {
           unavailable(airplaneInAirportTep)
         }
       }
    }
  }
});
//Available Airplane
function available(data)
{
  if(data !="")
  {
    let tableRef=document.getElementById("table")
    let output="";
    for(let i=0;i<data.length;i++)
    {
       output+=
      `
      <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option${i}">
        <input type="radio" id="option${i}" class="mdl-radio__button" name="options">
        <span class="mdl-radio__label">${data[i].airline}----${data[i].id}------${data[i].registration}-----${data[i].type} --  ${data[i].location} ----- ${data[i].range} Km---- ${data[i].avgSpeed}Km/h ------ ${data[i].status}</span>
      </label>
      <br>
      `;
      tableRef.innerHTML=output;
    }
  }
}
//Unavailable Airline
function unavailable(data)
{
  if(data =="")
  {
    let tableRef=document.getElementById("table")
    let output="No Airplane is Available in this Airport<br>Nearest Airplanes That could reach This Airport Has Been Shown On The Map";
    tableRef.innerHTML=output;
    showAirpotsInTheRange();
  }
}

function showAirpotsInTheRange()
{
  let airportsData=getSelectedAirportDataLocalStorage();
  let airplanesData=getAirplanesDataLocalStorage();
  for(let j=0;j<airplanesData.airplanes.length;j++)
  {
    for(let i=0;i<airportsData.length;i++)
    {
      let range=airplanesData.airplanes[j].range
      let distance=calculateDistance(coordinatesOfSelectedAirport[0].latitude,coordinatesOfSelectedAirport[0].longitude,airportsData[i].latitude,airportsData[i].longitude);
      if(range>=distance && airplanesData.airplanes[j].location==airportsData[i].airportCode)
      {
        let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
        let popup = new mapboxgl.Popup({ offset: 20});
        marker.setLngLat([airportsData[i].longitude,airportsData[i].latitude]);
        let text=`ID:${airplanesData.airplanes[j].id}<br>`
        text+=`Registration:${airplanesData.airplanes[j].registration}<br>`
        text+=`Fly Range:${airplanesData.airplanes[j].range}<br>`
        text+=`AvgSpeed:${airplanesData.airplanes[j].avgSpeed}<br>`
        text+=`Type:${airplanesData.airplanes[j].type}<br>`
        text+=`Status:${airplanesData.airplanes[j].status}<br>`
        text+=`Airline:${airplanesData.airplanes[j].airline}<br>`
        text+=`Location :${airplanesData.airplanes[j].location}<br>`
        popup.setHTML(text);
        marker.setPopup(popup);

        marker.addTo(map);
        popup.addTo(map);
        currentMarkers.push(marker)
      }
    }
  }

  // IDEA: if (distance<=range){show on the map}
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
window.addEventListener("load",function(){airplaneCallback()})
//Create aiport data
function airportCallback()
{
  let url ="https://eng1003.monash/api/v1/airports/";
  let data =
  {
    u: "ylii0235",
    key: DARKSKY_KEY,
    country:countryRef.value,
    city:cityRef.value,
    callback: "updateAirportsLocalStorage"
  };
  webServiceRequest(url,data);
}
window.addEventListener("load",function(){airportCallback()})
//confirm button
let confirmRef=document.getElementById("confirm")
confirmRef.addEventListener("click",function(){confirm()})
function confirm()
{
  time();
  date();
  let optionRef=document.getElementsByName("options")
  if(optionRef.length!=0)
  {
    for(let i=0;i<optionRef.length;i++)
    {
      if(optionRef[i].checked)
      {
        let selectedAirplane=airplaneInAirport[i];
        updateSelectedAirplaneLocalStorage(selectedAirplane);
        window.location="STF_Route.html"
      }
    }
  }
  else
  {
    alert("No airplane has been chosen")
  }
}
//back button
let backRef=document.getElementById("back")
backRef.addEventListener("click",function(){window.location="Homepage.html"})
