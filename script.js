$(document).ready(function () {

    var pageArr = [];
    var $titleInput = $("#title-input").val();
    var $bodyInput = $("#body-input").val();

  function Idea(title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.quality = "swill";
  this.id = Date.now();
  }

  Idea.prototype.createNewIdeaInstance = function () {
    return `
        <section class='each-idea-container' id=${this.id}>
            <header>
                <h3>${this.title}</h3>
                <figure class='delete'></figure>
            </header>
                <p>${this.body}</p>
            <footer>
                <figure class='upvote'></figure>
                <figure class='downvote'></figure>
                <h6><span class='designation-quality'>quality</span>:${this.quality}</h6>
            </footer><hr>
        </section>
    `
  };

  $("#save-button").click(function () {
    var $titleInput = $("#title-input").val();
    var $bodyInput = $("#body-input").val();
    var newIdea = new Idea($titleInput, $bodyInput);
    var newIdeaText = newIdea.createNewIdeaInstance();
    $("#user-ideas").prepend(newIdeaText);
    var newObject = objectify(newIdea);
    pageArr = arrayify(newObject);
    toLocalStorage(pageArr);
    clearInputFields();
  });

  function objectify(newIdea) {
    var obj = {};
    obj.title = newIdea.title;
    obj.body = newIdea.body;
    obj.id = newIdea.id;
    obj.quality = newIdea.quality;
    return obj;
  }

  function arrayify(newObject) {
    pageArr.push(newObject);
    return pageArr;
  }

  function toLocalStorage(pageArr) {
    var stringifiedArray = JSON.stringify(pageArr);
    localStorage.setItem('newArray', stringifiedArray);
  }

  function clearInputFields() {
      $("#title-input").val("");
      $("#body-input").val("");
     }

  $(window).on("load", function() {
    var restoredData = fromLocalStorage();
    putDataBackOnPage(restoredData);
    });


  function fromLocalStorage() {
    var restoredArray = localStorage.getItem('newArray');
    return JSON.parse(restoredArray);
  }

  function putDataBackOnPage(restoredData) {
    for (var i = 0; i < restoredData.length; i++) {
      var title = restoredData[i].title;
      console.log(title);
    }
  }

  $("#user-ideas").on("click", ".delete", function() {

    });


    // $(window).on("load", function() {
   //       var gottenArray = localStorage.getItem('array');
   //       var parsedArray = JSON.parse(gottenArray);
   //       for (var i = 0; i < parsedArray.length; i++) {
   //         var obj = parsedArray[i];
   //         var newTitle = parsedArray[i].title;
   //         var newBody = parsedArray[i].body;
   //         var newId = parsedArray[i].id;
   //         var newQuality = parsedArray[i].quality;
   //         createIdeaContainer(newTitle, newBody, newQuality);
   //       }

    //   var gottenItem = localStorage.getItem('userInput');
    //   var parsed = JSON.parse(gottenItem);
    //   var newTitle = parsed.title;
    //   var newBody = parsed.body;
    //   var newId = parsed.id;
    //   var newQuality = parsed.quality;
    //   createIdeaContainer(newTitle, newBody, newQuality);
    //   clearInputFields();
    // }

//     function createIdeaContainer(newTitle, newBody, newQuality) {
//
//         $("#user-ideas").prepend();
//     }
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
