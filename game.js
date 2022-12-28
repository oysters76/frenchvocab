const TOTAL_WORDS = 1000
const TOTAL_OPTIONS = 4;
const WORD_SET_COUNT = 10;

function _getFrench(ind){
  return WORD_BANK.FIELD2[ind];
}

function _getEnglish(ind){
  return WORD_BANK.FIELD3[ind];
}

function constructWordAndOptions(level, indsToSkip){ //ATTN: level should be between 1 and 100 or equal
  if (level < 1 || level > (TOTAL_WORDS/WORD_SET_COUNT))
    return;

  startRange = 1
  endRange = level * 10 - 1;
  inds = _getInds(startRange, endRange, indsToSkip);
  ind = _randomInd(inds)
  optionInds = [ind]
  inds = _getInds(startRange, endRange, [ind]);
  for (let i = 0; i < TOTAL_OPTIONS - 1; i++){
    optionInd = _randomInd(inds);
    inds = _removeInd(inds, optionInd);
    optionInds.push(optionInd);
  }

  return [ind, optionInds];
}

function getNewQuestion(callback){
  let playerLevel = state.getLevel()
  let encounteredWordSize = state.getTotalEncounteredWords();

  if (encounteredWordSize >= (playerLevel*WORD_SET_COUNT)){
    let isLevelUp = state.getTotalCorrectWords() >= ((playerLevel*WORD_SET_COUNT)/2);
    let action = isLevelUp ? INCREASE_PLAYER_LEVEL_ACTION : DECREASE_PLAYER_LEVEL_ACTION;
    emitAction(action, null, null);
    obj = {
      messageToUser: isLevelUp ? APP_LEVEL_UP_MSG : APP_LEVEL_DOWN_MSG,
      isEnd: true
    }
    callback(obj);
    return;
  }

  let res = constructWordAndOptions(state.getLevel(), state.getEncountedWords());

  let ind = res[0]
  let optionInds = res[1]
  let word = _getFrench(ind);
  let indEngWord = _getEnglish(ind);
  let options = []
  optionInds.forEach((item, i) => {
    option = {
      id: item,
      name: _getEnglish(item)
    }
    options.push(option);
  });
  options = _randomShuffle(options);
  emitAction(SET_CURRENT_OPTIONS, {value:options}, null);
  emitAction(REPLACE_CURRENT_CORRECT_WORD, {value: ind}, callback);
}

function updateState(ind){ //Called when player makes a choice
  let isCorrect = state.checkCorrectInd(ind);
  let action = isCorrect ? ADD_CORRECT_WORD : ADD_INCORRECT_WORD;
  emitAction(ADD_ENCOUNTERED_WORD, {value:state.getCorrectInd()}, null);
  emitAction(action, {value:state.getCorrectInd()}, null);
  return isCorrect;
}

function checkIfPlayerObjExists(){
  return localStorage.getItem("state")
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

function _randomShuffle(array){
  for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
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
