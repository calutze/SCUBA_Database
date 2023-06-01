// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateDiverForm = document.getElementById('updateDive');

updateDiverForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let diveId = document.getElementById("diveSelect").value;
    let updateUnits = document.getElementById("unitsUpdateSelect").value;
    let updateDate = document.getElementById("update_date").value;
    let updateMaxDepth = document.getElementById("update_max_depth").value;
    let updateAvgDepth = document.getElementById("update_avg_depth").value;
    let updateDuration = document.getElementById("update_duration").value;
    let updateStartPressure = document.getElementById("update_start_pressure").value;
    let updateEndPressure = document.getElementById("update_end_pressure").value;
    let updateGasType = document.getElementById("update_gas_type").value;
    let updateWaterTemp = document.getElementById("update_water_temperature").value;
    let updateWeight = document.getElementById("update_weight").value;
    let updateVisibility = document.getElementById("update_visibility").value;
    let updateEntryDetails = document.getElementById("update_entry_details").value;
    let updateConditionNote = document.getElementById("update_condition_note").value;
    let updateNote = document.getElementById("update_note").value;
    let updateSiteRating = document.getElementById("update_site_rating").value;


    let data = {
        dive_id: diveId,
        unit_id: updateUnits,
        date: updateDate,
        max_depth: updateMaxDepth,
        avg_depth: updateAvgDepth,
        duration: updateDuration,
        start_pressure: updateStartPressure,
        end_pressure: updateEndPressure,
        gas_type: updateGasType,
        water_temperature: updateWaterTemp,
        weight: updateWeight,
        visibility: updateVisibility,
        entry_details: updateEntryDetails,
        condition_note: updateConditionNote,
        note: updateNote,
        site_rating: updateSiteRating
    }


    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateDive", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, diveId);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log ("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
})

function updateRow(data, dive_id){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("dives-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        
        if (table.rows[i].getAttribute("data-value") == dive_id) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData[0].units;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData[0].date;
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = parsedData[0].max_depth;
            updateRowIndex.getElementsByTagName("td")[5].innerHTML = parsedData[0].avg_depth;
            updateRowIndex.getElementsByTagName("td")[6].innerHTML = parsedData[0].duration;
            updateRowIndex.getElementsByTagName("td")[7].innerHTML = parsedData[0].start_pressure;
            updateRowIndex.getElementsByTagName("td")[8].innerHTML = parsedData[0].end_pressure;
            updateRowIndex.getElementsByTagName("td")[9].innerHTML = parsedData[0].SAC;
            updateRowIndex.getElementsByTagName("td")[10].innerHTML = parsedData[0].gas_type;
            updateRowIndex.getElementsByTagName("td")[11].innerHTML = parsedData[0].water_temperature;
            updateRowIndex.getElementsByTagName("td")[12].innerHTML = parsedData[0].weight;
            updateRowIndex.getElementsByTagName("td")[13].innerHTML = parsedData[0].visibility;
            updateRowIndex.getElementsByTagName("td")[14].innerHTML = parsedData[0].entry_details;
            updateRowIndex.getElementsByTagName("td")[15].innerHTML = parsedData[0].condition_note;
            updateRowIndex.getElementsByTagName("td")[16].innerHTML = parsedData[0].note;
            updateRowIndex.getElementsByTagName("td")[17].innerHTML = parsedData[0].site_rating;

        }
    }
}