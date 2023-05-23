// Get the objects we need to modify
let addDiverForm = document.getElementById('addDiver');

// Modify the objects we need
addDiverForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDiverName = document.getElementById("insert_diver_name");
    let inputDiverAge = document.getElementById("insert_diver_age");

    // Get the values from the form fields
    let diverNameValue = inputDiverName.value;
    let diverAgeValue = inputDiverAge.value;

    // Put our data we want to send in a javascript object
    let data = {
        diver_name: diverNameValue,
        diver_age: diverAgeValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addDiver", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputDiverName.value = '';
            inputDiverAge.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("divers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    //let diverIdCell = document.createElement("TD");
    let diverNameCell = document.createElement("TD");
    let diverAgeCell = document.createElement("TD");

    // Fill the cells with correct data
    //diverIdCell.innerText = newRow.diver_id;
    diverNameCell.innerText = newRow.diver_name;
    diverAgeCell.innerText = newRow.diver_age;

    // Add the cells to the row 
    //row.appendChild(diverIdCell);
    row.appendChild(diverNameCell);
    row.appendChild(diverAgeCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}