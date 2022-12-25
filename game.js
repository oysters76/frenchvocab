const TOTAL_WORDS = 1000
const TOTAL_OPTIONS = 4;
const WORD_SET_COUNT = 10;

let gameState = {

}

function checkIfCorrect(id){
  return true;
}

function constructWordAndOptions(level, indsToSkip){ //ATTN: level should be between 1 and 100 or equal
  if (level < 1 || level > (TOTAL_WORDS/WORD_SET_COUNT))
    return;

  startRange = 1
  endRange = level * 10 - 1;
  inds = _getInds(startRange, endRange, indsToSkip);
  ind = _randomInd(inds)
  inds = _removeInd(inds, ind)

  optionInds = []
  for (let i = 0; i < TOTAL_OPTIONS - 1; i++){
    optionInd = _randomInd(inds);
    inds = _removeInd(inds, optionInd);
    optionInds.push(optionInd);
  }

  return [ind, optionInds];
}

function updatePlayerObj(ind, isCorrect){
  let key = isCorrect ? "playerCorrect" : "playerWrong";
  playerCompleted = localStorage.getItem("playerCompleted");
  playerScore = localStorage.getItem(key);
  if (playerScore == null)
    playerScore = []
  else {
    playerScore = JSON.parse(playerScore);
  }
  playerScore.push(ind);
  if (playerCompleted == null)
    playerCompleted = []
  else {
    playerCompleted = JSON.parse(playerCompleted)
  }
  playerCompleted.push(ind)
  localStorage.setItem("playerCompleted", JSON.stringify(playerCompleted));
  localStorage.setItem(key, JSON.stringify(playerScore));
}

function checkIfPlayerObjExists(){
  return localStorage.getItem("player")
}

function loadPlayerObj(){
  let playerCorrect = localStorage.getItem("playerCorrect");
  let playerLevel = localStorage.getItem("level");
  if (playerCorrect == null)
    return [0, playerLevel];

  playerCorrect = JSON.parse(playerCorrect);
  localStorage.setItem("mastery", playerCorrect.length);
  return [playerCorrect.length, playerLevel]
}

function createBlankPlayerObj(){
  localStorage.setItem("player", "yes");
  localStorage.setItem("level", "1");
  localStorage.setItem("mastery", "0");
}


function _getInds(s, e, indsToSkip){
  let inds = []
  for (let i = s; i <= e; i++){
    let shouldSkip = false;
    for (let j = 0; j < indsToSkip.length; j++){
      if (indsToSkip[j] == i){
          shouldSkip = true;
          break;
      }
    }
    if (shouldSkip)
      continue;
    inds.push(i);
  }
  return inds;
}

function _randomInd(inds){
  return inds[_getRandomInt(0, inds.length)];
}

function _removeInd(inds, ind){
  const removeInd = inds.indexOf(ind);
  if (removeInd == -1)
    return;
  inds.splice(removeInd, 1);
  return inds;
}


function _getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
