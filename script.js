$(document).ready(function () {

    $("#save-button").click(function () {
      transferIdeaToBottom();
    });


    function transferIdeaToBottom() {
      var titleInput = $("#title-input").val();
      var bodyInput = $("#body-input").val();
      alert(titleInput);
    }




}); //end of jQuery body
