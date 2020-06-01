const FLIGHT_INDEX_KEY = "flightIndex";
const FLIGHT_DATA_KEY = "flightData";
const ROUTE_INDEX_KEY = "routeIndex";
const ROUTE_DATA_KEY = "routeData";

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
//update LocalStorage
function updateFlightLocalStorage(flightData)
{
  if (typeof(Storage) !== "undefined")
  {
    localStorage.setItem(`${FLIGHT_DATA_KEY}`,JSON.stringify(data));
  }
  else
  {
    console.log("localStorage is not supported by current browser.");
  }
}
function updateRouteLocalStorage(routeData)
{
  if (typeof(Storage) !== "undefined")
  {
    localStorage.setItem(`${ROUTE_DATA_KEY}`,JSON.stringify(data));
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
unction getRouteDataLocalStorage()
{
  let data = JSON.parse(localStorage.getItem(`${ROUTE_DATA_KEY}`));
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

//Plane Class
