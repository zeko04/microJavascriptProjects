let origBoard;
const huPlayer = "O";
const aiPalayer = 'X';
//all combos for win
const winCombos =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [6, 4, 2],
    [0, 4, 8]
]
//select all cells on board
const cells = document.querySelectorAll('.cell');

startGame();

function startGame(){
    document.querySelector('.endgame').style.display = "none";
    origBoard = Array.from(Array(9).keys()); //populates array with key values 0-8 [0:0, 1:1] and so on
    //adds click event listener on every cell and removes background of win combinatio
    for(let i = 0; i < cells.length; i++){
        cells[i].innerText = "";
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square){
    if(typeof origBoard[square.target.id] === 'number'){
        turn(square.target.id, huPlayer);
        if(!checkTie())  turn(bestSpot(), aiPalayer)
    }
    
}

function turn(squareId, player){
    //add O to clicked id of squer
    origBoard[squareId] = player;
    //set 0 for text of squer
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if(gameWon) gameOver(gameWon);
}

function checkWin(board, player){
    //creates array of playes wher player clicked
    let playes= board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;

    for (let [index, win] of winCombos.entries()){
        if(win.every(elem => playes.indexOf(elem) > -1)){
            gameWon = {index: index, player: player}
            break;
        }
    }

    return gameWon;
}

function gameOver(gameWon){
    for(let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "blue" : "red";
    }

    for(let i = 0; i < cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWiner(gameWon.player == huPlayer ? "You win" : "You loose");
}

function declareWiner(who){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

function emptySquares(){
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
    return emptySquares()[0];
}

function checkTie(){
    if(emptySquares().length == 0){
        for(let i = 0; i < cells.length; i++){
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWiner("Tie Game");
        return true;
    }
    return false;
}