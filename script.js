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
                <p contenteditable='true'>${this.body}</p>
            <footer>
                <figure class='upvote'></figure>
                <figure class='downvote'></figure>
                <h6><span class='designation-quality'>quality</span>: ${this.quality}</h6>
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
    var title = $("#title-input").val();
    var body = $("#body-input").val();
    ideaManager.add(title, body);
    $("#title-input").val("");
    $("#body-input").val("");
  });

  $("#body-input").on("keyup", function (key) { //adds new idea when they press enter key
    if (key.which === 13) {
      var title = $("#title-input").val();
      var body = $("#body-input").val();
      ideaManager.add(title, body);
      $("#title-input").val("");
      $("#body-input").val("");
    }
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

  $("#user-ideas").on("keyup keydown click", "h3", function (key) {
    $(this).addClass("editing-input-contenteditable");
    if (key.which === 13) {
      var target = $(this).closest("h3").text();
      var id = $(this).closest(".each-idea-card").attr("id");
      ideaManager.find(id).saveEditableTitle(target);
    }
  });

  $("#user-ideas").on("keyup keydown click", "p", function (key) {
    $(this).addClass("editing-input-contenteditable");
    if (key.which === 13) {
      var target = $(this).closest("p").text();
      var id = $(this).closest(".each-idea-card").attr("id");
      ideaManager.find(id).saveEditableBody(target);
    }
  });

  Idea.prototype.saveEditableTitle = function (target) {
    this.title = target;
    ideaManager.store();
  };

  Idea.prototype.saveEditableBody = function (target) {
    this.body = target;
    ideaManager.store();
  };

  $("#user-ideas").on("blur", "h3", function () {
    $(this).removeClass("editing-input-contenteditable");
    var target = $(this).closest("h3").text();
    var id = $(this).closest(".each-idea-card").attr("id");
    ideaManager.find(id).saveEditableTitle(target);
  });

  $("#user-ideas").on("blur", "p", function () {
    $(this).removeClass("editing-input-contenteditable");
    var target = $(this).closest("p").text();
    var id = $(this).closest(".each-idea-card").attr("id");
    ideaManager.find(id).saveEditableBody(target);
  });

  ideaManager.retrieve();
  ideaManager.render();

}); //end of jQuery body
