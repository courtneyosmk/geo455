var mymap = L.map("map").setView([38.753865949628285, -109.58569389309423], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY291cnRuZXlvc21rIiwiYSI6ImNsczBuOGtoYzAwMGcya2tkbnBiNGdjYTAifQ.xOhWbetQQuERk4ltlXYgDw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/navigation-day-v1',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);
    var myIcon1 = L.icon({
    iconUrl: 'images/icon_640.png',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15,10],
});var myIcon2 = L.icon({
    iconUrl: 'images/icon_640.png',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15,10],
});var myIcon3 = L.icon({
    iconUrl: 'images/icon_640.png',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15,10],
});var myIcon4 = L.icon({
    iconUrl: 'images/icon_640.png',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15,10],
});var myIcon5 = L.icon({
    iconUrl: 'images/icon_640.png',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15,10],
});var myIcon6 = L.icon({
    iconUrl: 'images/icon_640.png',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15,10],
});var myIcon7 = L.icon({
    iconUrl: 'images/icon_640.png',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15,10],
});var myIcon8 = L.icon({
    iconUrl: 'images/icon_640.png',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15,10],
});var myIcon9 = L.icon({
    iconUrl: 'images/icon_640.png',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15,10],
});var myIcon10 = L.icon({
    iconUrl: 'images/icon_640.png',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15,10],
});var myIcon11 = L.icon({
    iconUrl: 'images/icon_640.png',
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15,10],
});
     var DG = L.marker([38.80660893, -109.6155343], {icon: myIcon1}).bindPopup("<b>Devils Garden").addTo(mymap);
     var DOA = L.marker([38.80052696,-109.6215878], {icon: myIcon2}).bindPopup("<b>Double O Arch").addTo(mymap);
     var LA = L.marker([38.79162996,-109.6078549], {icon: myIcon3}).bindPopup("<b>Landscape Arch").addTo(mymap);
     var CA = L.marker([38.58705344,-109.6193012], {icon: myIcon4}).bindPopup("<b>Corona Arch").addTo(mymap);
     var FT = L.marker([38.72543968,-109.3091154], {icon: myIcon5}).bindPopup("<b>Fishers Tower").addTo(mymap);
     var FF = L.marker([38.74556681,-109.5616578], {icon: myIcon6}).bindPopup("<b>Fiery Furnace").addTo(mymap);
     var DA = L.marker([38.69437879,-109.5420134], {icon: myIcon7}).bindPopup("<b>Double Arch").addTo(mymap);
     var SDA = L.marker([38.7652937,-109.581112], {icon: myIcon8}).bindPopup("<b>Sand Dune Arch").addTo(mymap);
     var SA = L.marker([38.7752592,-109.5900054], {icon: myIcon9}).bindPopup("<b>Skyline Arch").addTo(mymap);
     var NA = L.marker([38.79176455,-109.6091679], {icon: myIcon10}).bindPopup("<b>Navajo Arch").addTo(mymap);
     var PA = L.marker([38.79215552,-109.6085549], {icon: myIcon11}).bindPopup("<b>Partition Arch").addTo(mymap);
    


