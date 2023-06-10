// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteDivesToDiveSites(divestodivesitesID) {
  let link = '/delete-divestodivesites/';
  let data = {
    dives_to_divesites_id: divestodivesitesID
  };

  var result = confirm("Are you sure you want to delete this log?");

  if (result){
    alert("Log deleted successfully")
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
      deleteRow(divestodivesitesID);
    }
  });
  console.log(divestodivesitesID);
}

function deleteRow(divestodivesitesID){
    let table = document.getElementById("divestodivesites-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       let value = table.rows[i].getAttribute("data-value");
       if (value == divestodivesitesID) {
            table.deleteRow(i);
            break;
       }
    }
}