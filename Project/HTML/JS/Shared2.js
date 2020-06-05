const ORIGIN="origin"
function updateOrigin(origin)
{
  if (typeof(Storage) !== "undefined")
  {
    localStorage.setItem(`${ORIGIN}`,JSON.stringify(origin));
  }
  else
  {
    console.log("localStorage is not supported by current browser.");
  }
}
function getOrigin()
{
  let data = JSON.parse(localStorage.getItem(`${ORIGIN}`));
  return data;
}
