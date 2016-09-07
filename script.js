$(document).ready(function () {

    $("#save-button").click(function () {
        transferIdeaToBottom();
    });


    function transferIdeaToBottom() {
      var $titleInput = $("#title-input").val();
      var $bodyInput = $("#body-input").val();
    //   var inputObject = {};
      createIdeaContainer($titleInput, $bodyInput); // needs to be corrected with storedInput variables
    }

    function createIdeaContainer($titleInput, $bodyInput) {
        var newSection = "<section><h3>"+$titleInput+"</h3><p>"+$bodyInput+"</p><img src=''><img src=''><h6>Quality</h6></section>";
        $("#user-ideas").prepend(newSection);
    }


}); //end of jQuery body
