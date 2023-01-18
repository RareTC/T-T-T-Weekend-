/*----- constants -----*/
const COLORS = {
    'null': 'white',
    '1': 'red',
    '-1': 'blue'
}
const SHAPE = {
    'null' : '',
    '1': 'X',
    '-1': 'O'
};
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*----- state variables -----*/
let board; 
let turn; 
let winner ; 


/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const moveMadeEl = [...document.querySelectorAll('#board > div')];

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', moveMade);
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init ();
//this initializes all state then renders the state to visualize in the DOM
function init () {  
    board =  [null, null, null, null, null, null, null, null ,null];
    turn = 1;
    winner = null;
    render ();
}

//this visualizes all state in the DOM at current 
function render () {
    renderBoard ();
    renderMessage (); //who's turn is it
    renderControls ();//hide/show UI (the button)

}


function renderBoard () {
    board.forEach(function(val, idx) {
        if (val !== 0) {
            const divEl = document.getElementById(`${idx}`);
            divEl.textContent = SHAPE [val];
        }
    });
}
function renderMessage () {
    if (winner === 'T') {
        messageEl.innerText = "YOU TIED!"
    } else if (winner) {
        messageEl.innerHTML = `<span style= "color: ${COLORS[winner]}">${SHAPE[winner]}</span> WINS!`;
    } else {
        messageEl.innerHTML = `<span style= "color: ${COLORS[turn]}">${SHAPE[turn]}</span>'s Turn`;
    }
}
function renderControls () {
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}

//in response to click, update move made then call render
function moveMade(evt) {
    const idx = evt.target.id;
    if (board[idx] !== null || winner) return;
    if (idx === 1) return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render ();
}


function getWinner(moveMade) {
    for (let i = 0; i < winningCombos.length; i++) {
      if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
    } if (board.includes(null)) return null;
    return 'T';
  }
