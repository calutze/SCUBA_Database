// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteDiver(diverID) {
  let link = '/delete-diver/';
  let data = {
    diver_id: diverID
  };

  var result = confirm("Are you sure you want to delete this Diver?");

  if (result){
    alert("Diver deleted successfully")
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
      deleteRow(diverID);
    }
  });
  console.log(diverID);
}

function deleteRow(diverID){
    let table = document.getElementById("divers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       let value = table.rows[i].getAttribute("data-value");
       if (value == diverID) {
            table.deleteRow(i);
            break;
       }
    }
}