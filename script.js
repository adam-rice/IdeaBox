var $titleInput = $("#title-input");
var $bodyInput = $("#body-input");
var $saveButton = $("#save-button");
var $searchInput = $("#search-input");
var $userIdeas = $("#user-ideas");

$(document).ready(function () {

  function Idea (title, body, id, quality, image) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || "swill";
    this.image = image || "images/pig.png";
  }

  Idea.prototype.toHTML = function () {
    return $(`
        <section class='each-idea-card' id=${this.id}>
            <header>
                <h3 contenteditable='true'>${this.title}</h3>
                <figure class='delete' id='delete'></figure>
            </header>
                <p contenteditable='true'>${this.body}</p>
            <footer>
                <figure class='upvote' id='upvote'></figure>
                <figure class='downvote' id='downvote'></figure>
                <h6><span class='designation-quality'>quality</span>: ${this.quality}</h6>
                <img src=${this.image} class='rating-img' />
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
      id = parseInt(id);
      return this.ideaArray.find(function (idea) {
        return idea.id === id;
      });
    }, // end of find function

    render: function () {
      $userIdeas.html("");
      for (var i = 0; i < this.ideaArray.length; i++) {
        var idea = this.ideaArray[i];

        $userIdeas.prepend(idea.toHTML());
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
          this.ideaArray.push(new Idea(idea.title, idea.body, idea.id, idea.quality, idea.image));
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

  function clearInputFields() {
    $titleInput.val("");
    $bodyInput.val("");
  }

  function addUserInputToIdeaManager() {
    ideaManager.add($titleInput.val(), $bodyInput.val());
  }

  $saveButton.on("click", function () {
    addUserInputToIdeaManager();
    clearInputFields();
  });

  $bodyInput.on("keyup", function (key) {
    if (key.which === 13) {
      addUserInputToIdeaManager();
      clearInputFields();
    }
  });

  $userIdeas.on("click", ".delete, .upvote, .downvote", function (event) {
    var id = $(this).closest(".each-idea-card").attr("id");
    var find = ideaManager.find(id);
    if (this.id === "upvote") {
      find.upvote();
    }
    else if (this.id === "downvote") {
      find.downvote();
    }
    else if (this.id === "delete") {
      find.remove();
    }
  }); // end of click, delete, and upvote function

  Idea.prototype.upvote = function () {
    var quality = this.quality;
    if (quality === "swill") {
      this.quality = "plausible";
      this.image = "images/thinking.png";
    }
    else if (quality === "plausible") {
      this.quality = "genius";
      this.image = "images/light-bulb.jpg";
    }
      ideaManager.store();
  }; //end of upvote

  Idea.prototype.downvote = function () {
    var quality = this.quality;
    if (quality === "genius") {
      this.quality = "plausible";
      this.image = "images/thinking.png";
    }
    else if (quality === "plausible") {
      this.quality = "swill";
      this.image = "images/pig.png";
    }
    ideaManager.store();
  }; //end of downvote

  $userIdeas.on("keyup keydown click", "h3, p", function (key) {
    var target = $(this).closest("h3").text();
    var id = $(this).closest(".each-idea-card").attr("id");
    $(this).addClass("editing-input-contenteditable");
    if (key.which === 13) {
      if (event.target.nodeName === "H3") {
        ideaManager.find(id).saveEditableTitle(target);
      }
      else if (event.target.nodeName === "P") {
        ideaManager.find(id).saveEditableBody(target);
      }
    } // end of big "enter" if statement
  }); //end of keyup keydown click function

  Idea.prototype.saveEditableTitle = function (target) {
    this.title = target;
    ideaManager.store();
  };

  Idea.prototype.saveEditableBody = function (target) {
    this.body = target;
    ideaManager.store();
  };

  $userIdeas.on("blur", "h3, p", function () {
    var target = $(this).closest("h3").text();
    var id = $(this).closest(".each-idea-card").attr("id");
    $(this).removeClass("editing-input-contenteditable");
    if (event.target.nodeName === "H3") {
      ideaManager.find(id).saveEditableTitle(target);
    }

  });

  $userIdeas.on("blur", "p", function () {
    $(this).removeClass("editing-input-contenteditable");
    var target = $(this).closest("p").text();
    var id = $(this).closest(".each-idea-card").attr("id");
    ideaManager.find(id).saveEditableBody(target);
  });

  $searchInput.on("keyup", function () {
    var search = $(this).val().trim();
    $("h3:contains('" + search + "')").closest(".each-idea-card").show();
    $("h3:not(:contains('" + search + "'))").closest(".each-idea-card").hide();
  });

  $searchInput.on("keyup", function () {
    var search = $(this).val().trim();
    $("p:contains('" + search + "')").closest(".each-idea-card").show();
  });

  ideaManager.retrieve();
  ideaManager.render();

}); //end of jQuery body
