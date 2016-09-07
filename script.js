$(document).ready(function () {
  // renderIdea();
    $("#save-button").click(function () {
        transferIdeaToBottom();
    });

    var ideas = [];

    function transferIdeaToBottom() {
      var $titleInput = $("#title-input").val();
      var $bodyInput = $("#body-input").val();
      var inputObject = { title: $titleInput, body: $bodyInput};
      // inputObject.title = $titleInput;
      // inputObject.body = $bodyInput;
      var stringifiedObj = JSON.stringify(inputObject);
      ideas.push(stringifiedObj)
      localStorage.setItem('userInput', ideas);
      // var gottenItem = localStorage.getItem('userInput');
      // var parsed = JSON.parse(gottenItem);
      // var newTitle = parsed.title;
      // var newBody = parsed.body;
      createIdeaContainer($titleInput, $bodyInput);
    }

    var qualityRating = "text";

    function createIdeaContainer(newTitle, newBody) {
        var newSection = "<section id='each-idea-container'><h3>"+newTitle+"</h3><p>"+newBody+"</p><img id='upvote' src=''><img id='downvote' src=''><h6>Quality: "+qualityRating+"</h6></section>";
        $("#user-ideas").prepend(newSection);
    }


}); //end of jQuery body
