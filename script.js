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
            <h3 contenteditable='true' class='content'>${this.title}</h3>
            <figure class='delete' id='delete'></figure>
        </header>
        <p contenteditable='true' class='content'>${this.body}</p>
        <footer>
          <figure class='upvote' id='upvote'></figure>
          <figure class='downvote' id='downvote'></figure>
          <h6 class='content'><span class='designation-quality'>quality</span>: ${this.quality}</h6>
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
    },

    render: function () {
      $userIdeas.html("");
      for (var i = 0; i < this.ideaArray.length; i++) {
        var idea = this.ideaArray[i];
        $userIdeas.prepend(idea.toHTML());
      }
    },

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
    },

    remove: function (id) {
      id2 = parseInt(id);
      this.ideaArray = this.ideaArray.filter(function (idea) {
        return idea.id !== id;
      });
      this.store();
    },
  }; // end of ideaManager

  function clearInputFields() {
    $titleInput.val('');
    $bodyInput.val('');
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
     } else if (this.id === "downvote") {
      find.downvote();
     } else if (this.id === "delete") {
      find.remove();
    }
  });

  Idea.prototype.upvote = function () {
    var quality = this.quality;
    if (quality === "swill") {
      this.quality = "plausible";
      this.image = "images/thinking.png";
      } else if (quality === "plausible") {
      this.quality = "genius";
      this.image = "images/light-bulb.jpg";
    }
    ideaManager.store();
  };

  Idea.prototype.downvote = function () {
    var quality = this.quality;
    if (quality === "genius") {
      this.quality = "plausible";
      this.image = "images/thinking.png";
      } else if (quality === "plausible") {
      this.quality = "swill";
      this.image = "images/pig.png";
    }
    ideaManager.store();
  };

  $userIdeas.on("keyup keydown click", "h3, p", function (key) {
    var id = $(this).closest(".each-idea-card").attr("id");
    $(this).addClass("editing-input-contenteditable");
    if (key.which === 13) {
      if (event.target.nodeName === "H3") {
        var targetH3 = $(this).closest("h3").text();
        ideaManager.find(id).saveEditableTitle(targetH3);
        } else if (event.target.nodeName === "P") {
        var targetP = $(this).closest("p").text();
        ideaManager.find(id).saveEditableBody(targetP);
      }
    }
  });

  $userIdeas.on("blur", "h3, p", function () {
    var id = $(this).closest(".each-idea-card").attr("id");
    $(this).removeClass("editing-input-contenteditable");
    if (event.target.nodeName === "H3") {
      var targetH3 = $(this).closest("h3").text();
      ideaManager.find(id).saveEditableTitle(targetH3);
      } else if (event.target.nodeName === "P") {
      var targetP = $(this).closest("p").text();
      ideaManager.find(id).saveEditableBody(targetP);
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

  $searchInput.on("keyup", function () {
    var search = $(this).val();
    $("h3:contains('" + search + "')").closest(".each-idea-card").show();
    $("h3:not(:contains('" + search + "'))").closest(".each-idea-card").hide();
    $("p:contains('" + search + "')").closest(".each-idea-card").show();
  });

  ideaManager.retrieve();
  ideaManager.render();
});
