// change these!
const owmHomeTown = "Hometown,State,Country";
const owmAppId = "OpenWeatherMap App ID";

// don't change this!
const outputTarget = "#commandOutput";

export default {
    w: {
        hint: "weather",
        title: "h city",
        call: function weather(plus) {
            var url = "https://api.openweathermap.org/data/2.5/weather?q=";
            if (plus == "h") {
                url += owmHomeTown;
            } else {
                url += plus;
            }

            fetch(url + "&units=imperial&appid=" + owmAppId)
                .then((response) => response.json())
                .then((js) => {
                    var desc = js.weather["0"].description;
                    var temp = js.main.temp;
                    $(outputTarget).text(desc + ", " + temp + "F");
                });
        },
    },
};
