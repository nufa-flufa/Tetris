'use strict'

const PIECES = [Z, I, L, S, O, T, J]



function drawRndShape(){
    var rndNum1 = getRandomInt(0, PIECES.length)
    var rndNum2 = getRandomInt(0,PIECES[rndNum1].length)
    var rndColor = getRandomColor()
    var currPiece = createPiece(PIECES[rndNum1][rndNum2], rndColor)
    return currPiece
}

function createPiece(tetromino, color) {
    return {
        tetromino,
        color,
        y: -1,    //the location on the board vertically
        x: 6    // the location on the board horizontally
    }
}

function renderShape(shape, state) {
    var color = (state === 'fill') ? shape.color : EMPTY
    for (var i = 0; i < shape.tetromino.length; i++) {
        for (var j = 0; j < shape.tetromino.length; j++) {
            if (shape.tetromino[i][j]) {
                drawSquare(shape.x + i, shape.y + j, color)
            }
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
    var symbols = '0123456789ABCDEF'
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += symbols[getRandomInt(0, symbols.length)]
    }
    return color;
}