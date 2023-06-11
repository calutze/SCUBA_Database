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
            addRowToTable(xhttp.response);

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
    location.reload();

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
    let diveIDCell = document.createElement("TD");
    let unitCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
    let maxDepthCell = document.createElement("TD");
    let avgDepthCell = document.createElement("TD");
    let durationCell = document.createElement("TD");
    let startPressureCell = document.createElement("TD");
    let endPressureCell = document.createElement("TD");
    let SACCell = document.createElement("TD");
    let gasTypeCell = document.createElement("TD");
    let waterTempCell = document.createElement("TD");
    let WeightCell = document.createElement("TD");
    let visibilityCell = document.createElement("TD");
    let entryDetailsCell = document.createElement("TD");
    let conditionNoteCell = document.createElement("TD");
    let noteCell = document.createElement("TD");
    let siteRatingCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(){
        deleteDiver(newRow.dive_id);
    };
    deleteCell.appendChild(deleteButton);

    diveIDCell.innerText = newRow.dive_id
    unitCell.innerText = newRow.units;
    dateCell.innerText = newRow.date;
    maxDepthCell.innerText = newRow.max_depth;
    avgDepthCell.innerText = newRow.avg_depth;
    durationCell.innerText = newRow.duration;
    startPressureCell.innerText = newRow.start_pressure;
    endPressureCell.innerText = newRow.end_pressure;
    SACCell.innerText = newRow.SAC;
    gasTypeCell.innerText = newRow.gas_type;
    waterTempCell.innerText = newRow.water_temperature;
    WeightCell.innerText = newRow.weight;
    visibilityCell.innerText = newRow.visibility;
    entryDetailsCell.innerText = newRow.entry_details;
    conditionNoteCell.innerText = newRow.condition_note;
    noteCell.innerText = newRow.note;
    siteRatingCell.innerText = newRow.site_rating;

    // Add the cells to the row 
    row.appendChild(deleteCell);
    row.appendChild(diveIDCell);
    row.appendChild(unitCell);
    row.appendChild(dateCell);
    row.appendChild(maxDepthCell);
    row.appendChild(avgDepthCell);
    row.appendChild(durationCell);
    row.appendChild(startPressureCell);
    row.appendChild(endPressureCell);
    row.appendChild(SACCell);
    row.appendChild(gasTypeCell);
    row.appendChild(waterTempCell);
    row.appendChild(WeightCell);
    row.appendChild(visibilityCell);
    row.appendChild(entryDetailsCell);
    row.appendChild(conditionNoteCell);
    row.appendChild(noteCell);
    row.appendChild(siteRatingCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.dive_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Adds into the dropdown menu of updating a diver
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.diver_name;
    option.value = newRow.diver_id;
    selectMenu.add(option);
}