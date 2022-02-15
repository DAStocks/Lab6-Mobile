var map = L.map('map').setView([47.037872, -122.900696], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGFzMjY0IiwiYSI6ImNremYwMWQ5cjNkMncyb254dWo2cmRoeHMifQ.pVEaOoZr0WG4A61Bs9f_eg'
}).addTo(map);

var drawnItems = L.featureGroup().addTo(map);

new L.Control.Draw({
    draw : {
        polygon : true,
        polyline : true,
        rectangle : false,     // Rectangles disabled
        circle : false,        // Circles disabled
        circlemarker : false,  // Circle markers disabled
        marker: true
    },
    edit : {
        featureGroup: drawnItems
    }
}).addTo(map);

function createFormPopup() {
    var popupContent =
    '<form>' +
      '<h2>Location Name:</h2><input type="text" id="input_desc"><br>' +
      '<h3>User Name:</h3><input type="text" id="input_name"><br>' +
      '<p><label for="Enjoyment">Eli\'s Enjoyment (1-bad, 3-good)</label></p>' +
      '<input type="range" id="Enjoyment" name="Enjoyment" min="1" max="3"><br>' +
      // '<p><label for="Date">Date of Survey </label></p>'
      '<div>' +
      '<input type="Date" value="date" id="Date"><br>' +
      '<p><label for="Date">Date of Survey </label></p>' +
      '</div>' +
      '<p>Issues with location:</p>' +
      '<div>' +
      '<input type="checkbox" id="traffic" name="traffic" checked>' +
      '<label for="traffic">Traffic</label>' +
      '</div>' +
      '<div>' +
      '<input type="checkbox" id="Distance" name="Distance">' +
      '<label for ="Distance">Distance</label>' +
      '</div>' +
      '<div>' +
      '<input type="checkbox" id="Location" name="Location">' +
      '<label for="Location">Location</label>' +
      '</div>' +
      '<p>Amenities:</p>' +
      '<div>' +
      '<input type="checkbox" id="Fountain" name="Fountain" checked>' +
      '<label for="Fountain">Fountains</label>' +
      '</div>' +
      '<div>' +
      '<input type="checkbox" id="Restroom" name="Restroom" checked>' +
      '<label for="Restroom">Restroom</label>' +
      '</div>' +
      '<div>' +
      '<input type="checkbox" id="Slide" name="Slide" checked>' +
      '<label for="Slide">Slides</label>' +
      '</div>' +
      '<div>' +
      '<input type="checkbox" id="Swings" name="Swings">' +
      '<label for ="Swings">Swings</label>' +
      '</div>' +
      '<div>' +
      '<input type="checkbox" id="Jungle" name="Jungle">' +
      '<label for="Jungle">Jungle Gym</label>' +
      '</div>' +
      '<input type="button" value="Submit" id="submit">' +

    '</form>'
    drawnItems.bindPopup(popupContent).openPopup();
}

map.addEventListener("draw:created", function(e) {
    e.layer.addTo(drawnItems);
    createFormPopup();
});

map.addEventListener("draw:created", function(e) {
    e.layer.addTo(drawnItems);
    drawnItems.eachLayer(function(layer) {
        var geojson = JSON.stringify(layer.toGeoJSON().geometry);
        console.log(geojson);
    });
});

       function setData(e) {
           if(e.target && e.target.id == "submit") {
               // Get user name and description
               var locationname = document.getElementById("input_name").value;
               var enteredDescription = document.getElementById("input_desc").value;
               // Print user name and description
               console.log(enteredUsername);
               console.log(enteredDescription);
               // Get and print GeoJSON for each drawn layer
               drawnItems.eachLayer(function(layer) {
                   var drawing = JSON.stringify(layer.toGeoJSON().geometry);
                   console.log(drawing);
               });
               // Clear drawn items layer
               drawnItems.closePopup();
               drawnItems.clearLayers();
           }
       }

       document.addEventListener("click", setData);
//Makes pop-up close if shapes are deleted
       map.addEventListener("draw:editstart", function(e) {
    drawnItems.closePopup();
});
map.addEventListener("draw:deletestart", function(e) {
    drawnItems.closePopup();
});
map.addEventListener("draw:editstop", function(e) {
    drawnItems.openPopup();
});
map.addEventListener("draw:deletestop", function(e) {
    if(drawnItems.getLayers().length > 0) {
        drawnItems.openPopup();
    }
});

function setData(e) {
    if(e.target && e.target.id == "submit") {
        // Get user name and description
         var enteredPark = document.getElementById("input_desc").value;
         var enteredUser = document.getElementById("input_name").value;
         var enteredEnjoyment = document.getElementByID('Enjoyment').value;
         var enteredDate = document.getElementByID('Date').value;
         var enteredtraffic = document.getElementById("traffic").value;
         var enteredDistance = document.getElementById("Distance").value;
         var enteredLocation = document.getElementByID('Location').value;
         var enteredFountain = document.getElementByID('Fountain').value;
         var enteredRestroom = document.getElementByID('Restroom').value;
         var enteredSlide = document.getElementById("Slide").value;
         var enteredSwings = document.getElementById("Swings").value;
         var enteredJungle = document.getElementByID('Jungle').value;
        // Print user name and description
          console.log(enteredPark);
          console.log(enteredUser);
          console.log(enteredEnjoyment);
          console.log(enteredDate);
          console.log(enteredtraffic);
          console.log(enteredDistance);
          console.log(enteredLocation);
          console.log(enteredFountain);
          console.log(enteredRestroom);
          console.log(enteredSlide);
          console.log(enteredSwings);
          console.log(enteredJungle);
        // Get and print GeoJSON for each drawn layer
        drawnItems.eachLayer(function(layer) {
            var drawing = JSON.stringify(layer.toGeoJSON().geometry);
            console.log(drawing);
        });
        // Clear drawn items layer
        drawnItems.closePopup();
        drawnItems.clearLayers();
    }
}

document.addEventListener("click", setData);

map.addEventListener("draw:editstart", function(e) {
    drawnItems.closePopup();
});
map.addEventListener("draw:deletestart", function(e) {
    drawnItems.closePopup();
});
map.addEventListener("draw:editstop", function(e) {
    drawnItems.openPopup();
});
map.addEventListener("draw:deletestop", function(e) {
    if(drawnItems.getLayers().length > 0) {
        drawnItems.openPopup();
    }
});

function setData(e) {
    if(e.target && e.target.id == "submit") {
        // Get user name and description
        	// CHANGE THE VAR NAMES TO SOMETHING THAT MAKES SENSE FOR YOUR FORM
        	// CHANGE THE ELEMENT IDs TO MATCH THE IDs YOU GAVE YOUR FORM INPUTS IN STEP 6.2
        	// INSERT ADDITIONAL VARS AND .getElementById STATEMENTS FOR EACH OF YOUR FORM INPUTS
        var enteredUsername = document.getElementById("input_name").value;
        var enteredDescription = document.getElementById("input_desc").value;
        // Print user name and description
        	// LOG TO THE CONSOLE ALL OF THE VARIABLES THAT HOLD THE INPUT VALUES FOR YOUR FORM
        console.log(enteredUsername);
        console.log(enteredDescription);
        // Get and print GeoJSON for each drawn layer
        drawnItems.eachLayer(function(layer) {
            var drawing = JSON.stringify(layer.toGeoJSON().geometry);
            console.log(drawing);
        });
        // Clear drawn items layer
        drawnItems.closePopup();
        drawnItems.clearLayers();
    }
}
