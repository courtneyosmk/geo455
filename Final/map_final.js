//Streetmaps//

var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2NoYXVkaHVyaSIsImEiOiJjazBtcG5odG8wMDltM2JtcjdnYTgyanBnIn0.qwqjMomdrBMG36GQKXBlMw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
});

var grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2VwaGFydHphY2hhcnkiLCJhIjoiY2t6eHA2bG1kMDNsczJvazFlYXp4bTJ5aCJ9.s98R-oDZAV66nFusWbt-Uw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
});

var topo = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2VwaGFydHphY2hhcnkiLCJhIjoiY2t6eHA2bG1kMDNsczJvazFlYXp4bTJ5aCJ9.s98R-oDZAV66nFusWbt-Uw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1
});

var mymap = L.map('map', {
    center: [43.91,-91.11],
    zoom: 10,
    layers: streets,
    });


//Scalebar//
L.control.scale({position: 'bottomright', maxWidth: '100', metric: 'True'}).addTo(mymap); 

//Globe button//
L.easyButton(('<img src="globe_icon.png", height=85%>'), function(btn, map){
    map.setView([43.91,-91.11], 10);
}).addTo(mymap);

//Inset Map//
var miniMap = new L.Control.MiniMap(L.tileLayer('https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=tZnptaeI9RvKHsX18rbW'), {
            toggleDisplay: true,
            position: 'bottomright'
        }).addTo(mymap);


// LAYER 1: Food Garden Locations//
var myIcon = new L.Icon({
     iconSize: [20, 20],
     iconAnchor: [10, 15],
     popupAnchor:  [1, -24],
     iconUrl: 'garden.png'
 });


var newfood = new L.geoJson(newfood, {
    onEachFeature: function(feature, featureLayer){
        featureLayer.bindPopup('<p>Garden Name: <b>'+feature.properties.USER_Name+ '</b></br>' +
                               'Email: '+feature.properties.Email+ '</br>'+
                               'Phone Number: '+feature.properties.Phone+'</br>'+
                               "<a href="+feature.properties.URL+">Website</a") + '</p>';}, 
    
    pointToLayer: function (feature, latlng) {
            var marker = L.marker(latlng,{icon: myIcon});
            return marker;
        }}).addTo(mymap);

//Searchbox//

var searchControl = new L.Control.Search({
    position:'topright',
    layer: newfood,
    propertyName: 'USER_Name',
    marker: false,
    markeranimate: true,
    delayType: 30,
    collapsed: false,
    textPlaceholder: 'Search by Garden Name: e.g. Aptiv',   
    moveToLocation: function(latlng, title, map) {
        mymap.setView(latlng, 15);}
});

mymap.addControl(searchControl); 

//Layer 2 Food pantries

var pantryicon = new L.Icon({
     iconSize: [20, 20],
     iconAnchor: [10, 15],
     popupAnchor:  [1, -24],
     iconUrl: 'pantry.png'
 });


var pantry = new L.geoJson(pantry, {
    onEachFeature: function(feature, featureLayer){
        featureLayer.bindPopup('<p>Pantry Name: <b>'+feature.properties.USER_Name+ '</b></br>' +
                               'Email: '+feature.properties.Email+ '</br>'+
                               'Phone Number: '+feature.properties.Phone+'</br>'+
                               "<a href="+feature.properties.URL+">Website</a") + '</p>';}, 
    
    pointToLayer: function (feature, latlng) {
            var marker = L.marker(latlng,{icon: pantryicon});
            return marker;
        }}).addTo(mymap);


/*//LAYER 3: Choropleth Map of houses w no vehicle//

function getColor(value) {
    return value > 139 ? '#54278f':
           value > 87  ? '#756bb1':
           value > 53  ? '#9e9ac8':
           value > 32  ? '#cbc9e2':
                         '#f2f0f7';
}

function style(feature){
    return {
        fillColor: getColor(feature.properties.percent),   // percent is the field name for the population density data
        weight: 2,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.9
    };
    }

  function highlightFeature(e) {
    var feature = e.target;


    // Check out https://leafletjs.com/reference-1.3.4.html#path for more options for changing style
    feature.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 0.7
    });


    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        feature.bringToFront();
    }
}

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature, 
            mouseout: resetHighlight,    
        });
    }


    var vehicle;  

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }

    var vehicle = L.geoJson(vehicle, {
        style: style,
        onEachFeature: onEachFeature
    }).bindPopup(function (layer){
    return layer.feature.properties.NAME 
           + '<p style="color:purple">' + layer.feature.properties.percent.toString() + ' percent </p>';       
}).addTo(mymap);*/



/*//LAYER 3: Cluster Map BUS STOPS not going to work//

var clustermarkers = L.markerClusterGroup();
busstops.features.forEach(function(feature) {
    clustermarkers.addLayer(L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]));
})

mymap.addLayer(clustermarkers);*/


//Pop-up for showing XY coordinates on map//

var popup = L.popup();
            
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(
        "You clicked the map at -<br>" + 
        "<b>long:</b> " + e.latlng.lng + "<br>" + 
        "<b>lat:</b> " + e.latlng.lat
    ).openOn(mymap);}

mymap.addEventListener("click", onMapClick);

//Legend//

var baseLayers = {
    'Streets': streets,
    'Grayscale': grayscale,
    'Hillshade': topo,
	}; 

var overlayMaps = {
    "<img src='garden.png' height=16>Food Gardens": newfood,
    "<img src='pantry.png' height=16>Food Pantries": pantry,
   /* " % of Houses with No Vehicles": vehicle,
    "<img src='bus.png' height=16> MTU Bus Stops": busstops,
    */
};

var legend = L.control.layers(overlayMaps, baseLayers,{collapsed: false}).addTo(mymap);


//Make only one layer show//

newfood.addTo(mymap); 
mymap.removeLayer(pantry);
/*mymap.removeLayer (vehicle)
mymap.removeLayer (busstops)
*/

