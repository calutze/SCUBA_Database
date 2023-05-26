// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteDiver(diverID) {
  let link = '/delete-diver/';
  let data = {
    diver_id: diverID
  };

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
       if (table.rows[i].getAttribute("data-value") == diverID) {
            table.deleteRow(i);
            break;
       }
    }
}