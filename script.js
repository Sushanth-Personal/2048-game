let moveValue = 0;
let moreTransition=true;
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
  1: { count: 0, top: 10, left: 17, pos: 1 },
  2: { count: 0, top: 10, left: 143, pos: 2 },
  3: { count: 0, top: 10, left: 268, pos: 3 },
  4: { count: 0, top: 10, left: 391, pos: 4 },
  5: { count: 0, top: 135, left: 17, pos: 5 },
  6: { count: 0, top: 135, left: 143, pos: 6 },
  7: { count: 0, top: 135, left: 268, pos: 7 },
  8: { count: 0, top: 135, left: 391, pos: 8 },
  9: { count: 2, top: 260, left: 17, pos: 9 },
  10: { count: 0, top: 260, left: 143, pos: 10 },
  11: { count: 2, top: 260, left: 268, pos: 11 },
  12: { count: 0, top: 260, left: 391, pos: 12 },
  13: { count: 0, top: 384, left: 17, pos: 13 },
  14: { count: 0, top: 384, left: 143, pos: 14 },
  15: { count: 0, top: 384, left: 268, pos: 15 },
  16: { count: 0, top: 384, left: 391, pos: 16 },
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

function addNewTiles() {
  console.log("adding new tiles");
  console.log(gridData);
  for (let key in gridData) {
    let currentTile = selectClass(`tile-${key}`, 0);
    if (currentTile) {
      currentTile.remove();
    }
    console.log(gridData[key].count);
    if (gridData[key].count != 0) {
      let newTile = document.createElement("div");
      newTile.className = `tile-${key}`;
      newTile.textContent = "2";
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
        text-align: center;
        transition:3s

  `;
      document.querySelector(".grid-container").appendChild(newTile);
      console.log(newTile);
    }
  }
}

function selectID(id) {
  return document.getElementById(id);
}

function selectClass(className, num = 0) {
  return document.getElementsByClassName(className)[num];
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      updateGrid();
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

// function updateGrid(){

//   let loopCount=0;
//   Object.keys(gridData).forEach((key)=>{
//     console.log(key);
//     moreTransition="true";
//     console.log("frist entry");
//     if(gridData[key].pos>4){
//       console.log("i got here");
//       console.log(moreTransition );
//       console.log(gridData);
//     while(moreTransition){
//       console.log("whileloop");
//   //     loopCount++;
//   //     console.log("loopCount",loopCount);
//   //     console.log(gridData);
//   //     console.log( gridData[gridData[key].pos-4]);
//   //     console.log(gridData[key].count!==0);
//   //     console.log(gridData[gridData[key].pos-4].count===0 );
//   //     console.log( gridData[gridData[key].pos-4].count===0 && gridData[key].count!==0);

//    if( gridData[gridData[key].pos-4].count===0 && gridData[key].count!==0){
//     console.log("im here");
//       gridData[gridData[key].pos-4].count=gridData[key].count;
//       gridData[key].count=0;
//       console.log(gridData);
      
//     if(loopCount>100){
//       moreTransition=false;
//       console.log("loopbroke");
//       }
//    }else{
//     moreTransition=false;
//    }
//   }console.log("loopbroken");
// }

//   });

// }

// function updateGrid() {
//   Object.keys(gridData).forEach((key) => {
//     let currentPos = gridData[key].pos;

//     if (currentPos > 4 && gridData[key].count !== 0) {

//       while (currentPos > 4) {
//         let targetPos = currentPos - 4;

//         if (gridData[targetPos].count === 0) {

//           gridData[targetPos].count = gridData[currentPos].count;
//           gridData[currentPos].count = 0;
          

//           currentPos = targetPos;
//         } else {

//           break;
//         }
//       }
//     }
//   });

//   // After moving all tiles, update the DOM
//   addNewTiles();
// }

function updateGrid() {
  let gridKeys = Object.keys(gridData);
  
  // Iterate over the grid from top to bottom
  for (let i = 0; i < gridKeys.length; i++) {
    let key = gridKeys[i];
    let currentPos = gridData[key].pos;

    if (gridData[key].count !== 0) {
      moveTileUp(key, currentPos);
    }
  }
}

function moveTileUp(key, currentPos) {
  let distance = 0;
  
  // Calculate how far the tile can move up
  while (currentPos > 4) {
    let targetPos = currentPos - 4;
    if (gridData[targetPos].count === 0) {
      distance += 125; // 125px is the height of each tile's step
      currentPos = targetPos;
    } else 
      break;
    
  }

  if (distance > 0) {
    let currentTile = selectClass(`tile-${key}`, 0);
    gridData[currentPos].count = gridData[key].count;
    gridData[key].count = 0;

    // Apply transition
    currentTile.style.transition = "transform 0.3s";
    currentTile.style.transform = `translateY(-${distance}px)`;

    // After the transition ends, update the grid and DOM
    currentTile.addEventListener("transitionend", function handler() {
      currentTile.removeEventListener("transitionend", handler);
      
      // Reset transform
      currentTile.style.transition = "";
      currentTile.style.transform = "";

      // Move the tile to the new position in the DOM
      addNewTiles();
    });
  }
}



// function moveTiles(dir) {
//     console.log("im executed");
//     console.log(gridData);
//   if (dir === "up") {

//     let gridKey = Object.keys(gridData);

//     gridKey.forEach((key) => {

//       if (gridData[key].count !== 0) {

//         if (gridData[key].pos > 4) {
//           let targetPos = gridData[key].pos - 4;
        



//           if (gridData[targetPos].count === 0) {
//             let currentTile = selectClass(`tile-${key}`, 0);
//             currentTile.style.transition = "transform 0.4s";
//             currentTile.style.transform = `translateY(-125px)`;
//             gridData[targetPos].count = 2;
//             gridData[key].count = 0;
//             document.addEventListener("transitionend", addNewTiles);
            

//           }

//         }
//         else{moreTransition=false;}
//       }
//     }
// );


//   }
  
// }

function getRandomTiles() {
  // Generate the first random number between 1 and 16
  const RandomNumber = Math.floor(Math.random() * 16);

  let RandomKey = Object.keys(gridData)[RandomNumber];
  //   console.log(RandomNumber);
  if (gridData[RandomKey].count != 0) {
    console.log(gridData[RandomKey].count);
    getRandomTiles();
  } else {
    gridData[RandomKey].count = 2;
    console.log(gridData);
  }
}
