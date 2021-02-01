'use strict'

console.log('hello')

const EMPTY = 'white' //color of empty square
const SQAURE_SIZE = 20; // px of sqaures

var gCanvas = document.querySelector('canvas');
var gCanvas_ctx = gCanvas.getContext("2d")
var gMat = createMat(14, 28)

function drawBoard() {
    var board = createMat(14, 28)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            drawSquare(i, j, board[i][j])
        }
    }
    // drawSquare(5,0,'black')
    return board
}

function drawSquare(i, j, color) {
    gCanvas_ctx.fillStyle = color;
    gCanvas_ctx.fillRect(i * SQAURE_SIZE, j * SQAURE_SIZE, SQAURE_SIZE, SQAURE_SIZE)
    gCanvas_ctx.strokeStyle='darkgray'
    gCanvas_ctx.strokeRect(i * SQAURE_SIZE, j * SQAURE_SIZE, SQAURE_SIZE, SQAURE_SIZE)
}

function createMat(ROWS, COLS) {
    var mat = [];
    for (var i = 0; i < ROWS; i++) {
        mat[i] = [];
        for (var j = 0; j < COLS; j++) {
            mat[i][j] = EMPTY
        }
    }
    return mat;
}