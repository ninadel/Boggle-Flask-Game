from flask import Flask, request, render_template, jsonify, session
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle


app = Flask(__name__)
app.config["SECRET_KEY"] = "fdfgkjtjkkg45yfdb"
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def home_page():
    """initialize a new game and set up game stats"""
    board = boggle_game.make_board()
    session['board'] = board
    # if there's already a running game count, increment the count
    if session.get('game-count') is not None:
        session['game-count'] = session['game-count'] + 1
    else:
        session['game-count'] = session.get('game-count', 0)
    session['high-score'] = session.get('high-score', 0)
    return render_template("index.html", board=board, high_score=session['high-score'], game_count=session['game-count'])

# route to get board
@app.route('/get-board')
def get_current_board():
    """api for front-end to access current game board"""
    board = session['board']
    result = {"board": board}
    return jsonify(result)

# route to check word
# need check_valid_word method on boggle_game object
# with board and word as arguments
@app.route('/check-word')
def check_word():
    """Check if word is in dictionary."""

    word = request.args["word"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)

    return jsonify({'result': response})

# route to check score
# receives last game score from front end, checks against session high score
# if new high score, return new high score boolean, high score value
# update high score and game count in session
@app.route('/check-score')
def check_score():
    """check game score against high score"""
    score = int(request.args["score"])
    # data = request.get_json(silent=True)
    # score = int(data.get('score'))
    high_score = int(session.get('high-score', 0))
    result = {'result': score > high_score}
    return jsonify(result)
