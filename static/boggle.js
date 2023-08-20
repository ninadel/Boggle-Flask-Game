class BoggleGame {
  constructor(secs = 60) {
    this.secs = secs; // game length
    this.showTimer();

    this.score = 0;
    this.words = new Set();

    // every 1000 msec, "tick"
    this.timer = setInterval(this.tick.bind(this), 1000);

    $(".add-word").on("submit", this.handleSubmit.bind(this));
  }

  updateGameStats() {
    currentScore = this.score;
    // check high score via flask
  }

  // CONSTUCTOR
  // properties: boardContainer, score (0), words (empty set), timerDuration
  // set boardcontainer
  // set score: initialize to 0
  // set word list: initialize to empty
  // METHODS
  // method: show word
  // append valid word to displayed word list
  // method: show message
  // steps: if timer expires, display message about high score and refresh to play again
  // method: handle submit
  // steps: check if valid, adjust format as needed, check if in word list already, Flask API to check submitted word, if valid word display word and update score
  // tick timer
  // method: score game
  // steps: get current game score, Flask API to check high score, update UI accordingly
  // update stats
  async handleSubmit(evt) {
    evt.preventDefault();
    // create a jquery object for the word form input
    const $word = $(".word");
    // get the word entered in the input field
    let word = $word.val();
    // if there's no word
    if (!word) {
      $word.val("").focus();
      return;
    }
    // if word is already in the set
    if (this.words.has(word)) {
      // this.showMessage(`Already found ${word}`, "err");
      $word.val("").focus();
      return;
    }
    const response = await axios.get("/check-word", { params: { word: word } });
    console.log(response["data"]["result"]);
    console.log("handleSubmit", word);
    if ((response["data"]["result"] == "ok") & (this.secs > 0)) {
      $("ul").append($("<li>").append(word));
      this.score += word.length;
      $("#current-score").html(this.score);
      this.words.add(word);
    }
    $word.val("").focus();
  }

  showTimer() {
    $("#timer").text(this.secs);
  }

  /* Tick: handle a second passing in game */

  async tick() {
    this.secs -= 1;
    this.showTimer();

    if (this.secs === 0) {
      clearInterval(this.timer);
      await this.scoreGame();
    }
  }
}

// ('#content ul').append(
//   $('<li>').append(
//       $('<a>').attr('href','/user/messages').append(
//           $('<span>').attr('class', 'tab').append("Message center")
// )));
