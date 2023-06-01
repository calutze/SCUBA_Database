// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteDivelog(divelogID) {
  let link = '/delete-divelog/';
  let data = {
    divelog_id: divelogID
  };

  var result = confirm("Are you sure you want to delete this Divelog?");

  if (result){
    alert("Divelog deleted successfully")
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
      deleteRow(divelogID);
    }
  });
  console.log(divelogID);
}

function deleteRow(divelogID){
    let table = document.getElementById("divelog-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       let value = table.rows[i].getAttribute("data-value");
       if (value == divelogID) {
            table.deleteRow(i);
            break;
       }
    }
}