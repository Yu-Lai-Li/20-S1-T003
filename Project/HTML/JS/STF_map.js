mapboxgl.accessToken = "pk.eyJ1Ijoicm95eXVsIiwiYSI6ImNrYTUxb3FyZjA3OW0zZnA0dm9kc3g4M24ifQ.CddGHFtKeVdpE02MP4n4gg";
const DARKSKY_KEY = "0e195afd5dd4381cf43dc3f53ea53094";
let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [145.135844,-37.911103],
        zoom: 11
});

function positionCallback(position)
{
  let countryRef=document.getElementById("country");
  let cityRef=document.getElementById("city");
  let country=countryRef.value;
  let city =cityRef.value;
  let url ="https://eng1003.monash/api/v1/airports/";
  let data =
  {
    u: "ylii0235",
    key: DARKSKY_KEY,
    country:country,
    city:city,
    callback: "airportCallback"
  };
  webServiceRequest(url,data);
}
  let currentMarkers=[];
function airportCallback(data)
{
  if (currentMarkers.length>0)
  {
    for (let i = 0; i < currentMarkers.length; i++)
    {
      currentMarkers[i].remove();
    }
  }

  for (let i = 0; i < data.length; i++)
  {
    let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
    let popup = new mapboxgl.Popup({ offset: 20});
  	marker.setLngLat([data[i].longitude,data[i].latitude]);
    let text=`${data[i].airportCode}<br>${data[i].name}`
    popup.setHTML(text);
    marker.setPopup(popup);

    marker.addTo(map);
    popup.addTo(map);

    currentMarkers.push(marker)
  }
}



/*function airplaneCallback()
{
  let url ="https://eng1003.monash/api/v1/airplane/";
  let data =
  {
    u: "ylii0235",
    key: DARKSKY_KEY,
    callback: "locateAirplane"
  };
  webServiceRequest(url,data);
}
function locateAirplane(data)
{
  for (let i = 0; i < data.length; i++)
  {
  	let popup = new mapboxgl.Popup({ offset: 45});
  	popup.setText(data[i].id);
  	marker.setPopup(popup);
  	marker.addTo(map);
  	popup.addTo(map);
  }
}*/
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
