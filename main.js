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

function firstClick(start){
    let y = parseInt(start[0]);
    let x = parseInt(start[1]);
    console.table(map);

    while(x < 20){
        console.log(y + " " + x);
        if(map[y][x] == 0){
            $(`.main-box div[value="${y},${x}"]`).removeClass("bg-black bg-dark").addClass("bg-white cleared-tiles");
            x++;
        }else{
            x--;
            break;
        }
    }
    while(x >= 0){
        console.log(y + " " + x);
        if(map[y][x] == 0){
            $(`.main-box div[value="${y},${x}"]`).removeClass("bg-black bg-dark").addClass("bg-white cleared-tiles");
            x--;
        }else{
            break;
        }
    }

}

$(function() {
    createMap();

    let clicks = 0;
    mainBox.on("click", "div", function() {
        let tile = $(this).attr("value").split(",");
        if(clicks == 0){
            firstClick(tile)
            clicks++;
        }else{
            if(map[parseInt(tile[0])][parseInt(tile[1])] == 0)
                $(this).removeClass("bg-black bg-dark").addClass("bg-white cleared-tiles");
            else
                mainBox.empty();
                createMap();
        }
    });
});