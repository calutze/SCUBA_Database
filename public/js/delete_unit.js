// Based on starter code described in https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteUnit(unitID) {
    let link = '/delete-unit/';
    let data = {
      unit_id: unitID
    };
  
    var result = confirm("Are you sure you want to delete this Unit?");
  
    if (result){
      alert("Unit deleted successfully")
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
        deleteRow(unitID);
      }
    });
    console.log(unitID);
  }
  
  function deleteRow(unitID){
      let table = document.getElementById("units-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         let value = table.rows[i].getAttribute("data-value");
         if (value == unitID) {
              table.deleteRow(i);
              break;
         }
      }
  }