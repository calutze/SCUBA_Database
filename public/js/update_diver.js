// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

function updateDiver(diverID) {

    window.scrollTo(0, document.body.scrollHeight);
    
    let updateDiverForm = document.getElementById('update-diver-form');

    document.getElementById("updated_diver_name").removeAttribute("disabled");
    document.getElementById("selected_diver_age").removeAttribute("disabled");

    const rowToUpdate = document.querySelector(`[data-value="${diverID}"]`)

    document.getElementById("update_diver_id").value = diverID;
    
    let diverName = rowToUpdate.getElementsByClassName("diver-name")[0].textContent;
    document.getElementById("updated_diver_name").value = diverName

    let diverAge = rowToUpdate.getElementsByClassName("diver-age")[0].textContent;
    document.getElementById("selected_diver_age").value = diverAge

    updateDiverForm.addEventListener("submit", function (e) {

        e.preventDefault();
        e.stopImmediatePropagation();

        let selectDiverId = document.getElementById("update_diver_id");
        let selectDiverAge = document.getElementById("selected_diver_age");
        let updatedDiverName = document.getElementById("updated_diver_name");

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
}

function updateRow(data, diver_id){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("divers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        
        if (table.rows[i].getAttribute("data-value") == diver_id) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData[0].diver_name;
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = parsedData[0].diver_age;

        }
    }
}