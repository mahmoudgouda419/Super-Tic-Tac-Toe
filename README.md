# Super Tic Tac Toe

A browser-based version of **Super Tic Tac Toe**, built using pure HTML, CSS, and JavaScript.

Unlike normal Tic Tac Toe, this version turns the game into a much more strategic experience. Instead of one board, you play on **9 connected boards**, and every move affects where your opponent can play next.

🔗 Play here:  
https://mahmoudgouda419.github.io/Super-Tic-Tac-Toe/

🎥 If you’ve never heard about the game before, this Vsauce short explains it really well:  
https://www.youtube.com/shorts/_Na3a1ZrX7c

---

# About the Game

Super Tic Tac Toe is basically:
- Tic Tac Toe
- inside Tic Tac Toe

You play on a large board made of 9 smaller boards.

The interesting part is:
- the cell you choose determines
- which board your opponent must play on next

So every move is important not only for the current board, but also for controlling your opponent’s future moves.

That’s what makes the game surprisingly strategic compared to regular XO.

---

# How to Play

- Player **X** starts first
- You can play anywhere on the first turn
- The position you choose sends your opponent to a specific mini board
- If that mini board is already won or full, the opponent can play anywhere

To win:
- first win mini boards
- then get 3 large boards in a row

Just like classic Tic Tac Toe, but on a much bigger scale.

---

# Features

- Fully playable in the browser
- Responsive layout for desktop and mobile
- Turn indicator and game status
- Detects wins and draws
- Reset button for restarting games
- Clean and minimal UI
- Built without any libraries or frameworks

---

# Project Structure

```text
index.html   -> Main structure and board layout
styles.css   -> Styling and responsive design
main.js      -> Game logic and interactions
```

---

# Built With

## HTML
Used for:
- board structure
- layout
- UI elements

## CSS
Used for:
- responsive design
- board styling
- layout system
- hover effects

## JavaScript
Handles:
- turns
- move validation
- board restrictions
- winner detection
- draw logic
- reset functionality

Everything was built using vanilla JavaScript without external libraries.

---

# Challenges

The hardest part was handling the board restriction system correctly.

Every move changes where the next player is allowed to play, which means:
- tracking active boards
- checking completed boards
- handling edge cases
- synchronizing UI updates

became much more complex than a normal Tic Tac Toe game.

---

# Future Improvements

Some ideas planned for future versions:

- AI opponent
- Better animations
- Winning line effects
- Sound effects
- Online multiplayer
- Match history
- More themes and customization

Dark mode has already been added.

---

# What I Learned

This project helped me practice:
- DOM manipulation
- game state management
- JavaScript logic
- responsive web design
- structuring larger frontend projects

It also taught me how much depth simple game mechanics can have when combined together.

---

# Run Locally

Clone the repository:

```bash
git clone https://github.com/your-username/Super-Tic-Tac-Toe.git
```

Then simply open:

```text
index.html
```

inside any browser.

No setup or installation required.

---

# License

Feel free to:
- use
- modify
- improve
- or experiment with the project

Credit is appreciated.

