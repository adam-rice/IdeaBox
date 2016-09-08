$(document).ready(function () {

    $("#save-button").click(function () {
      var $titleInput = $("#title-input").val();
      var $bodyInput = $("#body-input").val();
      transferIdeaToBottom($titleInput, $bodyInput);
    });

  //   $("#title-input, #body-input").on("keyup keydown", function(key) { //the function to activate idea when user presses enter
  //     debugger;
  //     var $titleInput = $("#title-input").val();
  //     var $bodyInput = $("#body-input").val();
  //     if (key.which === 13) { // the enter key
  //       transferIdeaToBottom($titleInput, $bodyInput);
  //     }
  // });

  var arr = [];

    function transferIdeaToBottom($titleInput, $bodyInput) {
      var inputObject = {};
      inputObject.title = $titleInput;
      inputObject.body = $bodyInput;
      inputObject.id = Date.now();
      inputObject.quality = "swill";
      arr.push(inputObject);
      var stringifiedArray = JSON.stringify(arr);
      localStorage.setItem('array', stringifiedArray);
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
        var newSection = "<section id='each-idea-container'><h3>"+newTitle+"</h3><p>"+newBody+"</p><img id='upvote' src='images/upvote.svg'><img id='downvote' src='images/downvote.svg'><img id='delete' src='images/delete.svg'><h6><span id='designation-quality'>quality</span>: "+newQuality+"</h6><hr></section>";
        $("#user-ideas").prepend(newSection);
    }

    $("#user-ideas").on("click", "#delete", function() {
      // deleteIdea();
      console.log(this);
      $(this).parent().remove();
      });

    // function deleteIdea() {
    //
    //
    // }

    function clearInputFields() {
        $("#title-input").val("");
        $("#body-input").val("");
    }

    $(window).on("load", function() {
      var gottenArray = localStorage.getItem('array');
      var parsedArray = JSON.parse(gottenArray);
      for (var i = 0; i < parsedArray.length; i++) {
        var obj = parsedArray[i];
        var newTitle = parsedArray[i].title;
        var newBody = parsedArray[i].body;
        var newId = parsedArray[i].id;
        var newQuality = parsedArray[i].quality;
        createIdeaContainer(newTitle, newBody, newQuality);
      }



      // var obj1 = parsedArray[0];
      // var newTitle = obj1.title;
      // var newBody = obj1.body;
      // // console.log(newBody);

        // alert('hi');
    //     debugger;
    //   var gottenItem = localStorage.getItem('userInput');
    //   var parsed = JSON.parse(gottenItem);
    //   var newTitle = parsed.title;
    //   var newBody = parsed.body;
    //   var newId = parsed.id;
    //   var newQuality = parsed.quality;
    //   createIdeaContainer(newTitle, newBody, newQuality);
    });


}); //end of jQuery body
