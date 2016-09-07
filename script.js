$(document).ready(function () {

    $("#save-button").click(function () {
      transferIdeaToBottom();
    });


    function transferIdeaToBottom() {
      var titleInput = $("#title-input").val();
      var bodyInput = $("#body-input").val();

    }

    function createIdeaContainer() {
        var newSection = ;
        $("#user-ideas").prepend(newSection);
    }


}); //end of jQuery body
