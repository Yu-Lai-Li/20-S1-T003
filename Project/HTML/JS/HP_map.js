/*
 *
 * Utilising Mapbox API
 *
 * Copyright (c) 2019  Monash University
 *
 * Written by Arvind Kaur
 *
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
*/

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ2aW5ka2F1ciIsImEiOiJjamt0c20wcXIwOTE3M29tbXYyc2M2aXhsIn0.mOrPB0bbVVm9NitiWvz96w';
let map = new mapboxgl.Map({
  container: 'map',
  center: [144.9648731,-37.8182711],
  zoom: 16,
  style: 'mapbox://styles/mapbox/streets-v9'
});


let locations = [
{
    coordinates: [145.133934, -37.910572],
    description: 'Faculty of Information Technology'
},
{
    coordinates: [145.1338553, -37.9092552],
    description: 'Faculty of Engineering'
},
{
    coordinates: [145.132676, -37.913843],
    description: 'Learning and Teaching Building'
},
{
    coordinates: [145.137224, -37.914594],
    description: 'Multi-level Car Parking'
}
];

for (let i = 0; i < locations.length; i++)
{
  let location = locations[i];

  let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
  marker.setLngLat(location.coordinates);

  let popup = new mapboxgl.Popup({ offset: 45});
  popup.setText(location.description);

  marker.setPopup(popup)

  // Display the marker.
  marker.addTo(map);

  // Display the popup.
  popup.addTo(map);
}

function panToClayton()
{
  let monashClayton = [145.1343136, -37.9110467];
  map.panTo(monashClayton);
}

function showPath()
{
    //removeLayerWithId('polygon');

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

      for(let i = 0; i < locations.length; i++)
      {
        object.data.geometry.coordinates.push(locations[i].coordinates);
      }

      map.addLayer({
                    id: "routes",
                    type: "line",
                    source: object,
                    layout: { "line-join": "round", "line-cap": "round" },
                    paint: { "line-color": "#888", "line-width": 6 }
            });
        }

function showPolygon()
{
    //removeLayerWithId('routes');

    let object = {
                type: 'geojson',
                data: {
                      type: 'Feature',
                      geometry: {
                                type: 'Polygon',
                                coordinates: [[]]
                                            }
                                          }
                                        };

    for(let i = 0; i < locations.length; i++)
    {
      object.data.geometry.coordinates[0][i] = locations[i].coordinates;
    }

    // adding the first location again to the last
    object.data.geometry.coordinates[0][locations.length] = locations[0].coordinates;

    map.addLayer({
                id: 'polygon',
                type: 'fill',
                source: object,
                layout: {},
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.8
                }
            });
}

// This function checks whether there is a map layer with id matching
// idToRemove.  If there is, it is removed.
function removeLayerWithId(idToRemove)
{
    let hasPoly = map.getLayer(idToRemove)
    if (hasPoly !== undefined)
    {
        map.removeLayer(idToRemove)
        map.removeSource(idToRemove)
    }
}
