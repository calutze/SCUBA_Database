// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addDivelogForm = document.getElementById('addDivelog');

// Modify the objects we need
addDivelogForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDive = document.getElementById("insertDiveSelect").value;
    let inputDiver = document.getElementById("insertDiverSelect").value;

    // Put our data we want to send in a javascript object
    let data = {
        dive_id: inputDive,
        diver_id: inputDiver
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addDivelog", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

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
    let currentTable = document.getElementById("divelog-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 6 cells
    let row = document.createElement("TR");
    let divelogIdCell = document.createElement("TD");
    let diveCell = document.createElement("TD");
    let diverCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(){
        deleteDiver(newRow.diver_id);
    };
    deleteCell.appendChild(deleteButton);

    divelogIdCell.innerText = newRow.divelog_id;
    diveCell.innerText = 'Dive ID: ' + newRow.dive_id + ' ' + "Date: " + ' ' + newRow.date + ' ' + "Max Depth: " + ' ' + newRow.max_depth + ' ' + "Duration: " + ' ' + newRow.duration;
    diverCell.innerText = newRow.diver_name;

    // Add the cells to the row 
    row.appendChild(deleteCell);
    row.appendChild(divelogIdCell);
    row.appendChild(diveCell);
    row.appendChild(diverCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.divelog_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Adds into the dropdown menu of updating a diver
    let selectMenu = document.getElementById("selectedDivelogId");
    let option = document.createElement("option");
    option.text = newRow.diver_name;
    option.value = newRow.divelog_id;
    selectMenu.add(option);
}