
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxwYXlrYiIsImEiOiJjbDFtNjRyNWMwY2ZiM2RwZzhhOGxxOW0zIn0.kD6lRKaIZdGvYggxg3VdYw';


var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-0.19007921209376377, 50.95072143824743],
    zoom: 9,
});



map.on('load', function () {

  
    fetch('https://api.openbrewerydb.org/breweries?by_country=england') 
        .then(function (response) {
            return response.json();
        })

    
        .then(function (response) {

        
            var getBreweryData = response;

           
            getBreweryData.forEach(breweryData => {
                console.log(breweryData);

              
                var breweriesCoordinates = [breweryData.longitude, breweryData.latitude];

              
                var geojson = {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',

                        },

			}]
                }

                geojson.features.forEach(function (marker) {

                 
                    var el = document.createElement('div');
                    el.className = 'marker';


                    var popup = new mapboxgl.Popup()
                        .setHTML("<h4>" + breweryData.name + "</h4>" + "Adress: " + breweryData.street + ", " + breweryData.city + "</br>" + "Telefoonnumber: " + breweryData.phone + "</br>" + "Website: " + breweryData.website_url)

                 
                    new mapboxgl.Marker(el)
                        .setLngLat(breweriesCoordinates)
                        .setPopup(popup)
                        .addTo(map);
                })

            })


        })
})
