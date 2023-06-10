// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateDivesToDiveSitesForm = document.getElementById('updateDivesToDiveSites');

updateDivesToDiveSitesForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let selectDivesToDiveSitesId = document.getElementById("selectedDivesToDiveSitesId").value;
    let updatedDiveId = document.getElementById("updateDiveSelect").value;
    let updatedSiteId = document.getElementById("updateSiteSelect").value;

    let data = {
        dives_to_divesites_id: selectDivesToDiveSitesId,
        dive_id: updatedDiveId,
        divesite_id: updatedSiteId
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateDivesToDiveSites", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, selectDivesToDiveSitesId);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log ("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
})

function updateRow(data, dives_to_divesites_id){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("divestodivesites-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        
        if (table.rows[i].getAttribute("data-value") == dives_to_divesites_id) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            updateRowIndex.getElementsByTagName("td")[2].innerHTML = `<strong>Dive ID: </strong>` + parsedData[0].dive_id + `<strong> Date: </strong>` + parsedData[0].date + `<strong> Max Depth: </strong>` + parsedData[0].max_depth + `<strong> Duration: </strong>` + parsedData[0].duration;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData[0].site_name;

        }
    }
}