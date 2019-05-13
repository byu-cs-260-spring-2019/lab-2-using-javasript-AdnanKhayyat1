document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=7c4751e802b38682379dccb960b5f3f1";
  
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(JSON) {	
        let results = "";
        results += '<h2>Weather in ' + JSON.name + "</h2>";
        for (let i=0; i < JSON.weather.length; i++) {
      results += '<img src="http://openweathermap.org/img/w/' + JSON.weather[i].icon + '.png"/>';
        }
        results += '<h2>' + JSON.main.temp + " &deg;F</h2>"
        results += "<p>"
        for (let i=0; i < JSON.weather.length; i++) {
      results += JSON.weather[i].description
      if (i !== JSON.weather.length - 1)
        results += ", "
        }
        results += "</p>";
        document.getElementById("weatherResults").innerHTML = results;
        
    });
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ",US&units=imperial" + "&APPID=7c4751e802b38682379dccb960b5f3f1";
    fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(JSON) {
        let forecast = "";
        for (let i=0; i < JSON.list.length; i++) {
            forecast += "<h2>" + moment(JSON.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
            forecast += "<p>Temperature: " + JSON.list[i].main.temp + "</p>";
            forecast += '<img src="http://openweathermap.org/img/w/' + JSON.list[i].weather[0].icon + '.png"/>'
        }
        document.getElementById("forecastResults").innerHTML = forecast;
      });
  

    
  });

  