// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteDive(diveID) {
  let link = '/delete-dive/';
  let data = {
    dive_id: diveID
  };

  var result = confirm("Are you sure you want to delete this Dive?");

  if (result){
    alert("Dive deleted successfully")
  }
  else {
    alert("Delete action canceled")
    return
  }

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function(result) {
      deleteRow(diveID);
    }
  });
  console.log(diveID);
}

function deleteRow(diveID){
    let table = document.getElementById("dives-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       let value = table.rows[i].getAttribute("data-value");
       if (value == diveID) {
            table.deleteRow(i);
            break;
       }
    }
}