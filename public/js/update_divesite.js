// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateDiveSiteForm = document.getElementById('updateDiveSite');

updateDiveSiteForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let diveSiteId = document.getElementById("siteSelect").value;
    let updateSiteName = document.getElementById("update_site_name").value;
    let updateCity = document.getElementById("update_city").value;
    let updateCountry = document.getElementById("update_country").value;


    let data = {
        divesite_id: diveSiteId,
        city: updateCity,
        country: updateCountry,
        site_name: updateSiteName
    }


    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateDiveSite", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, diveSiteId);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log ("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
})

function updateRow(data, divesite_id){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("divesites-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        
        if (table.rows[i].getAttribute("data-value") == divesite_id) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData[0].site_name;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData[0].city;
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = parsedData[0].country;

        }
    }
}