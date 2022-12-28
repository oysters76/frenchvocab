let state = {
  mastery: 0,
  level: 1,
  words:[],
  correctWords:[],
  incorrectWords:[],
  currentCorrectInd:-1,
  currentOptions: [],

  getMastery: function() {
    return this.mastery;
  },

  getLevel: function (){
    return this.level;
  },

  getCorrectInd: function (){
    return this.currentCorrectInd;
  },

  getTotalCorrectWords: function (){
    return this.correctWords.length;
  },

  getTotalIncorrectWords: function (){
    return this.incorrectWords.length;
  },

  getTotalEncounteredWords: function (){
    return this.words.length;
  },

  getEncountedWords: function(){
    return this.words;
  },

  getCurrentOptions: function (){
    return this.currentOptions;
  },

  setLevel: function (lvl){
    if (lvl < 1 || lvl > 100)
      return;
    this.level = lvl;
    this.correctWords = [];
    this.incorrectWords = [];
    this.words = [];
    this.mastery = 0;
    this.stateChanged();
  },

  setMastery: function (m){
    if (m > 100 || m < 0)
      return;
    this.mastery = m;
    this.stateChanged();
  },

  updateMastery: function(){
    let m = Math.round((this.correctWords.length / (this.level*10) * 100));
    this.setMastery(m);
  },

  replaceCurrentCorrectWord: function (ind){
    this.currentCorrectInd = ind;
    this.stateChanged();
  },

  addEncounteredWord: function (ind){
    this._pushToArr(this.words, ind);
  },

  addCorrectWord: function (ind){
    this._pushToArr(this.correctWords, ind);
    this.updateMastery();
  },

  setCurrentOptions: function(arr){
    this.currentOptions = arr;
  },

  clearCurrentOptions: function(){
    this.currentOptions = [];
    this.stateChanged();
  },

  addIncorrectWord: function (ind){
    this._pushToArr(this.incorrectWords, ind);
    this.updateMastery();
  },

  checkCorrectInd: function (ind){
    return ind == this.currentCorrectInd;
  },

  getCorrectInd: function(){
    return this.currentCorrectInd;
  },

  _pushToArr: function (arr, item){
    arr.push(item);
    this.stateChanged();
  },

  stateToJSON: function (){
    return JSON.stringify(state);
  },

  JSONToState: function (json){
    _state = JSON.parse(json)
    Object.assign(this, _state);
  },

  stateChanged: function (){
    json = this.stateToJSON();
    localStorage.setItem("state", json);
  },

  init: function (){
    _state = localStorage.getItem("state");
    if (_state == null)
      return;
    this.JSONToState(_state);
  },

  getCurrentFrenchWord: function(){
    if (this.currentCorrectInd == -1)
      return "";
    return _getFrench(this.currentCorrectInd);
  }

}

const INCREASE_PLAYER_LEVEL_ACTION = 0;
const DECREASE_PLAYER_LEVEL_ACTION = 1;
const CHANGE_MASTERY_POINTS = 2;
const ADD_ENCOUNTERED_WORD = 3;
const ADD_CORRECT_WORD = 4;
const ADD_INCORRECT_WORD = 5;
const REPLACE_CURRENT_CORRECT_WORD = 6;
const SET_CURRENT_OPTIONS = 7;
const CLEAR_ALL_CURRENT_OPTIONS = 8;

function emitAction(action, actionObj, callback){

  switch(action){
    case INCREASE_PLAYER_LEVEL_ACTION:
      lvl = state.getLevel() + 1;
      state.setLevel(lvl);
      break;
    case DECREASE_PLAYER_LEVEL_ACTION:
      lvl = state.getLevel() - 1;
      if (lvl < 1)
        return;
      state.setLevel(lvl);
      break;
    case CHANGE_MASTERY_POINTS:
      state.setMastery(actionObj.value);
      break;
    case ADD_ENCOUNTERED_WORD:
      state.addEncounteredWord(actionObj.value);
      break;
    case ADD_CORRECT_WORD:
      state.addCorrectWord(actionObj.value);
      break;
    case ADD_INCORRECT_WORD:
      state.addIncorrectWord(actionObj.value);
      break;
    case REPLACE_CURRENT_CORRECT_WORD:
      state.replaceCurrentCorrectWord(actionObj.value);
      break;
    case SET_CURRENT_OPTIONS:
      state.setCurrentOptions(actionObj.value);
      break;
    case CLEAR_ALL_CURRENT_OPTIONS:
      state.clearCurrentOptions();
      break;
  }
  if (callback != null)
    callback(state);
}
