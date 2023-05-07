var mainBox = $(".main-box");
let map;

function createMap(){
    
    map = new Array(20);
    for (let i = 0; i < map.length; i++) {
        map[i] = new Array(20).fill(0);
    }
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
        var y = i % 2 === 1;
        var x = j % 2 === 1;
        var colorClass = y ? (x ? "black" : "dark") : (x ? "dark" : "black");
        var box = $("<div>", {class: `h-100 w-100 bg-${colorClass}`}).attr("value", `${i},${j}`);
        mainBox.append(box);
        }
    }

    
    let numOfBombs = 50;
    while (numOfBombs > 0) {
        let x = Math.floor(Math.random() * 20);
        let y = Math.floor(Math.random() *20);
        if(map[y][x] == 0){
            map[y][x] = 1;
            numOfBombs--;
        }
    }
}

function getWidth(start){
    let y = parseInt(start[0]);
    let x = parseInt(start[1]);
    let widthStart = x;
    let widthEnd = x;

    for (let i = x; i < 20; i++) {
        if (map[y][i] == 0) widthStart++;
        else break;
    }
    for (let i = x - 1; i >= 0; i--) {
        if (map[y][i] == 0) widthEnd--;
        else break;
    }

    return [widthStart, widthEnd];
}
function getHeight(start){
    let y = parseInt(start[0]);
    let x = parseInt(start[1]);
    let heightStart = y;
    let heightEnd = y;

    for(let i=y; i<20; i++){
        if(map[i][x] == 0) heightStart++;
        else break;
    }
    for(let i=y-1; i>=0; i--) {
        if(map[i][x] == 0) heightEnd--;
        else break;
    }
    return [heightStart, heightEnd];
}

function createShape(start){
    let heights = getHeight(start);
    let widths = getWidth(start);

    for(let i=heights[1]; i<heights[0]; i++){
        for(let j=widths[1]; j<widths[0]; j++){
            if(map[i][j] == 0){
                $(`.main-box div[value="${i},${j}"]`).removeClass("bg-black bg-dark").addClass("bg-white cleared-tiles");
            }
        }
    }
}

$(function() {
    createMap();

    let clicks = 0;
    mainBox.on("click", "div", function() {
        let tile = $(this).attr("value").split(",");
        if(clicks == 0){
            createShape(tile);
            clicks++;
        }else{
            if(map[parseInt(tile[0])][parseInt(tile[1])] == 0)
                $(this).removeClass("bg-black bg-dark").addClass("bg-white cleared-tiles");
            else
                clicks--;
                mainBox.empty();
                createMap();
        }
    });
});