class BoggleGame {
  constructor(timerDuration = 60) {
    this.timerDuration = timerDuration;
    this.words = new Set();
    this.score = 0;
    this.playing = true;
    // create form and append to webpage
    // add a submit handler on form
    $(".add-word", this.board).on("submit", this.handleSubmit.bind(this));
  }

  checkWord() {
    // if valid input, check if duplicate
    // if not duplicate, talk to flask API to check word
    // if valid word, update list, calculate and update score
  }

  toggleMessage(message, display = true) {}

  updateTimer() {
    // update displayed time on webpage
    // end game if timer is expired
  }

  endGame() {
    // disable event handlers if timer is
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
    const $word = $(".word", this.board);
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
    if (response["data"]["result"] == "ok") {
      $("ul").append($("<li>").append(word));
      this.score += word.length;
      $("#current-score").html(this.score);
      this.words.add(word);
    }
    $word.val("").focus();
  }
}

// ('#content ul').append(
//   $('<li>').append(
//       $('<a>').attr('href','/user/messages').append(
//           $('<span>').attr('class', 'tab').append("Message center")
// )));
