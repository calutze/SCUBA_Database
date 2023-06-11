// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addDiveSiteForm = document.getElementById('addDiveSite');

// Modify the objects we need
addDiveSiteForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSiteName = document.getElementById("insert_site_name");
    let inputCity = document.getElementById("insert_city");
    let inputCountry = document.getElementById("insert_country");

    // Get the values from the form fields
    let siteNameValue = inputSiteName.value;
    let cityValue = inputCity.value;
    let countryValue = inputCountry.value;

    // Put our data we want to send in a javascript object
    let data = {
        site_name: siteNameValue,
        city: cityValue,
        country: countryValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addDiveSite", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputSiteName.value = '';
            inputCity.value = '';
            inputCountry.value = '';
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
    let currentTable = document.getElementById("divesites-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 6 cells
    let row = document.createElement("TR");
    let diveSiteIdCell = document.createElement("TD");
    let siteNameCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let countryCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function(){
        deleteDiveSite(newRow.divesite_id);
    };
    deleteCell.appendChild(deleteButton);

    diveSiteIdCell.innerText = newRow.divesite_id;
    siteNameCell.innerText = newRow.site_name;
    cityCell.innerText = newRow.city;
    countryCell.innerText = newRow.country;

    // Add the cells to the row 
    row.appendChild(deleteCell);
    row.appendChild(diveSiteIdCell);
    row.appendChild(siteNameCell);
    row.appendChild(cityCell);
    row.appendChild(countryCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.divesite_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Adds into the dropdown menu of updating a diver
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.site_name;
    option.value = newRow.divesite_id;
    selectMenu.add(option);
}