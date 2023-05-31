// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateDiverForm = document.getElementById('updateDiver');

updateDiverForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let selectDiverId = document.getElementById("mySelect");
    let selectDiverAge = document.getElementById("selected_diver_age");
    let updatedDiverName = document.getElementById("updated_diver_name")

    let diverIdValue = selectDiverId.value;
    let diverAgeValue = selectDiverAge.value;
    let updatedDiverNameValue = updatedDiverName.value


    let data = {
        diver_id: diverIdValue,
        diver_name: updatedDiverNameValue,
        diver_age: diverAgeValue
    }


    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateDiver", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, diverIdValue);
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

            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData[0].diver_name;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData[0].diver_age;

        }
    }
}