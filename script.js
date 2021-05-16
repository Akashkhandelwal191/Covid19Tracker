

//PreLoader 
var Preloader = document.getElementById("loader");
function myFunction() {

    Preloader.style.display = "none";

}



//Real Time Clock
function realtimeClock() {

    var rtClock = new Date();
    var hours = rtClock.getHours();
    var minutes = rtClock.getMinutes();
    var seconds = rtClock.getSeconds();
    var amPm = (hours < 12) ? "AM" : "PM";

    hours = (hours > 12) ? hours - 12 : hours;

    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);

    //  Display the Clock
    document.getElementById('date').innerHTML = hours + " : " + minutes + " : " + seconds + " " + amPm;

    var arr1 = ["january", "Febuaray", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var arr2 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];

    var date = rtClock.getDate();
    var dayname = rtClock.getDay();
    var month = rtClock.getMonth();
    var Fullyear = rtClock.getFullYear();

    document.getElementById('time').innerHTML = arr2[dayname] + "," + date + " " + arr1[month] + " " + Fullyear;

    var t = setTimeout(realtimeClock, 500);

}



//Fetching Real Time Covid Data Country Wise From Url
function Covid19Data() {

    //Fetch Api
    fetch("https://api.covid19api.com/summary").then((data) => {
        return data.json();
    }).then((result) => {


        let Countries = result.Countries;
        let tbody = document.getElementById("tablevalue").querySelector("tbody");
        Countries.forEach((element, index) => {

            console.log(element.Country);
            tbody.innerHTML += `<tr><td>${element.Country}</td><td>${element.TotalConfirmed}</td> <td>${element.TotalRecovered}</td><td>${element.TotalDeaths}</td> <td>${element.NewRecovered}</td> <td>${element.NewDeaths}</td></tr>`


        });



    }).catch((error) => {
        console.log(error);
    });

}

Covid19Data();






//Scroll Button BACK TO TOP JS
window.addEventListener('scroll', function () {

    if (document.documentElement.scrollTop > 181) {

        document.getElementById('backtotop').style.display = "block";
    }

    else {
        document.getElementById('backtotop').style.display = "none";
    }

})

const topscroll = document.querySelector("#backtotop");
topscroll.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"

    });
});








