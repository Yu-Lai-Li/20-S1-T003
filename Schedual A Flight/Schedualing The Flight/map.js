mapboxgl.accessToken = "pk.eyJ1Ijoicm95eXVsIiwiYSI6ImNrYTUxb3FyZjA3OW0zZnA0dm9kc3g4M24ifQ.CddGHFtKeVdpE02MP4n4gg";
const DARKSKY_KEY = "0e195afd5dd4381cf43dc3f53ea53094";
let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [145.135844,-37.911103], // starting position [lng, lat]
        zoom: 11 // starting zoom
})
