let moveValue = 0;
let moreTransition = true;
let mergeCount = 0;
let merge = false;

let tileData = {
  one: { count: 0, top: "", left: "" },
  two: 0,
  three: 0,
  four: 0,
  five: 0,
  six: 0,
  seven: 0,
  eight: 0,
  nine: 0,
  ten: 0,
  eleven: 0,
  twelve: 0,
  thirteen: 0,
  fourteen: 0,
  fifteen: 0,
  sixteen: 0,
};

let gridData = {
  1: { count: 0, top: 10, left: 17, pos: 1, merge:false},
  2: { count: 0, top: 10, left: 143, pos: 2, merge:false},
  3: { count: 0, top: 10, left: 268, pos: 3, merge:false, merge:false },
  4: { count: 0, top: 10, left: 391, pos: 4, merge:false },
  5: { count: 0, top: 135, left: 17, pos: 5, merge:false },
  6: { count: 0, top: 135, left: 143, pos: 6, merge:false },
  7: { count: 0, top: 135, left: 268, pos: 7, merge:false },
  8: { count: 0, top: 135, left: 391, pos: 8, merge:false },
  9: { count: 2, top: 260, left: 17, pos: 9, merge:false },
  10: { count: 0, top: 260, left: 143, pos: 10, merge:false },
  11: { count: 2, top: 260, left: 268, pos: 11, merge:false },
  12: { count: 0, top: 260, left: 391, pos: 12, merge:false },
  13: { count: 0, top: 384, left: 17, pos: 13, merge:false },
  14: { count: 0, top: 384, left: 143, pos: 14, merge:false },
  15: { count: 0, top: 384, left: 268, pos: 15, merge:false },
  16: { count: 0, top: 384, left: 391, pos: 16, merge:false },
};

const newGameButton = selectClass("new-game", 0);

newGameButton.addEventListener("click", function startNewGame() {
  let gridValue = Object.values(gridData).forEach((tile) => {
    tile.count = 0;

    // selectClass("tiles", tile.pos - 1).style.zIndex = -1;
  });

  getRandomTiles();
  getRandomTiles();

  addNewTiles();
});

function addNewTiles(textContent = 2) {

  for (let key in gridData) {
    let currentTile = selectClass(`tile-${key}`, 0);
    if (currentTile) {
      currentTile.remove();
    }

    if (gridData[key].count != 0) {
      let newTile = document.createElement("div");
      newTile.className = `tile-${key}`;
      newTile.textContent = gridData[key].count;
      newTile.style.cssText = `
        position: absolute;
        width: 106px;
        height: 106px;
        background-color: #eee4da;
        font-size: 3.5rem;
        text-align: center;
        line-height: 106px;
        border-radius: 10px;
        z-index: 1;
        top: ${gridData[key].top}px;
        left: ${gridData[key].left}px;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0), inset 0 0 0 1px rgba(255, 255, 255, 0);
        font-weight: bold;
        text-align: center;`;

      document.querySelector(".grid-container").appendChild(newTile);
    }
  }
}

function selectID(id) {
  return document.getElementById(id);
}

function selectClass(className, num = 0) {
  return document.getElementsByClassName(className)[num];
}

function reset(){
  for( let key in gridData){
    gridData[key].merge=false;
  }
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      reset();
      updateGrid();
      getRandomTiles();
      console.log("up");

      break;
    case "ArrowDown":
      moveTiles("down");
      console.log("down");
      break;
    case "ArrowLeft":
      moveTiles("left");
      console.log("left");
      break;
    case "ArrowRight":
      console.log("right");
      moveTiles("right");
      break;
    default:
      break;
  }
});

function updateGrid() {
  let gridKeys = Object.keys(gridData);

  for (let i = 0; i < gridKeys.length; i++) {
    let key = gridKeys[i];
    let currentPos = gridData[key].pos;

    if (gridData[key].count !== 0 && gridData[key].merge==false) {
      moveTileUp(key, currentPos);
    }
  }

}

function moveTileUp(key, currentPos) {
  let distance = 0;

  // Calculate how far the tile can move up
 while (currentPos > 4) {
    let targetPos = currentPos - 4;

    if (gridData[currentPos].count !== 0) {

      if (
        gridData[targetPos].count === 0 || gridData[targetPos].count === gridData[currentPos].count ) {

        if (
          gridData[targetPos].count === gridData[currentPos].count 
        ) {

          merge = true;

          distance += 125;


          gridData[targetPos].count = 2 * gridData[currentPos].count;
          gridData[currentPos].count = 0;
          gridData[targetPos].merge=true;
          break ;
          
        } else {
          distance += 125; // 125px is the height of each tile's step
          gridData[targetPos].count = gridData[currentPos].count;
          gridData[currentPos].count = 0;
          currentPos = targetPos;

        }
      } else break;
    }
  }

  if (distance > 0) {

    let currentTile = selectClass(`tile-${key}`, 0);

    let targetTile = selectClass(`tile-${key - 4}`, 0);


    // Apply transition
    currentTile.style.transition = "transform 0.3s";
    currentTile.style.transform = `translateY(-${distance}px)`;

    // After the transition ends, update the grid and DOM
    currentTile.addEventListener("transitionend", function handler() {

      addNewTiles();
      // Reset transform
      currentTile.style.transition = "";
      currentTile.style.transform = "";


    });
  }
}


function getRandomTiles() {
  // Generate the first random number between 1 and 16
  const RandomNumber = Math.floor(Math.random() * 16);

  let RandomKey = Object.keys(gridData)[RandomNumber];

  if (gridData[RandomKey].count != 0) {

    getRandomTiles();
  } else {
    gridData[RandomKey].count = 2;

  }
}
