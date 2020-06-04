const FLIGHT_INDEX_KEY = "flightIndex";
const FLIGHT_DATA_KEY = "flightData";
const ROUTE_INDEX_KEY = "routeIndex";
const ROUTE_DATA_KEY = "routeData";
const AIRPORT_INDEX_KEY = "airportsIndex";
const AIRPORT_DATA_KEY = "airportsData";
const AIRPLANES_INDEX_KEY = "airplanesIndex";
const AIRPLANES_DATA_KEY= "airplanesdata";
const SELECTED_AIRPORT_DATA_KEY= "selectedAirport";
const SELECTED_AIRPLANE_DATA_KEY= "selectedAirplane";
const TIME_KEY="time"
const DATE_KEY="date"
// webServiceRequest
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
//update time
function updateTime(time)
{
  if (typeof(Storage) !== "undefined")
  {
    localStorage.setItem(`${TIME_KEY}`,JSON.stringify(time));
  }
  else
  {
    console.log("localStorage is not supported by current browser.");
  }
}
//update date
function updateDate(date)
{
  if (typeof(Storage) !== "undefined")
  {
    localStorage.setItem(`${DATE_KEY}`,JSON.stringify(date));
  }
  else
  {
    console.log("localStorage is not supported by current browser.");
  }
}
//update airports
function updateAirportsLocalStorage(airportsData)
{
  if (typeof(Storage) !== "undefined")
  {
    localStorage.setItem(`${AIRPORT_DATA_KEY}`,JSON.stringify(airportsData));
  }
  else
  {
    console.log("localStorage is not supported by current browser.");
  }
}
//updata aiprplanes
function updateAirplanesLocalStorage(airplanesData)
{
  if (typeof(Storage) !== "undefined")
  {
    localStorage.setItem(`${AIRPLANES_DATA_KEY}`,JSON.stringify(airplanesData));
  }
  else
  {
    console.log("localStorage is not supported by current browser.");
  }
}
//update Flight
function updateFlightLocalStorage(flightData)
{
  if (typeof(Storage) !== "undefined")
  {
    localStorage.setItem(`${FLIGHT_DATA_KEY}`,JSON.stringify(flightData));
  }
  else
  {
    console.log("localStorage is not supported by current browser.");
  }
}
//update Route
function updateRouteLocalStorage(routeData)
{
  if (typeof(Storage) !== "undefined")
  {
    localStorage.setItem(`${ROUTE_DATA_KEY}`,JSON.stringify(routeData));
  }
  else
  {
    console.log("localStorage is not supported by current browser.");
  }
}
//update selectedAirport
function updateSelectedAirportsLocalStorage(airportsData)
{
  if (typeof(Storage) !== "undefined")
  {
    localStorage.setItem(`${SELECTED_AIRPORT_DATA_KEY}`,JSON.stringify(airportsData));
  }
  else
  {
    console.log("localStorage is not supported by current browser.");
  }
}
//update selectedAirport
function updateSelectedAirplaneLocalStorage(airportsData)
{
  if (typeof(Storage) !== "undefined")
  {
    localStorage.setItem(`${SELECTED_AIRPLANE_DATA_KEY}`,JSON.stringify(airportsData));
  }
  else
  {
    console.log("localStorage is not supported by current browser.");
  }
}
//get infomation from localStorage
function getFlightDataLocalStorage()
{
  let data = JSON.parse(localStorage.getItem(`${FLIGHT_DATA_KEY}`));
  return data;
}
function getRouteDataLocalStorage()
{
  let data = JSON.parse(localStorage.getItem(`${ROUTE_DATA_KEY}`));
  return data;
}
function getAirportsDataLocalStorage()
{
  let data = JSON.parse(localStorage.getItem(`${AIRPORT_DATA_KEY}`));
  return data;
}
function getAirplanesDataLocalStorage()
{
  let data = JSON.parse(localStorage.getItem(`${AIRPLANES_DATA_KEY}`));
  return data;
}
function getSelectedAirportDataLocalStorage()
{
  let data = JSON.parse(localStorage.getItem(`${SELECTED_AIRPORT_DATA_KEY}`));
  return data;
}
function getSelectedAirplaneLocalStorage()
{
  let data = JSON.parse(localStorage.getItem(`${SELECTED_AIRPLANE_DATA_KEY}`));
  return data;
}
function getTime()
{
  let data = JSON.parse(localStorage.getItem(`${TIME_KEY}`));
  return data;
}
function getDate()
{
  let data = JSON.parse(localStorage.getItem(`${DATE_KEY}`));
  return data;
}
//checkIfDataExistsLocalStorage
function checkIfDataExistsLocalStorage()
{
  let data =localStorage.getItem(`${LOCKER_DATA_KEY}`);
  if ( data !== "undefined" && data !==null && data !=="")
  {
    return true;
  }
  else
  {
    return false;
  }
}

let reviewRef = document.getElementById("viewFilghtInformation")
reviewRef.addEventListener("click",function(){window.location="Flight_Information_Summary.html"})
