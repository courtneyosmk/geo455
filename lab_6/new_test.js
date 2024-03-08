// MAP 1 Population
var map1 = L.map('map1', {
    center: [51.48882027639122, -0.1028811094342392],
    zoom: 11
});

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    maxZoom: 11,
    minZoom: 5
}).addTo(map1);

function getColor(value) {
    return value > 139 ? '#54278f' :
           value > 87 ? '#756bb1' :
           value > 53 ? '#9e9ac8' :
           value > 32 ? '#cbc9e2' :
           '#f2f0f7';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.pop_den),
        weight: 2,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.9
    };
}

function highlightFeature(e) {
    var feature = e.target;
    feature.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        feature.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

var geojson;

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}

geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
}).bindPopup(function (layer) {
    return layer.feature.properties.NAME + '<p style="color:purple">' + layer.feature.properties.pop_den.toString() + ' people/hectare </p>';
}).addTo(map1);

var legend = L.control({ position: 'bottomleft' });

legend.onAdd = function (map1) {
    var div = L.DomUtil.create('div', 'legend'),
        grades = [0, 32, 53, 87, 139];

    div.innerHTML = '<b>Population Density <br></b>';

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i>' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

legend.addTo(map1);


//Map 2 Language


var map2 = L.map('map2', {
    center: [51.48882027639122, -0.1028811094342392],
    zoom: 11
});

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    maxZoom: 11,
    minZoom: 5
}).addTo(map2);



function getColor2(value) {
     return value > 5.36 ? '#00441B':
           value > 3.38  ? '#238B45':
           value > 1.98 ?  '#74C476':
           value > 0.91  ? '#C7E9C0':
                           '#F7FCF5';
}

function style2(feature) {
    return {
        fillColor: getColor2(feature.properties.Density1),
        weight: 2,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.9
    };
}

function highlightFeature2(e) {
    var feature = e.target;
    feature.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        feature.bringToFront();
    }
}

function resetHighlight2(e) {
    geojson2.resetStyle(e.target);
}

var geojson2;

function onEachFeature2(feature, layer) {
    layer.on({
        mouseover: highlightFeature2,
        mouseout: resetHighlight2,
    });
}

geojson2 = L.geoJson(data, {
    style: style2,
    onEachFeature: onEachFeature2
}).bindPopup(function (layer) {
    return layer.feature.properties.NAME + '<p style="color:green">' + layer.feature.properties.Density1.toString() + ' people/hectare </p>';
}).addTo(map2);

var legend2 = L.control({ position: 'bottomleft' });

legend2.onAdd = function (map2) {
    var div = L.DomUtil.create('div', 'legend'),
        grades = [0, 0.91, 1.98, 3.38, 5.36];

    div.innerHTML = '<b>Partial English Density <br></b>';

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor2(grades[i] + 1) + '"></i>' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend2.addTo(map2);

var overlays = {
    'Population Density': map1,
    'Partially English Speaking Households Density': map2,
};

var layerControl = L.control.layers(overlays, { collapsed: false }).addTo(map1);
var layerControl2 = L.control.layers(overlays, { collapsed: false }).addTo(map2);
