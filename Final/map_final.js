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
    center: [43.89,-91.21],
    zoom: 12,
    layers: streets,
    });


//Scalebar//
L.control.scale({position: 'bottomright', maxWidth: '100', metric: 'True'}).addTo(mymap); 

//Globe button//
L.easyButton(('<img src="globe_icon.png", height=85%>'), function(btn, map){
    map.setView([43.89,-91.21], 12);
}).addTo(mymap);



// LAYER 1: Food Garden Locations//
var myIcon = new L.Icon({
     iconSize: [25, 25],
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



//Layer 2 Food pantries

var pantryicon = new L.Icon({
     iconSize: [25, 25],
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


//LAYER 3: Choropleth Map of houses w no vehicle//

function getColor(value) {
    return value > 29 ? '#006d2c':
           value > 17  ? '#31a354':
           value > 10  ? '#74c476':
           value > 3  ? '#bae4b3':
                         '#edf8e9';
}

function style(feature){
    return {
        fillColor: getColor(feature.properties.percent),   // percent is the field name for the population density data
        weight: 1,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.9
    };
    }

  function highlightFeature(e) {
    var feature = e.target;

    feature.setStyle({
        weight: 1.2,
        color: '#666',
        fillOpacity: 0.8
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
// Round the percent value to two decimal places
    var roundedPercent1 = layer.feature.properties.percent.toFixed(2);
    return layer.feature.properties.NAME + '<p style="color:green">' + roundedPercent1 + ' % </p>';
}).addTo(mymap);



// Combine Food Gardens and Food Pantries layers
var combinedLayer = L.layerGroup([newfood, pantry]);

// Search box for Food Gardens and Food Pantries
var searchControlCombined = new L.Control.Search({
    position: 'topright',
    layer: combinedLayer,
    propertyName: 'USER_Name',
    marker: false,
    markeranimate: true,
    delayType: 30,
    collapsed: false,
    textPlaceholder: 'Search Food Locations: e.g. Aptiv',   
    moveToLocation: function(latlng, title, map) {
        mymap.setView(latlng, 15);
    }
});

mymap.addControl(searchControlCombined); 

//LAYER 4: Choropleth Map of below poverty//

function getColor2(value) {
    return value > 70 ? '#54278f':
           value > 44  ? '#756bb1':
           value > 19  ? '#9e9ac8':
           value > 8  ? '#cbc9e2':
                         '#f2f0f7';
}

function style2(feature){
    return {
        fillColor: getColor2(feature.properties.percent),   // percent is the field name for the population density data
        weight: 1,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.9
    };
    }

  function highlightFeature2(e) {
    var feature = e.target;

    feature.setStyle({
        weight: 1.2,
        color: '#666',
        fillOpacity: 0.8
    });


    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        feature.bringToFront();
    }
}

    function onEachFeature2(feature, layer) {
        layer.on({
            mouseover: highlightFeature2, 
            mouseout: resetHighlight2,    
        });
    }


    var poverty;  

    function resetHighlight2(e) {
        geojson.resetStyle(e.target);
    }

    var poverty = L.geoJson(poverty, {
        style: style2,
        onEachFeature: onEachFeature2
    }).bindPopup(function (layer){
   // Round the percent value to two decimal places
    var roundedPercent = layer.feature.properties.percent.toFixed(2);
    return layer.feature.properties.NAME + '<p style="color:purple">' + roundedPercent + ' % </p>';
}).addTo(mymap);



//Legend//

var baseLayers = {
    'Streets': streets,
    'Grayscale': grayscale,
    'Hillshade': topo,
	}; 

var overlayMaps = {
    "<img src='garden.png' height=16>Food Gardens": newfood,
    "<img src='pantry.png' height=16>Food Pantries": pantry,
    " % of Households with No Vehicles": vehicle,
    " % of Population Below Poverty Level": poverty,
};

var legendall = L.control.layers(baseLayers, overlayMaps, {collapsed: false}).addTo(mymap);

//Legend for Layer 3 and 4//

var legend = L.control({ position: 'topright' });

legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'legend'),
        grades1 = [0, 3, 10, 17, 29],
        grades2 = [0, 8, 19, 44, 70];

    div.innerHTML = '<b>Legend</b><br>' +
                    '<b>% of Households With No Vehicle</b><br>';
    
    for (var i = 0; i < grades1.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades1[i] + 1) + '"></i>' +
            grades1[i] + (grades1[i + 1] ? '&ndash;' + grades1[i + 1] + '<br>' : '+');
    }

    div.innerHTML += '<br><b>% of Population Below Poverty</b><br>';

    for (var j = 0; j < grades2.length; j++) {
        div.innerHTML +=
            '<i style="background:' + getColor2(grades2[j] + 1) + '"></i>' +
            grades2[j] + (grades2[j + 1] ? '&ndash;' + grades2[j + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(mymap);


//Inset Map//
var miniMap = new L.Control.MiniMap(L.tileLayer('https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=tZnptaeI9RvKHsX18rbW'), {
            toggleDisplay: true,
            position: 'bottomright'
        }).addTo(mymap);


//Make only one layer show//

newfood.addTo(mymap); 
mymap.removeLayer(pantry);
mymap.removeLayer(vehicle)
mymap.removeLayer(poverty)


