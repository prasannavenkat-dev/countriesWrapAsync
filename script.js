async function restCountries() {
  let response = await fetch("https://restcountries.eu/rest/v2/all");
  let responseNew = await response.json();

  console.log(responseNew);

  var container = document.createElement("div");
  container.setAttribute("class", "row justify-content-around");
  document.body.append(container);

  var card = [];
  var country = [];
  var flag = [];
  var details = [];
  var capital = [];
  var region = [];
  var code = [];
  var latlng = [];
  var weather = [];
  var weatherBtn = [];

  for (i = 0; i < 250; i++) {
    card[i] = document.createElement("div");
    card[i].setAttribute("class", "card col-lg-3   border-secondary ");
    container.append(card[i]);

    //COUNTRY NAME

    country[i] = document.createElement("div");
    country[i].setAttribute("class", "card-header");
    country[i].innerHTML = responseNew[i].name;
    card[i].append(country[i]);

    //FLAG

    flag[i] = document.createElement("img");
    flag[i].setAttribute("class", "card-img-top");
    flag[i].setAttribute("src", responseNew[i].flag);

    card[i].append(flag[i]);

    //DETAILS

    details[i] = document.createElement("ul");
    details[i].setAttribute("class", "list-group list-group-flush");
    card[i].append(details[i]);

    //CAPITAL

    capital[i] = document.createElement("li");
    capital[i].setAttribute("class", "list-group-item");
    capital[i].innerHTML = "Capital : " + responseNew[i].capital;
    details[i].append(capital[i]);

    //REGION

    region[i] = document.createElement("li");
    region[i].setAttribute("class", "list-group-item");
    region[i].innerHTML = "Region : " + responseNew[i].region;
    details[i].append(region[i]);

    //CODE

    code[i] = document.createElement("li");
    code[i].setAttribute("class", "list-group-item");
    code[i].innerHTML = "Code : " + responseNew[i].alpha3Code;
    details[i].append(code[i]);

    //LATLNG

    latlng[i] = document.createElement("li");
    latlng[i].setAttribute("class", "list-group-item");
    latlng[i].innerHTML = "Lat,Lng : " + responseNew[i].latlng;
    details[i].append(latlng[i]);

    //WEATHER

    weather[i] = document.createElement("li");
    weather[i].setAttribute("class", "list-group-item  ");
    weatherBtn[i] = document.createElement("button");
    weatherBtn[i].setAttribute("class", "btn weather");
    weatherID = "weather" + i;
    weatherBtn[i].setAttribute("id", weatherID);
    weatherBtn[i].innerHTML = "Click For Weather";
    weather[i].append(weatherBtn[i]);
    details[i].append(weather[i]);

    document.getElementById(weatherID).addEventListener("click", function (e) {
      var j = e.target.id.slice(7);
      j = +j;
      weather(j);

      async function weather(j) {
        lat = responseNew[j].latlng[0];
        lng = responseNew[j].latlng[1];

        weatherAPI ="https://api.openweathermap.org/data/2.5/weather?" +"lat=" +lat +"&lon=" +lng +"&appid=08477fc38c4f73768cb61ee086cfd835&units=metric";
        result1 = await fetch(weatherAPI);
        result2 = await result1.json();
        console.log(result2);

        alert(
          "Country : " +
            result2.name +
            ",\n" +
            "Weather : " +
            result2.weather[0].description +
            ",\n" +
            "Temprature : " +
            result2.main.feels_like +
            " Celsius" +
            ",\n" +
            "Humidity : " +
            result2.main.humidity +
            "%" +
            ",\n" +
            "Pressure : " +
            result2.main.pressure +
            "pa" +
            ",\n" +
            "Wind Speed : " +
            result2.wind.speed +
            "m/s"
        );
      }
    });
  }
}

restCountries();
