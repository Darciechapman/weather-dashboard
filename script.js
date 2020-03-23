var date = new Date();
var dayDate = date.getDate();
var monthDate = date.getMonth() + 1;
var yearDate = date.getFullYear();
var locationEl = $("#search-input").val();

$("#search").on("click", function(event) {

    event.preventDefault();

    var locationEl = $("#search-input").val().toLowerCase();

    if (locationEl === "") {
        $("#search-input").removeAttr('placeholder');
        $("#search-input").attr("placeholder", "Error")
    } else {
        
        var currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + locationEl + "&units=metric&appid=d6db38001e351111dd620023b7c30d07";
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + locationEl + "&units=metric&appid=d6db38001e351111dd620023b7c30d07"

        createLocationBtn();
    }

    function createLocationBtn() {

            var btnId = $("<button>").text(locationEl);
            btnId.addClass("btn-list")

            $("#button-list").append(btnId);
        
    }

    $.ajax({
    url: currentQueryURL,
    method: "GET"
    }).then(function(response) {

        $("#current-weather").empty();

        function addCurrentWeather() {

            event.preventDefault();

            var iconNumber = response.weather[0].icon

            var currentWeatherContainer = $("<div>");  
            var titleId = $("<h3>").text(response.name + " " + dayDate + "/" + monthDate + "/" + yearDate);
            var iconId = $("<img>").attr("src","http://openweathermap.org/img/wn/" + iconNumber + "@2x.png");
            iconId.width("100px");
            var tempId = $("<h5>").text("Temperature: " + response.main.temp + " °C");
            var windId = $("<h5>").text("Wind speed: " + response.wind.speed + " MPH");
            var humidityId = $("<h5>").text("Humidity: " + response.main.humidity + " %");
        
            titleId.text(response.name + " " + dayDate + "/" + monthDate + "/" + yearDate);
  
            currentWeatherContainer.append(titleId);
            currentWeatherContainer.append(iconId);
            currentWeatherContainer.append(tempId);
            currentWeatherContainer.append(windId);
            currentWeatherContainer.append(humidityId);
  
            $("#current-weather").append(currentWeatherContainer);
  
        }
    
    addCurrentWeather();

    })

    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    }).then(function(response) {

        event.preventDefault();
      
        var list5thDay = [7, 15, 23, 31, 39]

        $("#forecast-block").empty();

        list5thDay.forEach(function(e) {

            var iconNumber = response.list[e].weather[0].icon

            var forecastContainer = $("<div>").addClass("forecast-block");  
            var dateId = $("<h5>").text(response.list[e].dt_txt);
            var iconId = $("<img>").attr("src","http://openweathermap.org/img/wn/" + iconNumber + "@2x.png");
            iconId.width("35px")

            var tempId = $("<p>").text("Temp: " + response.list[e].main.temp + " °C");
            var humidityId = $("<p>").text("Humidity: " + response.list[e].main.humidity + " %");
  
            dateId.text(response.list[e].dt_txt);
  
            forecastContainer.append(dateId);
            forecastContainer.append(iconId);
            forecastContainer.append(tempId);
            forecastContainer.append(humidityId);
      
        
            $("#forecast-block").append(forecastContainer);
  
        }) 
    
    })

})
