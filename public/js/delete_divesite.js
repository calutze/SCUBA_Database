// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteDiveSite(divesiteID) {
    let link = '/delete-divesite/';
    let data = {
      divesite_id: divesiteID
    };
  
    var result = confirm("Are you sure you want to delete this Dive Site?");
  
    if (result){
      alert("Dive Site deleted successfully")
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
        deleteRow(divesiteID);
      }
    });
    console.log(divesiteID);
  }
  
  function deleteRow(divesiteID){
      let table = document.getElementById("divesites-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         let value = table.rows[i].getAttribute("data-value");
         if (value == divesiteID) {
              table.deleteRow(i);
              break;
         }
      }
  }