
var SearchOperation = "Country";
var SearchIcon = document.getElementById("SearchIcon");
var SearchInput = document.getElementById("SearchInput");
var total = document.getElementById("TotalCases");
var active = document.getElementById("Active");
var Discharged = document.getElementById("Discharged");
var Deaths = document.getElementById("Deaths");
var title = document.getElementById("title");
var errorMessage = document.getElementById("errorMessage");
var SearchProgress = document.getElementById("SearchProgress");
var Covid19Das = document.getElementById("Covid19Das");
var ctx = document.getElementById('myChart').getContext('2d');


SearchInput.addEventListener("keyup", function () {

    if (!errorMessage.classList.contains("errorMessage")) {
        errorMessage.classList.add("errorMessage");
    }
});

function getSelectedValue() {
    let select = document.getElementById("Select").value;
    console.log(select);

    if (select == "Country") {
        SearchInput.value = "";
        SearchInput.placeholder = "Search by Country";
        SearchOperation = "Country";
    }

    else {
        SearchInput.value = "";
        SearchInput.placeholder = "Search by State";
        SearchOperation = "State";
    }

}


SearchIcon.addEventListener("click", () => {

    if (SearchOperation == "Country") {
        console.log("Search Opearation on Country");
        let CountryValue = SearchInput.value;
        if (CountryValue) {
            SearchProgress.classList.remove("SearchProgress");
            //Fetch Api
            fetch("https://coronavirus-19-api.herokuapp.com/countries").then((data) => {
                return data.json();
            }).then((result) => {

                
                let CountryCheck = false;
                result.forEach((element) => {



                    if (CountryValue.toLowerCase() == element.country.toLowerCase()) {
                        CountryCheck = true;
                        Covid19Das.classList.add("animate__fadeIn");
                        title.innerHTML = element.country;
                        total.innerHTML = element.cases;
                        active.innerHTML = element.active;
                        Discharged.innerHTML = element.recovered;
                        Deaths.innerHTML = element.deaths;

                        window.myChart.destroy();
                        UpdateGraphData(element.cases,element.active,element.recovered,element.deaths);

                    }


                });
                SearchProgress.classList.add("SearchProgress");

                if (CountryCheck == false) {

                    errorMessage.classList.remove("errorMessage");
                    errorMessage.innerHTML = "Invalid Country";
                }

                setTimeout(() => {
                    if (Covid19Das.classList.contains("animate__fadeIn")) {
                        Covid19Das.classList.remove("animate__fadeIn");
                    }

                }, 2000);


            }).catch((error) => {
                console.log(error);
            });
        }

    }
    else {
        console.log("Search Opearation on State");
        let StateValue = SearchInput.value;
        if (StateValue) {
            SearchProgress.classList.remove("SearchProgress");
            fetch("https://covid-india-cases.herokuapp.com/states/").then((data) => {

                return data.json();

            }).then((result) => {


                let StateCheck = false;
                result.forEach(element => {

                    if (StateValue.toLowerCase() == element.state.toLowerCase()) {
                        StateCheck = true;
                        Covid19Das.classList.add("animate__fadeIn");
                        title.innerHTML = element.state;
                        total.innerHTML = element.noOfCases;
                        active.innerHTML = element.active;
                        Discharged.innerHTML = element.cured;
                        Deaths.innerHTML = element.deaths;

                        window.myChart.destroy();
                        UpdateGraphData(element.noOfCases,element.active,element.cured,element.deaths);
                    }

                });
                SearchProgress.classList.add("SearchProgress");
                if (StateCheck == false) {
                    errorMessage.classList.remove("errorMessage");
                    errorMessage.innerHTML = "Invalid State";
                }


                setTimeout(() => {
                    if (Covid19Das.classList.contains("animate__fadeIn")) {
                        Covid19Das.classList.remove("animate__fadeIn");
                    }

                }, 2000);



            }).catch((error) => {

                console.log(error);
            });



        }
    }

})




// Fetching India Total Cases
const IndiaCovid19TotalData = () => {

    fetch("https://api.covid19india.org/data.json").then((data) => {

        return data.json();

    }).then((result) => {

        let element = result.statewise[0];

        total.innerHTML = element.confirmed;
        active.innerHTML = element.active;
        Discharged.innerHTML = element.recovered;
        Deaths.innerHTML = element.deaths;
        
        UpdateGraphData(element.confirmed,element.active,element.recovered,element.deaths);
       


    }).catch((error) => {

        console.log(error);
    });


}

IndiaCovid19TotalData();






// Fetching  Indian State Real time Data.
const IndiaCovid19Data = () => {

    fetch("https://covid-india-cases.herokuapp.com/states/").then((data) => {

        return data.json();

    }).then((result) => {


        let tbody = document.getElementById("tablevalue").querySelector("tbody");
        result.forEach(element => {

            tbody.innerHTML += `<tr><td>${element.state}</td><td>${element.noOfCases}</td> <td>${element.active}</td><td>${element.cured}</td> <td>${element.deaths}</td></tr>`
        });


    }).catch((error) => {

        console.log(error);
    });


}

IndiaCovid19Data();




function UpdateGraphData(TotalCases,Active,Recoverd,Deaths){


    window.myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['TotalCases', 'Active', 'Recoverd', "Deaths"],
            datasets: [{
                label: 'India Total Cases',
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
                        color:"#fff",
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