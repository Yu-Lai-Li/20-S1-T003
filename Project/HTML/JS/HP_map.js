mapboxgl.accessToken = "pk.eyJ1Ijoicm95eXVsIiwiYSI6ImNrYTUxb3FyZjA3OW0zZnA0dm9kc3g4M24ifQ.CddGHFtKeVdpE02MP4n4gg";

let map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [133.7751,25.2744], // starting position [lng, lat]
  zoom: 1 // starting zoom
})

//create 2 flight data - 1.scheduled + current 2. historical (if date is pass today display these flights)
//add data about stored locations

let route1= [ //sample route for scheduled+current
  {
    coordinates: [145.133934, -37.910572],
    description: 'origin: melbourne'
  },
  {
    coordinates: [153.1218,-27.3942 ],
    description: 'waypoint: brisbane'
  },
  {
    coordinates: [113.298889,23.392500],
    description: 'final destination: china'
  }

];

let route2= [ //sample route for historical flights
  {
    coordinates: [151.2,33.86],
    description: 'origin: melbourne'
  },

  {
    coordinates: [106.34,56.13],
    description: 'final destination: china'
  }

];
let currentScheduledMarkers=[];
let currentHistoricalMarkers=[];
function displayScheduledMarker()
{

  for (let i = 1; i < route1.length; i++)
  {
    let route = route1[i];
    let marker = new mapboxgl.Marker({ "color": "#000000" });
    marker.setLngLat(route.coordinates);

    let popup = new mapboxgl.Popup({ offset: 45});
    popup.setText(route.description);

    marker.setPopup(popup);

    // Display the marker.
    marker.addTo(map);
    currentScheduledMarkers.push(marker);


    //  popup.addTo(map); if we need to display pop up information on click
  }
}

function displayHistoricalMarker()
{

  for (let i = 1; i < route2.length; i++)
  {
    let route = route2[i];
    let marker = new mapboxgl.Marker({ "color": "#000000" });
    marker.setLngLat(route.coordinates);

    let popup = new mapboxgl.Popup({ offset: 45});
    popup.setText(route.description);

    marker.setPopup(popup);

    // Display the marker.
    marker.addTo(map);
    currentHistoricalMarkers.push(marker);


    //  popup.addTo(map); if we need to display pop up information on click
  }
}
function displayScheduledPolyline()
{
  let object = {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: []
      }
    }
  };

  for(let i = 0; i < route1.length; i++)
  {
    object.data.geometry.coordinates.push(route1[i].coordinates);
  }

  map.addLayer({
    id: "routes",
    type: "line",
    source: object,
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#FF6347", "line-width": 6 }
  });
}
function displayHistoricalPolyline()
{
  let object2 = {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: []
      }
    }
  };

  for(let i = 0; i < route2.length; i++)
  {
    object2.data.geometry.coordinates.push(route2[i].coordinates);
  }

  map.addLayer({
    id: "historical",
    type: "line",
    source: object2,
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#FF8C00", "line-width": 6 }
  });
}

function displayRoute() {
  // Get the checkbox

  let checkBox = document.getElementById("switch-1");
  // If the checkbox is checked, display the marker and line
  if (checkBox.checked == true)
  {
    if (map.getLayer("historical")!==null)
    {
      map.removeLayer("historical");
      map.removeSource("historical");
      for (let i=0; i<currentHistoricalMarkers.length;i++)
      {
        if(currentHistoricalMarkers.length>0)
        {
          currentHistoricalMarkers[i].remove();
        }
      }
    }
    displayScheduledMarker();
    displayScheduledPolyline();


  }

  if (checkBox.checked == false)
  {
    displayHistoricalMarker();
    displayHistoricalPolyline();
    if (map.getLayer("routes")!==null)
    {
      map.removeLayer("routes");
      map.removeSource("routes");
      for (let i=0; i<currentScheduledMarkers.length;i++)
      {
        if(currentScheduledMarkers.length>0)
        {
          currentScheduledMarkers[i].remove();
        }
      }

      //display historical flights
    }
  }
}
