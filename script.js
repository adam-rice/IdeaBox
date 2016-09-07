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
        var newSection = "<section><h3>My Brilliant Idea Title</h3><p>My Brilliant Details</p><img src=''><img src=''><h6>Quality</h6></section>";
        $("#user-ideas").prepend(newSection);
    }


}); //end of jQuery body
