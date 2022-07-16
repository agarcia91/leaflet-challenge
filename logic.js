// Create the map object
map = L.map("map",{
    center: [15.9967,-26.5283],
   zoom: 3
});

 //create a tile layer for the background of the map
 var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Create API call to get earthquake data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function(data){
    function style(feature){
        return {
            opacity: 1,
            fillOpacity: 0.7,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight:0.5

        };
    }



    //Create function for magnitude color

    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#f52525"
        } else if (magnitude > 4){
            return "#f59725"
        } else if (magnitude > 3){
            return "#f5f225"
        } else if (magnitude > 2){
            return "#b7f525"
        } else if (magnitude > 1){
            return "#6ef525"
        } else {
            return "#36f525"
        }
    };
    //Create a function for the magnitude 
    function getRadius(magnitude) {
        switch (true){
            case (magnitude >= 5):
                return 25;
                break;
            case (magnitude >= 4):
                return 13;
                break;
            case (magnitude >= 3):
                return 11;
                break;
            case (magnitude >= 2):
                return 7;
                break;
            case (magnitude >= 1):
                return 5;
                break;
            default:
                return 1;
                break;
        }
        };
    
        //Create geoJson layer for map
    L.geoJson(data, {
        pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng);
        },
        style: style,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h1>Magnitude</h1>" + feature.properties.mag + "<hr><h2>Location:</h2> " + feature.properties.place);
        }
    }).addTo(map);
   
   
    //Create a legend for map
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var magnitudes = [0, 1, 2, 3, 4, 5];
        var labels = [];
        

        
        //loop through each magnitude and label legend with color
        
         for (var i = 0; i < magnitudes.length; i++) {
            labels.push('<ul style="background-color:' + getColor(magnitudes[i] + 1) + '"><span>' + magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '' : '+') + '</span></ul>');
        }

        // add each label list item to the div under the <ul> tag
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return div;
    };

    // Add legend to the map
    legend.addTo(map);

    




   

    
});


    


    