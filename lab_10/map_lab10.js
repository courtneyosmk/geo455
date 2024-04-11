var mymap = L.map("map").setView([48.673872110187137, -35.697510915389563], 4);


var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2NoYXVkaHVyaSIsImEiOiJjazBtcG5odG8wMDltM2JtcjdnYTgyanBnIn0.qwqjMomdrBMG36GQKXBlMw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

var point_layer = L.layerGroup().addTo(mymap);

var line_layer = L.layerGroup().addTo(mymap);

var mid_layer = L.layerGroup().addTo(mymap);

L.marker([43.8013600, -91.2395800], {draggable: true}).addEventListener("drag", drawline).addTo(point_layer);
L.marker([41.38879, 2.15899],{draggable: true}).addEventListener("drag", drawline).addTo(point_layer);

function drawline() {
    line_layer.clearLayers();
    mid_layer.clearLayers();
    points = point_layer.toGeoJSON();
    var line = turf.greatCircle(points.features[0], points.features[1]);
    var mid = turf.midpoint(points.features[0], points.features[1]);
    L.geoJSON(line).addTo(line_layer);
    L.geoJSON(mid).addTo(mid_layer);
}
drawline();