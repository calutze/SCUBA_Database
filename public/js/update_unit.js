// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateUnitForm = document.getElementById('updateUnit');

updateUnitForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let selectUnitId = document.getElementById("mySelect");
    let selectPressureUnit = document.getElementById("selected_pressure_unit");
    let selectLengthUnit = document.getElementById("selected_length_unit");
    let selectWeightUnit = document.getElementById("selected_weight_unit");
    let selectTemperatureUnit = document.getElementById("selected_temperature_unit");
    let updatedUnitName = document.getElementById("updated_unit_name")

    let unitIdValue = selectUnitId.value;
    let pressureUnitValue = selectPressureUnit.value;
    let lengthUnitValue = selectLengthUnit.value;
    let weightUnitValue = selectWeightUnit.value;
    let temperatureUnitValue = selectTemperatureUnit.value;
    let updatedUnitNameValue = updatedUnitName.value


    let data = {
        unit_id: unitIdValue,
        unit_name: updatedUnitNameValue,
        pressure_unit: pressureUnitValue,
        length_unit: lengthUnitValue,
        weight_unit: weightUnitValue,
        temperature_unit: temperatureUnitValue
    }


    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updatedUnit", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, unitIdValue);
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