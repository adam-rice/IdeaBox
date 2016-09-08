$(document).ready(function () {



    $("#save-button").click(function () {
      var $titleInput = $("#title-input").val();
      var $bodyInput = $("#body-input").val();
      transferIdeaToBottom($titleInput, $bodyInput);
    });

  //   $("#title-input, #body-input").on("keyup keydown", function(key) {
  //     debugger;
  //     var $titleInput = $("#title-input").val();
  //     var $bodyInput = $("#body-input").val();
  //     if (key.which === 13) { // the enter key
  //       transferIdeaToBottom($titleInput, $bodyInput);
  //     }
  // });

    function transferIdeaToBottom($titleInput, $bodyInput) {
      var inputObject = {};
      inputObject.title = $titleInput;
      inputObject.body = $bodyInput;
      inputObject.id = Date.now();
      inputObject.quality = "swill";
      var stringifiedObj = JSON.stringify(inputObject);
      localStorage.setItem('userInput', stringifiedObj);
      var gottenItem = localStorage.getItem('userInput');
      var parsed = JSON.parse(gottenItem);
      var newTitle = parsed.title;
      var newBody = parsed.body;
      var newId = parsed.id;
      var newQuality = parsed.quality;
      createIdeaContainer(newTitle, newBody, newQuality);
      clearInputFields();
    }

    function createIdeaContainer(newTitle, newBody, newQuality) {
        var newSection = "<section id='each-idea-container'><h3>"+newTitle+"</h3><p>"+newBody+"</p><img id='upvote' src=''><img id='downvote' src=''><h6>Quality: "+newQuality+"</h6></section>";
        $("#user-ideas").prepend(newSection);
    }

    function clearInputFields() {
        $("#title-input").val("");
        $("#body-input").val("");
    }

    $(window).on("load", function() {
        // alert('hi');
    //     debugger;
      var gottenItem = localStorage.getItem('userInput');
      var parsed = JSON.parse(gottenItem);
      var newTitle = parsed.title;
      var newBody = parsed.body;
      var newId = parsed.id;
      var newQuality = parsed.quality;
      createIdeaContainer(newTitle, newBody, newQuality);
    });


}); //end of jQuery body
