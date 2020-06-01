const FLIGHT_INDEX_KEY = "flightIndex";
const FLIGHT_DATA_KEY = "flightData";
function updateLocalStorage(data)
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
