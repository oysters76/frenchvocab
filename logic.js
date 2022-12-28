function showIntroPrompt(){
  if (checkIfPlayerObjExists()){
     buildProgressIntroPrompt(state.getMastery(), state.getLevel());
  }else{
    buildNewIntroPrompt();
  }
  document.addEventListener('mousemove', moveBoxShadow);
}

function onAppBtnClick(e){
  fadeInOutHome(innerContainer, true, function(){
    mainContainer.innerHTML = "";
    document.removeEventListener('mousemove', moveBoxShadow);
    showNewQuestion(true);
  });
}

function goBackToHome(){
  mainContainer.innerHTML = "";
  _toggleAppContainer(true);
  showIntroPrompt();
}

function onBackBtnClick(e){
  goBackToHome();
}

function buildNewIntroPrompt(){
  let innerContainer = _buildDiv("innerContainer", "inner-container");
  let mainLbl = _buildLbl("heading", "app-heading", APP_HEADING);
  let subLbl = _buildLbl("welcomeMsg", "app-welcome", APP_DESC);
  let btn = _buildBtn("appBtn", "app-btn", APP_BTN_TEXT_FR);

  innerContainer.appendChild(mainLbl);
  innerContainer.appendChild(subLbl);
  innerContainer.appendChild(btn);

  btn.addEventListener('mouseover', changeAppBtnStringEng);
  btn.addEventListener('mouseleave', changeAppBtnStringFr);
  btn.addEventListener('click', onAppBtnClick);

  mainContainer.innerHTML = "";
  mainContainer.appendChild(innerContainer);
}

function buildProgressIntroPrompt(masteryPoints, level){
  let innerContainer = _buildDiv("innerContainer", "inner-container");
  let mainLbl =  _buildLbl("headingContinue", "app-heading-continue", APP_CONTINUE);
  let progressWrapDiv = _buildDiv("processWrapDiv", "progress-background");
  let progressBar = _buildDiv("progressBar", "progress-foreground");
  let masteryLbl = _buildLbl("masteryCount", "app-precentage", APP_INITAL_MASTERY_TEXT);
  let levelLbl = _buildLbl("levelCount", "app-level", APP_INITAL_LEVEL_TEXT);
  let btn = _buildBtn("appBtn", "app-btn", APP_BTN_TEXT_FR);

  innerContainer.appendChild(mainLbl);
  progressWrapDiv.appendChild(progressBar);
  innerContainer.appendChild(progressWrapDiv);
  innerContainer.appendChild(masteryLbl);
  innerContainer.appendChild(levelLbl);
  innerContainer.appendChild(btn);

  btn.addEventListener('mouseover', changeAppBtnStringEng);
  btn.addEventListener('mouseleave', changeAppBtnStringFr);
  btn.addEventListener('click', onAppBtnClick);

  mainContainer.innerHTML = "";
  mainContainer.appendChild(innerContainer);

  animateProgressBar(progressBar, masteryPoints, null);
  animateMasteryCount(masteryLbl, masteryPoints, null);
  animateLevelCount(levelLbl, masteryPoints, level, null);
}

function buildGameStage(state){ //ATTN: assumes len(options) == 4
  _toggleAppContainer(false);

  let appBar = _buildDiv("appBar", "app-bar");
  let backIcon = BACK_ICON;
  appBar.innerHTML = backIcon;

  let contentBar = _buildDiv("contentBar", "content-bar");
  let contentWord = _buildLbl("contentWord", "content-word", state.getCurrentFrenchWord());
  contentBar.appendChild(contentWord);

  let btnBar = _buildDiv("btnBar", "btn-bar");
  state.currentOptions.forEach((item, i) => {
    let wordBtn = _buildBtn(item.id, "word-btn", item.name);
    btnBar.appendChild(wordBtn);
    wordBtn.addEventListener('click', clickWordBtn);
  });

  mainContainer.appendChild(appBar);
  mainContainer.appendChild(contentBar);
  mainContainer.appendChild(btnBar);
}

function updateGameStage(state){
  let btns = document.querySelectorAll(".word-btn");
  btns.forEach((btn, i) => {
    btn.id = state.currentOptions[i].id;
    btn.innerHTML = state.currentOptions[i].name;
  });
  let lbl = document.querySelector("#contentWord");
  lbl.innerHTML = state.getCurrentFrenchWord();
}

function clickWordBtn(e){
  let id = e.target.id;
  let isCorrect = updateState(id);
  let audioClip = isCorrect ? CORRECT_AUDIO_CLIP : WRONG_AUDIO_CLIP;
  audioClip.onended = function(){
    showNewQuestion(false);
  }
  audioClip.play();
}

function showNewQuestion(firstTime){
  getNewQuestion(function(obj){
    if (obj.isEnd){
       alert(obj.messageToUser);
       goBackToHome();
    }else{
      if (firstTime){
        buildGameStage(obj);
      }else{
        updateGameStage(obj);
      }
    }
  });
}

function _toggleAppContainer(isAppContainer){
  let addClass = isAppContainer ? "app-container" : "app-container-game";
  let removeClass = isAppContainer ? "app-container-game" : "app-container";
  mainContainer.classList.remove(removeClass);
  mainContainer.classList.add(addClass);
}

function _buildLbl(id, classList, text){
  return _buildElement(id, "label", classList, text);
}

function _buildBtn(id, classList, text){
  return _buildElement(id, "button", classList, text);
}

function _buildDiv(id, classList){
  return _buildElement(id, "div", classList, "");
}

function _buildElement(id,tag,classList,content){
  let elem = document.createElement(tag);
  if (classList != ""){
    classList.split(",").forEach(cl =>{
      elem.classList.add(cl);
    });
  }
  elem.id = id;
  if (content != "")
    elem.innerHTML = content;
  return elem;
}
