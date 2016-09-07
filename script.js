$(document).ready(function () {

    $("#save-button").click(function () {
        createIdeaContainer();
        transferIdeaToBottom();
    });


    function transferIdeaToBottom() {
      var titleInput = $("#title-input").val();
      var bodyInput = $("#body-input").val();

    }

    function createIdeaContainer() {
        var newSection = "<section>dogs</section>";
        $("#user-ideas").prepend(newSection);
    }


}); //end of jQuery body
