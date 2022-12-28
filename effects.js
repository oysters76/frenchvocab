const ANIMATE_INTERVAL_TIME_DELAY = 10;
const ANIMATE_FADE_DELAY = 20;
const SLIDE_DOWN_MARGIN_SIZE = 1000;

function _getBoxShadow(hOffset){
  return hOffset + "px 20px 4px rgba(0, 0, 0, 0.75)";
}

//Moves the box shadow of the main intro prompt based on mouse position (x)
function moveBoxShadow(e){
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

function animateProgressBar(elem, size, callback){
  if (size < 10 || (size < 0 || size > 100)){
    elem.style.visibility = "hidden";
  }else{
    let i = 10;
    let progressInterval = setInterval(function (){
      if (i <= size){
        elem.style.width = i + "%";
        i += 1;
      }else{
        clearInterval(progressInterval);
      }
    }, ANIMATE_INTERVAL_TIME_DELAY);
  }
}

function animateMasteryCount(elem, size, callback){
  let i = 0;
  let masteryInterval = setInterval(function(){
    if (i <= size){
      elem.innerHTML = i + "% mastery";
      i += 1;
    }else{
      clearInterval(masteryInterval);
    }
  }, ANIMATE_INTERVAL_TIME_DELAY);
}

function animateLevelCount(elem, size, level, callback){
  let i = 1;
  let totalTimeTaken = ANIMATE_INTERVAL_TIME_DELAY * size;
  let ratio = totalTimeTaken/level;
  let levelInterval = setInterval(function(){
    if (i <= level){
      elem.innerHTML = "you are at level " + i + "!";
      i += 1;
    }else{
      clearInterval(levelInterval);
    }
  }, ratio);
}

function fadeInOutHome(elem, isFadeOut, callback){
  let i = isFadeOut ? 1 : 0;
  let totalTime = ANIMATE_FADE_DELAY * 10;
  let ratio = SLIDE_DOWN_MARGIN_SIZE/totalTime;
  let marginTop = 0;
  let fadeInOutInterval = setInterval(function(){
    let shouldStop = false;
    if (isFadeOut && i <= 0){shouldStop = true;}
    if (!isFadeOut && i >= 1){shouldStop = true;}
    if (shouldStop){
      clearInterval(fadeInOutInterval);
      callback();
    }
    if (isFadeOut)
      elem.style.marginTop = marginTop + "px";
    elem.style.opacity = i;
    i -= isFadeOut ? 0.1 : -0.1;
    marginTop += isFadeOut ? ratio : 0;
  }, ANIMATE_FADE_DELAY)
}
