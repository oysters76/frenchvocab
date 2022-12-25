
function checkIfPlayerObjExists(){
  return localStorage.getItem("player")
}

function loadPlayerObj(){
  return null;
}

function createBlankPlayerObj(){
  localStorage.setItem("player", "yes");
  localStorage.setItem("level", "1");
  localStorage.setItem("mastery", "0");
}

function showIntroPrompt(){
  if (checkIfPlayerObjExists()){
     buildProgressIntroPrompt(80, 1);
  }else{
    buildNewIntroPrompt();
  }
  document.addEventListener('mousemove', moveBoxShadow);
}

function onAppBtnClick(e){
  fadeInOutHome(innerContainer, true, function(){
    mainContainer.innerHTML = "";
    document.removeEventListener('mousemove', moveBoxShadow);
    if (!checkIfPlayerObjExists())
      createBlankPlayerObj()
      
    buildGameStage("comme", ["hello", "world", "man", "go"])
  });
}

function onBackBtnClick(e){
  mainContainer.innerHTML = "";
  _toggleAppContainer(true);
  showIntroPrompt();
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

function buildGameStage(word, options){ //ATTN: assumes len(options) == 4
  _toggleAppContainer(false);

  let appBar = _buildDiv("appBar", "app-bar");
  let backIcon = BACK_ICON;
  appBar.innerHTML = backIcon;

  let contentBar = _buildDiv("contentBar", "content-bar");
  let contentWord = _buildLbl("contentWord", "content-word", word);
  contentBar.appendChild(contentWord);

  let btnBar = _buildDiv("btnBar", "btn-bar");
  options.forEach((item, i) => {
    let wordBtn = _buildBtn("wordBtn" + i, "word-btn", item);
    btnBar.appendChild(wordBtn);
  });

  mainContainer.appendChild(appBar);
  mainContainer.appendChild(contentBar);
  mainContainer.appendChild(btnBar);
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
