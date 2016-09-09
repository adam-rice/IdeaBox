$(document).ready(function () {

  var $titleInput = $("#title-input").val();
  var $bodyInput = $("#body-input").val();
  var $saveButton = $("#save-button");

  var $userIdeas = $("#user-ideas"); //the container for ideas, static in DOM

  function Idea (title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || "swill";
  }

  Idea.prototype.toHTML = function () {
    return $(`
        <section class='each-idea-card' id=${this.id}>
            <header>
                <h3 contenteditable='true'>${this.title}</h3>
                <figure class='delete'></figure>
            </header>
                <p>${this.body}</p>
            <footer>
                <figure class='upvote'></figure>
                <figure class='downvote'></figure>
                <h6><span class='designation-quality'>quality</span>:${this.quality}</h6>
            </footer><hr>
        </section>
    `);
  };

  Idea.prototype.remove = function () {
    ideaManager.remove(this.id);
  };

  var ideaManager = {

    ideaArray: [],

    add: function (title, body) {
      this.ideaArray.push(new Idea(title, body));
      this.store();

    },

    find: function (id) {
      var id2 = parseInt(id);
      var foundIdea;
      for (var i = 0; i < this.ideaArray.length; i++) {
        if (this.ideaArray[i].id === id2) {
          foundIdea = this.ideaArray[i];
          break;
        }
      }
      return foundIdea;
    }, // end of find function

    render: function () {
      $("#user-ideas").html("");
      for (var i = 0; i < this.ideaArray.length; i++) {
        var idea = this.ideaArray[i];

        $("#user-ideas").prepend(idea.toHTML());
      }
    }, // end of render function

    store: function () {
      localStorage.setItem("ideas", JSON.stringify(this.ideaArray));
      this.render();
    },

    retrieve: function () {
      var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));
      if (retrievedIdeas) {
        for (var i = 0; i < retrievedIdeas.length; i++) {
          var idea = retrievedIdeas[i];
          this.ideaArray.push(new Idea(idea.title, idea.body, idea.id, idea.quality));
        }
      }
    }, // end of retrieve function

    remove: function (id) {
      id2 = parseInt(id);
      this.ideaArray = this.ideaArray.filter(function (idea) {
        return idea.id !== id;
      });
      this.store();
    },

  }; // end of ideaManager

  $saveButton.on("click", function (event) { //when they click on save
    // event.preventDefault();
    var title = $("#title-input").val();
    var body = $("#body-input").val();
    ideaManager.add(title, body);
    saveEditableField();
    $("#title-input").val("");
    $("#body-input").val("");
  });

  $("#user-ideas").on("click", ".delete", function () { //when they click on delete to remove an idea
    var id = $(this).closest(".each-idea-card").attr("id");
    ideaManager.find(id).remove();
  });

  $("#user-ideas").on("click", ".upvote", function () {
    var id = $(this).closest(".each-idea-card").attr("id");
    ideaManager.find(id).upvote();
  });

  $("#user-ideas").on("click", ".downvote", function () {
    var id = $(this).closest(".each-idea-card").attr("id");
    ideaManager.find(id).downvote();
  });

  Idea.prototype.upvote = function () {
    if (this.quality === "swill") {
      this.quality = "plausible";
    }
    else if (this.quality === "plausible") {
      this.quality = "genius";
    }
      ideaManager.store();
  }; //end of upvote

  Idea.prototype.downvote = function () {
    if (this.quality === "genius") {
      this.quality = "plausible";
    }
    else if (this.quality === "plausible") {
      this.quality = "swill";
    }
    ideaManager.store();
  }; //end of downvote

  $("#user-ideas").on("keyup keydown click", "h3", function () {
    $(this).addClass("editing-input-contenteditable");
  });

  function saveEditableField() {
    
  }

  //look up blur to solve issue when user clicks out of editable text box

  ideaManager.retrieve();
  ideaManager.render();

  //
  //
  //
  //
  // function objectify(newIdea) {
  //   var obj = {};
  //   obj.title = newIdea.title;
  //   obj.body = newIdea.body;
  //   obj.id = newIdea.id;
  //   obj.quality = newIdea.quality;
  //   return obj;
  // }
  //
  // function arrayify(newObject) {
  //   pageArr.push(newObject);
  //   return pageArr;
  // }
  //
  // function toLocalStorage(pageArr) {
  //   var stringifiedArray = JSON.stringify(pageArr);
  //   localStorage.setItem('newArray', stringifiedArray);
  // }
  //
  // function clearInputFields() {
  //     $("#title-input").val("");
  //     $("#body-input").val("");
  //    }
  //
  // $(window).on("load", function() {
  //   var restoredData = fromLocalStorage();
  //   putDataBackOnPage(restoredData);
  //   });
  //
  //
  // function fromLocalStorage() {
  //   var restoredArray = localStorage.getItem('newArray');
  //   return JSON.parse(restoredArray);
  // }
  //
  // function putDataBackOnPage(restoredData) {
  //   for (var i = 0; i < restoredData.length; i++) {
  //     var title = restoredData[i].title;
  //     var body = restoredData[i].body;
  //     var id = restoredData[i].id;
  //     var quality = restoredData[i].quality;
  //     var newIdea = new Idea(title, body, id, quality);
  //     var newIdeaText = newIdea.createNewIdeaInstance();
  //     $("#user-ideas").prepend(newIdeaText);
  //   }
  // }
  //
  // $("#user-ideas").on("click", ".delete", function() {
  //   var targetToGetRidOf = $(this).closest(".each-idea-container");
  //   var idOfTarget = parseInt(targetToGetRidOf.attr("id"));
  //   getRidOfBadIdea(idOfTarget);
  //   // targetToGetRidOf.remove(); //need to comment back in when done harder function
  //   });
  //
  //   function getRidOfBadIdea(idOfTarget) {
  //     var restored = JSON.parse(localStorage.getItem('newArray'));
  //     for (var i = 0; i < restored.length; i++) {
  //
  //     }
  //   }
  //
  //   $("#user-ideas").on("click", ".upvote", function() {
  //     //also depends on solving id problem!
  //   });
  //
  //



//     $("#user-ideas").on("click", "#delete", function() {
//     //   $(this).parent().parent().remove();
//         var targetToGetRidOf = $(this).closest("#user-ideas");
//         console.log(targetToGetRidOf);
//
//       removeIdeaFromArray();
//       });
//
//     function removeIdeaFromArray() {
//       var gottenArray = localStorage.getItem('array');
//       var parsedArray = JSON.parse(gottenArray);
//       parsedArray.splice(1, 1);
//       // console.log(parsedArray[1]);
//     }
//
//     function clearInputFields() {
//         $("#title-input").val("");
//         $("#body-input").val("");
//     }
//
//
//
//
//
//       //   $("#title-input, #body-input").on("keyup keydown", function(key) { //the function to activate idea when user presses enter
//       //     debugger;
//       //     var $titleInput = $("#title-input").val();
//       //     var $bodyInput = $("#body-input").val();
//       //     if (key.which === 13) { // the enter key
//       //       transferIdeaToBottom($titleInput, $bodyInput);
//       //     }
//       // });
//
//
//       // var obj1 = parsedArray[0];
//       // var newTitle = obj1.title;
//       // var newBody = obj1.body;
//       // // console.log(newBody);
//
//         // alert('hi');
//     //     debugger;
//     //   var gottenItem = localStorage.getItem('userInput');
//     //   var parsed = JSON.parse(gottenItem);
//     //   var newTitle = parsed.title;
//     //   var newBody = parsed.body;
//     //   var newId = parsed.id;
//     //   var newQuality = parsed.quality;
//     //   createIdeaContainer(newTitle, newBody, newQuality);
//     });
//
//
}); //end of jQuery body
