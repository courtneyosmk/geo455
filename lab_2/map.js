var mymap = L.map("map").setView([38.573853878182, -109.54987432679695], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY291cnRuZXlvc21rIiwiYSI6ImNsczBuOGtoYzAwMGcya2tkbnBiNGdjYTAifQ.xOhWbetQQuERk4ltlXYgDw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/navigation-day-v1',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

L.marker([38.573853878182, -109.54987432679695])
    .addTo(mymap)
    .bindPopup("<b>Hello!</b><br>I am Moab, Utah.")
    .openPopup();