
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

realtimeClock();






// Fetching Real time Data World Wise
const WorldCovidData = () =>{

     fetch("https://covid-simple-api.vercel.app/api/world").then((data)=>{
 
              return data.json();
      
     }).then((result) =>{

         let TotalCasestemp = document.getElementById("TotalCases");
         let ActiveCasestemp = document.getElementById("Active");
         let Dischargedtemp = document.getElementById("Discharged");
         let Deathstemp = document.getElementById("Deaths");
               


         TotalCasestemp.innerHTML = result.totalCases;
         ActiveCasestemp.innerHTML = result.activeCases;
         Dischargedtemp.innerHTML = result.recovered;
         Deathstemp.innerHTML = result.deaths;


         let t = result.totalCases;
         let a = result.activeCases;
         let d = result.recovered;
         let de = result.deaths;

         var arrop = [t,a,d,de];

         
         let arrdone = arrop.map(function(element){
              
               
                   element = element.replace(/\,/g,'');
                   element = Number(element);
                   return element;            

         });

         UpdateGraphData(...arrdone);

        
          
        
              
     }).catch((error) => {
         
          console.log(error);
     });


}

WorldCovidData();



//Fetching Real Time Covid Data Country Wise From Url
function Covid19Data() {

    //Fetch Api
    fetch("https://api.covid19api.com/summary").then((data) => {
        return data.json();
    }).then((result) => {


        let Countries = result.Countries;
        let tbody = document.getElementById("tablevalue").querySelector("tbody");
        Countries.forEach((element) => {

           
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






function UpdateGraphData(TotalCases,Active,Recoverd,Deaths)
{

 
   var ctx = document.getElementById('myChart2').getContext('2d');

    var myChart2 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['TotalCases', 'Active', 'Recoverd', "Deaths"],
            datasets: [{
                label: 'Total Global Cases',
                data: [TotalCases,Active,Recoverd,Deaths],
                backgroundColor: [
                    '#d63031',
                    '#0984e3',
                    '#00b894',
                    '#ff3f34',
                ],
                borderColor: [
                    '#fff',
                    '#fff',
                    '#fff',
                    '#fff',
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: false,
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                },
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels:{
                        color:"black",
                        font:{
                            size:15
                        }
                    }
                },
                
            },
    
             animation: {
                duration: 5000,
                easing: "linear",
            },
        },
    });

}