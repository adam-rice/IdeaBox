$(document).ready(function () {

    $("#save-button").click(function () {
      var $titleInput = $("#title-input").val();
      var $bodyInput = $("#body-input").val();
      transferIdeaToBottom($titleInput, $bodyInput);
    });

    $("#title-input, #body-input").on("keyup keydown", function(key) {
      if (key.which === 13) { // the enter key
        transferIdeaToBottom();
      }
  });

    function transferIdeaToBottom($titleInput, $bodyInput) {
      var inputObject = {};
      inputObject.title = $titleInput;
      inputObject.body = $bodyInput;
      var stringifiedObj = JSON.stringify(inputObject);
      localStorage.setItem('userInput', stringifiedObj);
      var gottenItem = localStorage.getItem('userInput');
      var parsed = JSON.parse(gottenItem);
      var newTitle = parsed.title;
      var newBody = parsed.body;
      createIdeaContainer(newTitle, newBody);
      clearInputFields();
    }

    var qualityRating = "text"; //dummy; needs to change

    function createIdeaContainer(newTitle, newBody) {
        var newSection = "<section id='each-idea-container'><h3>"+newTitle+"</h3><p>"+newBody+"</p><img id='upvote' src=''><img id='downvote' src=''><h6>Quality: "+qualityRating+"</h6></section>";
        $("#user-ideas").prepend(newSection);
    }

    function clearInputFields() {
        $("#title-input").val("");
        $("#body-input").val("");
    }


}); //end of jQuery body
