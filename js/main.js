'use strict'

var gCurrShape;
var gScore = 0;
var gShapeInterval;
var gStopWatch;
var gIsThereCollision;
var gBoard


function init() {
    gScore = 0
    clearInterval(gShapeInterval)
    gBoard = drawBoard()
    gCurrShape = drawRndShape()
    gShapeInterval = setInterval(moveShape, 1000);
    gStopWatch = setInterval(stopWatch, 1000)
}

function restart() {
    init()
    gScore = 0;
    gSeconds = 0;
    gDisplaySec = 0;
    gMinutes = 0;
    gDisplayMin = 0;
    gIsThereCollision = false;
    var elModal = document.querySelector('.game-over-modal')
    elModal.style.display = 'none';
    var elScore = document.querySelector('.score')
    elScore.innerText = gScore
    var elStopWatch = document.querySelector('.timer')
    elStopWatch.innerHTML = `${gDisplayMin}${gMinutes}:${gDisplaySec}${gSeconds}`
}


function moveShape() {
    var gIsThereCollision = checkIsCollision(gCurrShape, 0, 1)
    if (!gIsThereCollision) {
        renderShape(gCurrShape, '')
        gCurrShape.y++
        renderShape(gCurrShape, 'fill')
    } else {
        lockShape()
        gCurrShape = drawRndShape()
    }
}

function lockShape() {
    gScore++
    var currTet = gCurrShape.tetromino
    for (var i = 0; i < currTet.length; i++) {
        for (var j = 0; j < currTet[0].length; j++) {
            if (!currTet[i][j]) continue;
            if (gCurrShape.y + i < 0) {
                gameOver()
            }
            gBoard[gCurrShape.x + i][gCurrShape.y + j] = gCurrShape.color
            for (var r = 0; r < gBoard[0].length; r++) {
                var isFullRow = false;
                isFullRow = isRowFull(r)
                if (isFullRow) {
                    deleteLine(r)
                }

            }
        }
    }
    var elScore = document.querySelector('.score')
    elScore.innerText = gScore
}

function checkIsCollision(shape, x, y) {
    var tetromino = shape.tetromino

    for (var i = 0; i < tetromino.length; i++) {
        for (var j = 0; j < tetromino.length; j++) {
            var nextLocation = {
                x: shape.x + i + x,
                y: shape.y + j + y
            }

            if (!tetromino[i][j]) continue;
            if (gBoard[nextLocation.x][nextLocation.y] !== EMPTY) return true;
            else if (nextLocation.x < 0 ||
                nextLocation.x >= gBoard.length ||
                nextLocation.y >= gBoard[0].length) return true;
            else if (nextLocation.y < 0) gameOver()

        }
    }
    return false;
}


function deleteLine(line) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j <= line; j++) {
            drawSquare(i, 0, EMPTY)
            gBoard[i][0] = EMPTY
            drawSquare(i, j, gBoard[i][j - 1])
            gBoard[i][j] = gBoard[i][j - 1]
            console.log(gBoard)
        }

    }
    gScore += 100
    var elScore = document.querySelector('.score')
    elScore.innerText = gScore
}

function isRowFull(colIdx) {
    var sumCol = 0
    for (var i = 0; i < gBoard.length; i++) {
        var currCol = gBoard[i][colIdx];
        if (currCol !== EMPTY) {
            sumCol++
        }
    }
    if (sumCol === 14) return true;
    else return false;
}

function gameOver() {
    gIsThereCollision = true;
    clearInterval(gShapeInterval)
    clearInterval(gStopWatch)
    var elModal = document.querySelector('.game-over-modal')
    elModal.style.display = 'flex';
}

function moveRight() {
    gIsThereCollision = checkIsCollision(gCurrShape, +1, 0)
    if (!gIsThereCollision) {
        renderShape(gCurrShape, '')
        gCurrShape.x++
        renderShape(gCurrShape, 'fill')
    }
}

function moveLeft() {
    gIsThereCollision = checkIsCollision(gCurrShape, -1, 0)
    if (!gIsThereCollision) {
        renderShape(gCurrShape, '')
        gCurrShape.x--
        renderShape(gCurrShape, 'fill')
    }
}
document.addEventListener("keydown", CONTROL);
function CONTROL(event) {
    if (event.keyCode == 37) {
        moveLeft()
    } else if (event.keyCode == 39) {
        moveRight();

    } else if (event.keyCode == 40) {
        moveShape()
    }
}