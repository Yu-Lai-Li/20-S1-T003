// TODO: Task 1 - Add a map on the page in the div 'mapArea'
// 		 You will need to add some code from MapBox here to:
//       1. define the access token 'mapboxgl.accessToken'
//       2. initialise a map (default to your country capital coordinates)
//       3. check if geolocation is supported. If it is supported, make a call to getCurrentPosition
//          with the callback function defined in task 2 below
//       	https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
//       4. if geolocation is not supported, display a suitable error to the user using alert()
//
mapboxgl.accessToken = "pk.eyJ1Ijoicm95eXVsIiwiYSI6ImNrYTUxb3FyZjA3OW0zZnA0dm9kc3g4M24ifQ.CddGHFtKeVdpE02MP4n4gg";
const DARKSKY_KEY = "0e195afd5dd4381cf43dc3f53ea53094";
let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [145.135844,-37.911103], // starting position [lng, lat]
        zoom: 11 // starting zoom
})
/*if('geolocation' in navigator)
{
  navigator.geolocation.getCurrentPosition(positionCallback);/* geolocation is available */
//}
//else {
    //alert("geolocation IS NOT available");
  /* geolocation IS NOT available */
//}
// TODO: Task 2 - Write the callback function for getCurrentPosition (from Task 1/Step 3)
// 		 You should call this function 'positionCallback'.
// 		 This function will run when the geolocation API returns a position and is responsible for:
// 		 1. using panTo method from MapBox to get the map to go to the current coordinates
// 		 2. make a request to the Weather API for the current weather for the current location with
// 		    the callback function defined in task 3
//
/*function positionCallback(position)
{
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  map.panTo([lng,lat]);
  let url ="https://eng1003.monash/api/v1/darksky/";
  let data ={
              u: "ylii0235",
              key: DARKSKY_KEY,
              lat: lat,
              lng: lng,
              callback: "weatherCallback"
            }
    webServiceRequest(url,data)
	// your code here
}*?


// TODO: Task 3 - Write the callback function for the Weather API request (from Task 2/Step 2)
// 		 You should call this function 'weatherCallback'.
// 		 This function will run when the weather API returns data and is responsible for:
// 		 1. displaying the relevant current weather information on the HTML page.
//
/*function weatherCallback(weather)
{
  let output="";
  output += `<tr><th>Summary</th><td>${weather.daily.summary}</td></tr>`
  let tableRef = document.getElementById("table-weather")
  tableRef.innerHTML = output;
	// your code here
}*/
