// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateUnitForm = document.getElementById('updateUnit');

updateUnitForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let selectUnitId = document.getElementById("mySelect").value;
    let selectPressureUnit = document.getElementById("selected_pressure_unit").value;
    let selectLengthUnit = document.getElementById("selected_length_unit").value;
    let selectWeightUnit = document.getElementById("selected_weight_unit").value;
    let selectTemperatureUnit = document.getElementById("selected_temperature_unit").value;
    let updatedUnitName = document.getElementById("updated_unit_name").value;



    let data = {
        unit_id: selectUnitId,
        unit_name: updatedUnitName,
        pressure_unit: selectPressureUnit,
        length_unit: selectLengthUnit,
        weight_unit: selectWeightUnit,
        temperature_unit: selectTemperatureUnit
    }


    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateUnit", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, selectUnitId);
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
}