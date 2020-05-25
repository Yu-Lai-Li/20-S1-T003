mapboxgl.accessToken = "pk.eyJ1Ijoicm95eXVsIiwiYSI6ImNrYTUxb3FyZjA3OW0zZnA0dm9kc3g4M24ifQ.CddGHFtKeVdpE02MP4n4gg";
const DARKSKY_KEY = "0e195afd5dd4381cf43dc3f53ea53094";
let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [145.135844,-37.911103], // starting position [lng, lat]
        zoom: 11 // starting zoom
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
function webServiceRequest(url,data)
{
    let params = "";
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                params += "?";
            }
            else
            {
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
         }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);
}

function airportCallback(data)
{
  console.log(data);
  for (let i = 0; i < data.length; i++)
  {
  	let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
  	marker.setLngLat(data.longitude,data.latitude);

  	let popup = new mapboxgl.Popup({ offset: 45});
  	popup.setText(data.airportCode);

  	marker.setPopup(popup);

  	// Display the marker.
  	marker.addTo(map);

  	// Display the popup.
  	popup.addTo(map);
  }
}


function search()
{
  let fleetInformation = {Date:"",Time:"",Country:"",Airport:""};
  let dateRef=document.getElementById("date");
  let timeRef=document.getElementById("time");
  let countryRef = document.getElementById ("country");
  let airportRef = document.getElementById("airport");


  //fleetInformation.Date=dateRef.value
  //fleetInformation.Time=timeRef.value}
  //fleetInformation.Country = countryRef.value
  //fleetInformation.Airport= airportRef.value


}
