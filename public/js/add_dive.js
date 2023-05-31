// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addDiverForm = document.getElementById('addDive');

// Modify the objects we need
addDiverForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUnits = document.getElementById("unitsSelect").value;
    let inputDate = document.getElementById("insert_date").value;
    let inputMaxDepth = document.getElementById("insert_max_depth").value;
    let inputAvgDepth = document.getElementById("insert_avg_depth").value;
    let inputDuration = document.getElementById("insert_duration").value;
    let inputStartPressure = document.getElementById("insert_start_pressure").value;
    let inputEndPressure = document.getElementById("insert_end_pressure").value;
    let inputGasType = document.getElementById("insert_gas_type").value;
    let inputWaterTemp = document.getElementById("insert_water_temperature").value;
    let inputWeight = document.getElementById("insert_weight").value;
    let inputVisibility = document.getElementById("insert_visibility").value;
    let inputEntryDetails = document.getElementById("insert_entry_details").value;
    let inputConditionNote = document.getElementById("insert_condition_note").value;
    let inputNote = document.getElementById("insert_note").value;
    let inputSiteRating = document.getElementById("insert_site_rating").value;

    // Get the values from the form fields

    // Put our data we want to send in a javascript object
    let data = {
        unit_id: inputUnits,
        date: inputDate,
        max_depth: inputMaxDepth,
        avg_depth: inputAvgDepth,
        duration: inputDuration,
        start_pressure: inputStartPressure,
        end_pressure: inputEndPressure,
        gas_type: inputGasType,
        water_temperature: inputWaterTemp,
        weight: inputWeight,
        visibility: inputVisibility,
        entry_details: inputEntryDetails,
        condition_note: inputConditionNote,
        note: inputNote,
        site_rating: inputSiteRating
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addDive", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            //addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUnits = '';
            inputDate = '';
            inputMaxDepth = '';
            inputAvgDepth = '';
            inputDuration = '';
            inputStartPressure  = '';
            inputEndPressure = '';
            inputGasType  = '';
            inputWaterTemp = '';
            inputWeight = '';
            inputVisibility = '';
            inputEntryDetails = '';
            inputConditionNote = '';
            inputNote = '';
            inputSiteRating = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from Divers
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("dives-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 6 cells
    let row = document.createElement("TR");
    let diverIdCell = document.createElement("TD");
    let diverNameCell = document.createElement("TD");
    let diverAgeCell = document.createElement("TD");
    let diverSACCell = document.createElement("TD");
    let diverNumDives = document.createElement("TD");
    let diverTotalDiveTime = document.createElement("TD");

    let deleteCell = document.createElement("TD");
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(){
        deleteDiver(newRow.diver_id);
    };
    deleteCell.appendChild(deleteButton);

    diverIdCell.innerText = newRow.diver_id;
    diverNameCell.innerText = newRow.diver_name;
    diverAgeCell.innerText = newRow.diver_age;
    diverSACCell.innerText = newRow.avg_SAC;
    diverNumDives.innerText = newRow.num_dives;
    diverTotalDiveTime.innerText = newRow.total_dive_time;

    // Add the cells to the row 
    row.appendChild(deleteCell);
    row.appendChild(diverIdCell);
    row.appendChild(diverNameCell);
    row.appendChild(diverAgeCell);
    row.appendChild(diverSACCell);
    row.appendChild(diverNumDives);
    row.appendChild(diverTotalDiveTime);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.diver_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Adds into the dropdown menu of updating a diver
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.diver_name;
    option.value = newRow.diver_id;
    selectMenu.add(option);
}