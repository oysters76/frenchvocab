const TOTAL_WORDS = 1000
const TOTAL_OPTIONS = 4;
const WORD_SET_COUNT = 10;

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
