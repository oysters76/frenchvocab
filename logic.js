
function checkIfPlayerObjExists(){
  return false;
}

function loadPlayerObj(){
  return null;
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
  });
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
