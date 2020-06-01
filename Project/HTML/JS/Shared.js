const FLIGHT_INDEX_KEY = "flightIndex";
const FLIGHT_DATA_KEY = "flightData";
const ROUTE_INDEX_KEY = "routeIndex";
const ROUTE_DATA_KEY = "routeData";
const AIRPORT_INDEX_KEY = "airportsIndex";
const AIRPORT_DATA_KEY = "airportsData";
const AIRPLANES_INDEX_KEY = "airplanesIndex";
const AIRPLANS_DATA_KEY= "airplanesdata";
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
    localStorage.setItem(`${AIRPLANS_DATA_KEY}`,JSON.stringify(airplanesData));
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
  let data = JSON.parse(localStorage.getItem(`${AIRPLANS_DATA_KEY}`));
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
