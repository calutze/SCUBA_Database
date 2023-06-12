// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app
function updateDivelog(divelogID) {
    let updateDivelogForm = document.getElementById('updateDivelog');

    const rowToUpdate = document.querySelector(`[data-value="${divelogID}"]`);

    let dive = rowToUpdate.getElementsByClassName("dive")[0].textContent;
    document.getElementById("updateDiveSelect").value = dive;

    updateDivelogForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let selectDivelogId = document.getElementById("selectedDivelogId").value;
        let updatedDiveId = document.getElementById("updateDiveSelect").value;
        let updatedDiverId = document.getElementById("updateDiverSelect").value;

        let data = {
            divelog_id: selectDivelogId,
            dive_id: updatedDiveId,
            diver_id: updatedDiverId
        }

        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/updateDivelog", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                updateRow(xhttp.response, selectDivelogId);
            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log ("There was an error with the input.")
            }
        }

        xhttp.send(JSON.stringify(data));
    })
}

function updateRow(data, divelog_id){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("divelog-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        
        if (table.rows[i].getAttribute("data-value") == divelog_id) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            updateRowIndex.getElementsByTagName("td")[2].innerHTML = `<strong>Dive ID: </strong>` + parsedData[0].dive_id + `<strong> Date: </strong>` + parsedData[0].date + `<strong> Max Depth: </strong>` + parsedData[0].max_depth + `<strong> Duration: </strong>` + parsedData[0].duration;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData[0].diver_name;

        }
    }
}