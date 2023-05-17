// var mainBox = $(".main-box");
// let map;

// function createMap(){
    
//     map = new Array(20);
//     for (let i = 0; i < map.length; i++) {
//         map[i] = new Array(20).fill(0);
//     }
//     for (var i = 0; i < 20; i++) {
//         for (var j = 0; j < 20; j++) {
//         var y = i % 2 === 1;
//         var x = j % 2 === 1;
//         var colorClass = y ? (x ? "black" : "dark") : (x ? "dark" : "black");
//         var box = $("<div>", {class: `c-100 bg-${colorClass}`}).attr("value", `${i},${j}`);
//         var pTag = $("<p>", {class: "toggle"}).text("");
//         box.append(pTag);
//         mainBox.append(box);
//         }
//     }

    
//     let numOfBombs = 50;
//     while (numOfBombs > 0) {
//         let x = Math.floor(Math.random() * 20);
//         let y = Math.floor(Math.random() *20);
//         if(map[y][x] == 0){
//             map[y][x] = 1;
//             numOfBombs--;
//         }
//     }
// }

// function getWidth(start){
//     let y = parseInt(start[0]);
//     let x = parseInt(start[1]);
//     let widthStart = x;
//     let widthEnd = x;

//     for (let i = x; i < 20; i++) {
//         if (map[y][i] == 0) widthStart++;
//         else break;
//     }
//     for (let i = x - 1; i >= 0; i--) {
//         if (map[y][i] == 0) widthEnd--;
//         else break;
//     }

//     return [widthStart, widthEnd];
// }
// function getHeight(start){
//     let y = parseInt(start[0]);
//     let x = parseInt(start[1]);
//     let heightStart = y;
//     let heightEnd = y;

//     for(let i=y; i<20; i++){
//         if(map[i][x] == 0) heightStart++;
//         else break;
//     }
//     for(let i=y-1; i>=0; i--) {
//         if(map[i][x] == 0) heightEnd--;
//         else break;
//     }
//     return [heightStart, heightEnd];
// }

// function createShape(start){
//     let heights = getHeight(start);
//     let widths = getWidth(start);

//     for(let i=heights[1]; i<heights[0]; i++){
//         for(let j=widths[1]; j<widths[0]; j++){
//             if(map[i][j] == 0){
//                 $(`.main-box div[value="${i},${j}"]`).removeClass("bg-black bg-dark").addClass("bg-white cleared-tiles");
//                 $(`.main-box div[value="${i},${j}"]`).find("p").text(assignValues(i, j)).removeClass("toggle");
//             }
//         }
//     }
// }

// function assignValues(y, x){
//     let count = 0;
//     for(let i=y-1; i<y+2; i++){
//         for(let j=x-1; j<x+2; j++){
//             if(i>-1 && i<map.length && j<map[i].length && j>-1){
//                 if(map[i][j]==1){
//                     count++;
//                 }
//             }
//         }
//     }
//     return count;
// }

// $(function() {
//     createMap();

//     let clicks = 0;
//     mainBox.on('contextmenu', 'div', (event)=>{
//         event.preventDefault();
//         console.log(event.target);
//         $(event.target).removeClass("bg-dark bg-black").addClass("bg-danger");
//     })
//     mainBox.on("click", "div", function() {
//         let tile = $(this).attr("value").split(",");
//         if(clicks == 0){
//             createShape(tile);
//             clicks++;
//         }else{
//             if(map[parseInt(tile[0])][parseInt(tile[1])] == 0){
//                 $(this).removeClass("bg-black bg-dark").addClass("bg-white cleared-tiles");
//                 $(this).find("p").text(assignValues(parseInt(tile[0]), parseInt(tile[1]))).removeClass("toggle");
//             }else{
//                 clicks--;
//                 mainBox.empty();
//                 createMap();
//             }
//         }
//     });
// });


const _BOARD = [
  ['.', '9', '.', '.', '4', '2', '1', '3', '6'],
  ['.', '.', '.', '9', '6', '.', '4', '8', '5'],
  ['.', '.', '.', '5', '8', '1', '.', '.', '.'],

  ['.', '.', '4', '.', '.', '.', '.', '.', '.'],
  ['5', '1', '7', '2', '.', '.', '9', '.', '.'],
  ['6', '.', '2', '.', '.', '.', '3', '7', '.'],

  ['1', '.', '.', '8', '.', '4', '.', '2', '.'],
  ['7', '.', '6', '.', '.', '.', '8', '1', '.'],
  ['3', '.', '.', '.', '9', '.', '.', '.', '.'],
]

const _QUADS = [
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],

  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],

  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
]


function getRow(board, row){
    return board[row]
}

function getColumn(board, column){
    let intCol=[];
    for(row in board){
        intCol.push(board[row][column]);
    }
    return intCol
}

function getQuad(board, quad){
    let inQuad = [];
    for(row in board){
        for(col in row){
            if(_QUADS[row][col] == quad){
                inQuad.push(board[row][col])
            }
        }
    }
    return inQuad
}

function getPossible(board, row, col){
    let inRow = getRow(board, row);
    let inCol = getColumn(board, col);
    let inQuad = getQuad(board, col);

    let possible = [];
    let used = [];

    for(r in inRow){
        let included = false;
        for(u in used){
            if(inRow[r]==used[u]){
                included = true;
                break;
            }
        }
        if(!included){
            used.push(inRow[r])
        }
    }
    for(c in inCol){
        let included = false;
        for(u in used ){
            if(inCol[c]==used[u]){
                included = true;
                break;
            }
        }
        if(!included){
            used.push(inCol[c]);
        }
    }
    for(q in inQuad){
        let included = false;
        for(u in used ){
            if(used[u]=="."){
                included = true;
                break;
            }
        }
        if(!included){
            used.push(inQuad[q]);
        }
    }

    for(u in used){
        if(used[u]=="."){
            used.splice(u, 1);
        }
    }
}