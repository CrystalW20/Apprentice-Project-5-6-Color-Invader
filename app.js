const [Grey, Red, Yellow, Orange, Blue] = [0, 1, 2, 3, 4];
const colors = ['grey', 'red', 'yellow', 'orange', 'blue'];
// Game Play Model

let counter = 100;
let board = randomizeBoard();
let gameStatus = 'ongoing'; // values can be: ongoing, userWon, gameOver

const gameBoard = document.getElementById('game-board');

const isEnemy = cell => {
    if (cell !== Grey) {
        return true;
    } else {
        return false;
    }
};
const adjacentCoordinates = (coordinates, width, height) => {
    let x = coordinates[0];
    let y = coordinates[1];
    if (x === 0 && y === 0) {
        return [[0, 1], [1, 0]];
    } else if (x + 1 === width && y + 1 === height) {
        return [[x - 1, y], [x, y - 1]];
    } else if (y === 0 && x+1 === width) {
        return [[x-1, 0], [x, 1]];
    } else if (x > 0 && x < width && y === 0) {
        return [[x + 1, 0], [x, 1], [x - 1, 0]];
    } else if (x === 0 && y+1 === height) {
        return [[0, y - 1], [1, y]];
    } else if (x === 0 && y < height) {
        return [[0, y - 1], [1, y], [0, y + 1]];
    } else if (x < width && y + 1 === height) {
        return [[x - 1, y], [x, y - 1], [x + 1, y]];
    } else if (y > 0 && y < height && x + 1 === width) {
        return [[x, y - 1], [x, y + 1], [x - 1, y]];
    } else {
        return [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
    }
};
const isBoardComplete = board =>
    board.every(row => row.every(el => el === Grey));

const changeAdjacentCellsRecursively = (board, x, y, clickedColor) => {
    let coordinatepairs = adjacentCoordinates(
        [x, y],
        board[0].length,
        board.length
    );
    for (let coordinatepair of coordinatepairs) {
        let [adjx, adjy] = coordinatepair;
        if (board[adjy][adjx] === clickedColor) {
            board[adjy][adjx] = Grey;
            changeAdjacentCellsRecursively(board, adjx, adjy, clickedColor);
        }
    }
    return;
};

const generateNewBoard = (clickedColor, oldBoard) => {
    for (let i = 0; i < oldBoard.length; i++) {
        let row = oldBoard[i];
        for (let j = 0; j < row.length; j++) {
            let cell = row[j];
            if (cell === Grey) {
                let x = j;
                let y = i;
                changeAdjacentCellsRecursively(oldBoard, x, y, clickedColor);
            }
        }
    }
    return oldBoard;
};

// Create board
createBoard(board);
function createBoard(board){
    let table = '<table>';
    for(let row of board){
        table += '<tr>';
        for(let cell of row) {
            `square--${colors[cell]}`
            table += `<td class ="square--${colors[cell]} " > </td>`;
        }
        table += `</tr>`;
    }
    table += '</table>';
    gameBoard.innerHTML = table;
}


// Randomize the board

function randomizeBoard(){
     let rowMax = 32;
     let columnMax=20;
     let gameBoard = [];
     for (let i = 0; i <rowMax; i++){
         gameBoard.push([]) ;
         for(let j = 0; j < columnMax; j++){
             gameBoard[i][j] = _.sample([1,2,3,4])
         }
     }
     gameBoard[0][0] = 0; // Top left should aways be Grey
        return gameBoard;
 }



// Game Play controller

function invader(clickedColor){
    board = generateNewBoard(clickedColor,board);
    createBoard(board);
    counter -= 1;
    isGameOver();
}
function isGameOver() {
    let isComplete = isBoardComplete(board);
    if(isComplete){
        return gameStatus = alert('userWon');
    } else if(!isComplete && counter == 0) {
        return gameStatus= alert('gameOver');
    } else {
        return gameStatus = 'ongoing';
    }
}

 // Listening for Button clicks


document.getElementById("enemy-listener").addEventListener("click", function(){
    let clickedColor;
    clickedColor= event.target.textContent;
     invader(translateEnemyColor(clickedColor));
    document.getElementById("counter").textContent = counter; // Update Counter display


});

// Translate Enemy color string to number
function translateEnemyColor(colorString) {
    switch(colorString){
        case "Red":
            return 1;
        case "Yellow":
            return 2;
        case "Orange":
            return 3;
        case "Blue":
            return 4;
    }
}



//
// function onTimerTick() {
//     isBoardComplete(generateNewBoard(clickedColor, randomizeBoard()));
//     // return oldBoard
// }



















