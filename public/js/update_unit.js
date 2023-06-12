// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateUnitForm = document.getElementById('updateUnit');

updateUnitForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let unitId = document.getElementById("unitSelect").value;
    let updateUnitName = document.getElementById("update_unit_name").value;
    let updatePressureUnit = document.getElementById("update_pressure_unit").value;
    let updateLengthUnit = document.getElementById("update_length_unit").value;
    let updateWeightUnit = document.getElementById("update_weight_unit").value;
    let updateTemperatureUnit = document.getElementById("update_temperature_unit").value;



    let data = {
        unit_id: unitId,
        unit_name: updateUnitName,
        pressure_unit: updatePressureUnit,
        length_unit: updateLengthUnit,
        weight_unit: updateWeightUnit,
        temperature_unit: updateTemperatureUnit
    }


    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateUnit", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, unitId);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log ("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
})

function updateRow(data, unit_id){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("units-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        
        if (table.rows[i].getAttribute("data-value") == unit_id) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData[0].unit_name;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData[0].pressure_unit;
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = parsedData[0].length_unit;
            updateRowIndex.getElementsByTagName("td")[5].innerHTML = parsedData[0].weight_unit;
            updateRowIndex.getElementsByTagName("td")[6].innerHTML = parsedData[0].temperature_unit;

        }
    }
    location.reload();
}