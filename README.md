# Super-Tic-Tac-Toe
Super Tic Tac Toe

This is an advanced twist on the classic Tic Tac Toe (XO). Instead of one small board, you play on 9 mini boards inside a big one. Each move you play decides the board where your opponent must play next, making the game way more strategic and fun.

Play it here: [Super Tic Tac Toe](https://mahmoudgouda419.github.io/Super-Tic-Tac-Toe/)
And this is a video that got 36 million views for Vsauce explaining the game https://www.youtube.com/shorts/_Na3a1ZrX7c.

Project Structure:
index.html → The main page and board layout.
styles.css → The design and responsive layout (works on mobile and desktop).
main.js → The full game logic (turns, winners, ties, reset).

How to Play:
Player X starts by placing a mark in any cell.
The cell you choose decides the next board your opponent must play on.
If that board is already full or finished, the opponent can play anywhere.
The first player to win 3 big boards in a row (like classic Tic Tac Toe) wins the game.

There’s also a status panel that shows:
Whose turn is it?
Which board must they play on?
Winner/Draw messages.

Built With:
HTML for the board and structure.
CSS for the design and responsiveness.
Vanilla JavaScript.
Tried to keep the code as simple and readable as possible.
Added a reset option for quick restarts.
Added text to explain how to play it.

What’s Missing:
No AI, it’s a 2-player only game for now.
No game save (refresh = restart).
No animations in this version (kept it clean and simple).

Future Ideas:
Dark/Light mode.
Add some smooth animations (like drawing the winning line).
AI opponent for solo play.
Simple sound effects for better feedback.

Run It:
Just open index.html in any modern browser, or play directly online from the link above.

License:
Feel free to use, edit, or improve the code however you like. Mentioning the source would be nice.
