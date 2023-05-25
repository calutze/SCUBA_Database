// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateDiverForm = document.getElementById('updateDiver');

updateDiverForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let selectDiverName = document.getElementById("selected_diver_name");
    let selectDiverAge = document.getElementById("selected_diver_age");

    let diverNameValue = selectDiverName.value;
    let diverAgeValue = selectDiverAge.value;


    let data = {
        diver_name: diverNameValue,
        diver_age: diverAgeValue
    }


    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateDiver", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, diverNameValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log ("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
})

function updateRow(data, diver_id){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("divers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        
        if (table.rows[i].getAttribute("data-value") == diver_id) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[3];

            td.innerHTML = parsedData[0].name;
        }
    }
}