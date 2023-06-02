// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteDiveToDiveSites(divetodivesitesID) {
    let link = '/delete-divetodivesites/';
    let data = {
      dive_to_divesites_id: divetodivesitesID
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
        deleteRow(divetodivesitesID);
      }
    });
    console.log(divetodivesitesID);
  }
  
  function deleteRow(divetodivesitesID){
      let table = document.getElementById("divestodivesites-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         let value = table.rows[i].getAttribute("data-value");
         if (value == divetodivesitesID) {
              table.deleteRow(i);
              break;
         }
      }
  }