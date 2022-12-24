function applyEffects(){
  appBtn.addEventListener('mouseover', changeAppBtnStringEng);
  appBtn.addEventListener('mouseleave', changeAppBtnStringFr);

  document.addEventListener('mousemove', moveBoxShadow);
}

function _getBoxShadow(hOffset){
  return hOffset + "px 20px 4px rgba(0, 0, 0, 0.75)";
}

function moveBoxShadow(e){
  //if mouse moves right, diff becomes negative
  // if mouse moves left, diff becomes positive.
  // max value is abs(halfWay)

  halfWay = window.screen.width/2;
  pos = e.screenX;
  diff = halfWay - pos;
  maxHOffset = 40
  ratio = halfWay/maxHOffset;
  hOffset = diff/ratio;
  boxShadowCSS = _getBoxShadow(hOffset);
  innerContainer.style.boxShadow = boxShadowCSS;
}

function changeAppBtnStringEng(){
  appBtn.innerHTML = APP_BTN_TEXT_ENG;
}

function changeAppBtnStringFr(){
  appBtn.innerHTML = APP_BTN_TEXT_FR;
}
