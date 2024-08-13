let moveValue = 0;
let moreTransition = true;
let mergeCount = 0;
let merge = false;
let score = 0;

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
  1: {
    count: 0,
    top: 10,
    left: 17,
    pos: 1,
    merge: false,
    Llimit: 1,
    Rlimit: 4,
  },
  2: {
    count: 0,
    top: 10,
    left: 142,
    pos: 2,
    merge: false,
    Llimit: 1,
    Rlimit: 4,
  },
  3: {
    count: 0,
    top: 10,
    left: 267,
    pos: 3,
    merge: false,
    Llimit: 1,
    Rlimit: 4,
  },
  4: {
    count: 0,
    top: 10,
    left: 392,
    pos: 4,
    merge: false,
    Llimit: 1,
    Rlimit: 4,
  },
  5: {
    count: 0,
    top: 135,
    left: 17,
    pos: 5,
    merge: false,
    Llimit: 5,
    Rlimit: 8,
  },
  6: {
    count: 0,
    top: 135,
    left: 142,
    pos: 6,
    merge: false,
    Llimit: 5,
    Rlimit: 8,
  },
  7: {
    count: 0,
    top: 135,
    left: 267,
    pos: 7,
    merge: false,
    Llimit: 5,
    Rlimit: 8,
  },
  8: {
    count: 0,
    top: 135,
    left: 392,
    pos: 8,
    merge: false,
    Llimit: 5,
    Rlimit: 8,
  },
  9: {
    count: 2,
    top: 260,
    left: 17,
    pos: 9,
    merge: false,
    Llimit: 9,
    Rlimit: 12,
  },
  10: {
    count: 0,
    top: 260,
    left: 142,
    pos: 10,
    merge: false,
    Llimit: 9,
    Rlimit: 12,
  },
  11: {
    count: 2,
    top: 260,
    left: 267,
    pos: 11,
    merge: false,
    Llimit: 9,
    Rlimit: 12,
  },
  12: {
    count: 0,
    top: 260,
    left: 392,
    pos: 12,
    merge: false,
    Llimit: 9,
    Rlimit: 12,
  },
  13: {
    count: 0,
    top: 384,
    left: 17,
    pos: 13,
    merge: false,
    Llimit: 13,
    Rlimit: 16,
  },
  14: {
    count: 0,
    top: 384,
    left: 142,
    pos: 14,
    merge: false,
    Llimit: 13,
    Rlimit: 16,
  },
  15: {
    count: 0,
    top: 384,
    left: 267,
    pos: 15,
    merge: false,
    Llimit: 13,
    Rlimit: 16,
  },
  16: {
    count: 0,
    top: 384,
    left: 392,
    pos: 16,
    merge: false,
    Llimit: 13,
    Rlimit: 16,
  },
};

const newGameButton = selectClass("new-game", 0);

newGameButton.addEventListener("click", function startNewGame() {
  document.addEventListener("keydown", handleKeyDown);
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

      if (gridData[key].count == 4) {
        newTile.style.backgroundColor = "#eee1c9";
      }
      if (gridData[key].count == 8) {
        newTile.style.backgroundColor = "#f3b27a";
      }

      if (gridData[key].count == 16) {
        newTile.style.backgroundColor = "#f69664";
      }

      if (gridData[key].count == 32) {
        newTile.style.backgroundColor = "#f77c5f";
      }

      if (gridData[key].count == 64) {
        newTile.style.backgroundColor = "#f75f3b";
      }

      if (gridData[key].count == 128) {
        newTile.style.backgroundColor = "#edd073";
      }
      if (gridData[key].count == 256) {
        newTile.style.backgroundColor = "#edcc62";
      }
      if (gridData[key].count == 512) {
        newTile.style.backgroundColor = "#89CFF0";
      }
      if (gridData[key].count == 1024) {
        newTile.style.backgroundColor = "#0096FF";
      }
      if (gridData[key].count == 2048) {
        newTile.style.backgroundColor = "#40B5AD";
      }

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

function reset() {
  for (let key in gridData) {
    gridData[key].merge = false;
  }
}

function handleKeyDown(event) {
  switch (event.key) {
    case "ArrowUp":
      reset();
      updateGrid("up");
      getRandomTiles();
      console.log("up");

      break;
    case "ArrowDown":
      reset();
      updateGrid("down");
      getRandomTiles();
      console.log("down");

      break;
    case "ArrowLeft":
      reset();
      updateGrid("left");
      getRandomTiles();

      break;
    case "ArrowRight":
      console.log("right");
      reset();
      updateGrid("right");
      getRandomTiles();

      break;
    default:
      break;
  }
}

function updateGrid(dir) {
  let gridKeys = Object.keys(gridData);

  for (let i = 0; i < gridKeys.length; i++) {
    let key = gridKeys[i];
    let currentPos = gridData[key].pos;

    if (gridData[key].count !== 0 && gridData[key].merge == false) {
      switch (dir) {
        case "up":
          moveTileUp(key, currentPos);
          break;
        case "down":
          moveTileDown(key, currentPos);
          break;
        case "left":
          moveTileLeft(key, currentPos);
          break;
        case "right":
          moveTileRight(key, currentPos);
          break;
        default:
          break;
      }
    }
  }
}

// function checkGameOver(){
//   let sum=0;
//   for(let key in gridData){
//     if(gridData[key].count!=gridData[key+1].count){
//     sum = sum + 2;
//     console.log("sum",sum);
//     }
//     if(sum==32){
//       console.log("gameover");
//       alert("gameover");
//     }
//   }
// }
function updateScore(upscore) {
  score = score + upscore;
  document.getElementById("score").textContent = score;
}
function moveTileUp(key, currentPos) {
  let distance = 0;

  while (currentPos > 4) {
    let targetPos = currentPos - 4;

    if (gridData[currentPos].count !== 0) {
      if (
        gridData[targetPos].count === 0 ||
        gridData[targetPos].count === gridData[currentPos].count
      ) {
        if (gridData[targetPos].count === gridData[currentPos].count) {
          merge = true;

          distance += 125;

          gridData[targetPos].count = 2 * gridData[currentPos].count;
          gridData[currentPos].count = 0;
          gridData[targetPos].merge = true;
          updateScore(gridData[targetPos].count);
          break;
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

function moveTileDown(key, currentPos) {
  let distance = 0;

  while (currentPos < 13) {
    let targetPos = currentPos + 4;

    if (gridData[currentPos].count !== 0) {
      if (
        gridData[targetPos].count === 0 ||
        gridData[targetPos].count === gridData[currentPos].count
      ) {
        if (gridData[targetPos].count === gridData[currentPos].count) {
          merge = true;

          distance += 125;

          gridData[targetPos].count = 2 * gridData[currentPos].count;
          gridData[currentPos].count = 0;
          gridData[targetPos].merge = true;
          updateScore(gridData[targetPos].count);
          break;
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

    let targetTile = selectClass(`tile-${key + 4}`, 0);

    // Apply transition
    currentTile.style.transition = "transform 0.3s";
    currentTile.style.transform = `translateY(${distance}px)`;

    // After the transition ends, update the grid and DOM
    currentTile.addEventListener("transitionend", function handler() {
      addNewTiles();
      // Reset transform
      currentTile.style.transition = "";
      currentTile.style.transform = "";
    });
  }
}

function moveTileLeft(key, currentPos) {
  let distance = 0;

  while (currentPos > gridData[currentPos].Llimit) {
    let targetPos = currentPos - 1;

    if (gridData[currentPos].count !== 0) {
      if (
        gridData[targetPos].count === 0 ||
        gridData[targetPos].count === gridData[currentPos].count
      ) {
        if (gridData[targetPos].count === gridData[currentPos].count) {
          merge = true;

          distance += 125;

          gridData[targetPos].count = 2 * gridData[currentPos].count;
          gridData[currentPos].count = 0;
          gridData[targetPos].merge = true;
          updateScore(gridData[targetPos].count);
          break;
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

    let targetTile = selectClass(`tile-${key - 1}`, 0);

    // Apply transition
    currentTile.style.transition = "transform 0.3s";
    currentTile.style.transform = `translateX(-${distance}px)`;

    // After the transition ends, update the grid and DOM
    currentTile.addEventListener("transitionend", function handler() {
      addNewTiles();
      // Reset transform
      currentTile.style.transition = "";
      currentTile.style.transform = "";
    });
  }
}

function moveTileRight(key, currentPos) {
  let distance = 0;

  while (currentPos < gridData[currentPos].Rlimit) {
    let targetPos = currentPos + 1;

    if (gridData[currentPos].count !== 0) {
      if (
        gridData[targetPos].count === 0 ||
        gridData[targetPos].count === gridData[currentPos].count
      ) {
        if (gridData[targetPos].count === gridData[currentPos].count) {
          merge = true;

          distance += 125;

          gridData[targetPos].count = 2 * gridData[currentPos].count;
          gridData[currentPos].count = 0;
          gridData[targetPos].merge = true;
          updateScore(gridData[targetPos].count);
          break;
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

    let targetTile = selectClass(`tile-${key + 1}`, 0);

    // Apply transition
    currentTile.style.transition = "transform 0.3s";
    currentTile.style.transform = `translateX(${distance}px)`;

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
