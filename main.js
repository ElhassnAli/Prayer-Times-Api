let countryName = document.querySelector(".head .country");
let cityName = document.querySelector(".head .city");
let inputButton = document.querySelector(".head button");

let body = document.querySelector(".body");
inputButton.addEventListener("click", () => {
  if (countryName.value.trim() && cityName.value.trim() !== "") {
    getPrayerTimes(countryName.value, cityName.value);
  }
});

function getPrayerTimes(country, city) {
  fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=5`
  )
    .then((response) => {
      return response.json();
    })
    .then((alldata) => {
      let prayerTimes = alldata.data.timings;
      let date = alldata.data.date.readable;
      let day = alldata.data.date.hijri.weekday.ar;

      prayerTimesTable(prayerTimes, date, day);
    })
    .catch((error) => {
      body.innerHTML = error;
    });
}
function prayerTimesTable(alldata, date, day) {
  body.innerHTML = "";
  let arr = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
  let mainDiv = document.createElement("div");
  mainDiv.className = "maindiv";
  let title = document.createElement("h5");
  title.className = "title";
  let span3 = document.createElement("span");
  let span4 = document.createElement("span");
  span3.appendChild(document.createTextNode(date));
  span4.appendChild(document.createTextNode(day));
  title.appendChild(span3);
  title.appendChild(span4);
  let info = document.createElement("h2");
  info.className = "info";

  info.appendChild(
    document.createTextNode(`${countryName.value}  ${cityName.value}`)
  );
  mainDiv.appendChild(info);
  mainDiv.appendChild(title);
  for (let i = 0; i < arr.length; i++) {
    let prayertime = document.createElement("div");
    prayertime.className = "prayertime";
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    span1.appendChild(document.createTextNode(arr[i]));
    span2.appendChild(document.createTextNode(alldata[arr[i]]));

    prayertime.appendChild(span1);
    prayertime.appendChild(span2);
    mainDiv.appendChild(prayertime);
  }
  body.appendChild(mainDiv);
}
