// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addUnitForm = document.getElementById('addUnit');

// Modify the objects we need
addUnitForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUnitName = document.getElementById("insert_unit_name").value;
    let inputPressureUnit = document.getElementById("insert_pressure_unit").value;
    let inputLengthUnit = document.getElementById("insert_length_unit").value;
    let inputWeightUnit = document.getElementById("insert_weight_unit").value;
    let inputTemperatureUnit = document.getElementById("insert_temperature_unit").value;

    // Put our data we want to send in a javascript object
    let data = {
        unit_name: inputUnitName,
        pressure_unit: inputPressureUnit,
        length_unit: inputLengthUnit,
        weight_unit: inputWeightUnit,
        temperature_unit: inputTemperatureUnit
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addUnit", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUnitName = '';
            inputPressureUnit = '';
            inputLengthUnit = '';
            inputWeightUnit = '';
            inputTemperatureUnit = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload();

})


// Creates a single row from an Object representing a single record from Units
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("units-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 6 cells
    let row = document.createElement("TR");
    let unitIdCell = document.createElement("TD");
    let unitNameCell = document.createElement("TD");
    let pressureUnitCell = document.createElement("TD");
    let lengthUnitCell = document.createElement("TD");
    let weightUnitCell = document.createElement("TD");
    let temperatureUnitCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(){
        deleteUnit(newRow.unit_id);
    };
    deleteCell.appendChild(deleteButton);

    unitIdCell.innerText = newRow.unit_id;
    unitNameCell.innerText = newRow.unit_name;
    pressureUnitCell.innerText = newRow.pressure_unit;
    lengthUnitCell.innerText = newRow.length_unit;
    weightUnitCell.innerText = newRow.weight_unit;
    temperatureUnitCell.innerText = newRow.temperature_unit;

    // Add the cells to the row 
    row.appendChild(deleteCell);
    row.appendChild(unitIdCell);
    row.appendChild(unitNameCell);
    row.appendChild(pressureUnitCell);
    row.appendChild(lengthUnitCell);
    row.appendChild(weightUnitCell);
    row.appendChild(temperatureUnitCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.unit_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Adds into the dropdown menu of updating a unit
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.unit_name;
    option.value = newRow.unit_id;
    selectMenu.add(option);
}