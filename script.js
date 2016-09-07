$(document).ready(function () {

    $("#save-button").click(function () {
        transferIdeaToBottom();
    });


    function transferIdeaToBottom() {
      var $titleInput = $("#title-input").val();
      var $bodyInput = $("#body-input").val();
      var inputObject = {};
      inputObject.title = $titleInput;
      inputObject.body = $bodyInput;
      var stringifiedObj = JSON.stringify(inputObject);
      localStorage.setItem('userInput', stringifiedObj);
      var gottenItem = localStorage.getItem('userInput');
      var parsed = JSON.parse(gottenItem);
    //   console.log(parsed);
      var newTitle = parsed.title;
      var newBody = parsed.body;
      console.log(newBody);
      createIdeaContainer(newTitle, newBody); // needs to be corrected with storedInput variables
    }

    function createIdeaContainer(newTitle, newBody) {
        var newSection = "<section id='each-idea-container'><h3>"+newTitle+"</h3><p>"+newBody+"</p><img id='upvote' src=''><img id='downvote' src=''><h6>Quality: "+qualityRating+"</h6></section>";
        $("#user-ideas").prepend(newSection);
    }


}); //end of jQuery body
