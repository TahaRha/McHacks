let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, { subtree: true, childList: true });

window.__ttrExcludeUrls = ["https://twitter.com/explore", "https://twitter.com/home",
  "https://twitter.com/notifications", "https://twitter.com/messages"];

window.__tweetSuggestPrompts = ["Twitter is best used for…",
  "I can’t believe [trending topic] is trending because…",
  "My favorite tweeter is…",
  "If I could change one thing about Twitter it would be…",
  "I can’t stand it when people tweet about…",
  "I prefer to Tweet on a…",
  "How do you find useful things to tweet?",
  "Have you ever participated in #TwitterChat?",
  "When did you join Twitter? Why?",
  "How often do you change your bio?",
  "Which do you use Twitter to do more of, listen or share?",
  "What was the best tweet you’ve ever read?",
  "Who is your favorite person to follow on Twitter?",
  "Do you tweet from your computer or phone more often?",
  "What dashboard do you use to access Twitter?",
  "Tell your followers one of your best productivity tips",
  "Tweet about one Twitter account you find extremely useful",
  "Share a piece of advice for people in your niche",
  "Explain one type of Twitter etiquette you think others might not know about",
  "Recommend a trend that you find interesting",
  "Share any cool Twitter tools you’ve found",
  "Ask for help with a project you’re working on",
  "Tweet or Retweet something that was successful in the past",
  "Share a positive thought or quote"];

//HELPER START  --
function createElementFromHTMLString(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div;
}
//HELPER END    --

function onUrlChange() {
  //console.warn('URL changed!', location.href);
  if (window.__ttrExcludeUrls.includes(location.href) == false) {
    //stop checks and restart
    __stFuncExt.__extTimerStop();
    __stFuncExt.countExtRept = 0;
    __stFuncExt.run_ext();
  } else {
    //console.warn('dont run...');
    __stFuncExt.__extTimerStop();
  }
  if (location.href == "https://twitter.com/home") {
    //replace feed with whiteboard and suggestions
    //hide trending
    //easier lists open
    //console.warn('Improve display - whiteboard--');
    __stFuncExt.__displayOverlayBoard();
  } else {
    try {
      document.querySelector('.__focusOnContent').style.display = 'none';
    } catch (e) { }
  }
}


window.__stFuncExt = {};
__stFuncExt.__extTimerStop = function () {
  clearInterval(__stFuncExt.__extTimerVar);
}
__stFuncExt.__extTimerStopBlock = function () {
  clearInterval(__stFuncExt.__extTimerBlock);
}
__stFuncExt.countExtRept = 0;
__stFuncExt.countExtReptBlock = 0;
__stFuncExt.run_ext = function () {
  if (__stFuncExt.countExtRept == 0) {
    //console.warn('listen for clicks');
  }
  //console.warn('run init search tweets');

  if (location.href == "https://twitter.com/home") {
    //replace feed with whiteboard and suggestions
    //hide trending
    //easier lists open
    //console.warn('Improve display - whiteboard--');
    __stFuncExt.__displayOverlayBoard();
  } else {
    try {
      document.querySelector('.__focusOnContent').style.display = 'none';
    } catch (e) { }
  }
  if (window.__ttrExcludeUrls.includes(location.href) == true) {
    return false;
  }

  try {
    __stFuncExt.__extTimerVar = setInterval(function () {
      if (__stFuncExt.countExtRept >= 20) {
        //console.warn('cancel timer-----');
        __stFuncExt.__extTimerStop();
      } else {
        //console.warn('run once, ran ('+__stFuncExt.countExtRept+') times');
        __stFuncExt.countExtRept++;
        __stFuncExt.__searchTweetsInit();
      }
    }, 1500);

    //onUrlChange()
  } catch (e) {
    //console.warn('error', e);
  }
}
__stFuncExt.__displayOverlayBoard_setup = 0;
__stFuncExt.__displayOverlayBoard = function () {
  //console.warn('setup?');
  try {
    //check if on page
    if (document.querySelectorAll('.__focusOnContent').length == 0) {

      //Check Colour Scheme
      var bgColor = document.querySelector('body').style.backgroundColor;
      var trtColorScheme = 'light';
      if (bgColor == 'rgb(255, 255, 255)') {
        trtColorScheme = 'light';
      }
      if (bgColor == 'rgb(21, 32, 43)') {
        trtColorScheme = 'dim';
      }
      if (bgColor == 'rgb(0, 0, 0)') {
        trtColorScheme = 'dark';
      }

      var ele = document.createElement('div');
      ele.className = '__focusOnContent ' + trtColorScheme;
      ele.innerHTML = ''
        + '<div class="top-item" style="margin-left:25px;">'
        + '<span data-item="close">X</span>'
        + '<span data-item="minimise">Minimise</span>'
        + '<span data-item="lists">Lists</span>'
        + '<span data-item="w-count">Char Count</span>'

        //Add word count
        + '  <div class="word-counterArea" style="display:none">'
        + '    <h3>Character Count</h3><textarea></textarea><span>0 / 280</span>'
        + '  </div>'
        + '</div>'
        + '<div class="holder">'
        + '  <h3 style="display: flex;align-items: center;">My Tweet Ideas <em style="position: relative;top: 1px;margin-left: 5px;font-size: 12px;" class="rdm-prompt">Random Prompt: ' + window.__tweetSuggestPrompts[Math.floor(Math.random() * window.__tweetSuggestPrompts.length)] + '</em></h3>'
        + '  <div class="__whiteboard" placeholder="Write down some tweet ideas here, autosave enabled" contenteditable>....</div>'
        + '</div>';
      document.querySelector('body').appendChild(ele);
      var oW = document.querySelector('header[role="banner"]').offsetWidth;
      if (oW < 50) {
        //console.warn('now width...?');
      }
      document.querySelector('.__focusOnContent').style.width = 'calc(100% - ' + oW + 'px)';
      document.querySelector('.__focusOnContent').style.left = (oW + 1) + 'px';
      document.querySelector('.__focusOnContent').style.display = 'block';
    } else {
      var oW = document.querySelector('header[role="banner"]').offsetWidth;
      document.querySelector('.__focusOnContent').style.width = 'calc(100% - ' + oW + 'px)';
      document.querySelector('.__focusOnContent').style.left = (oW + 1) + 'px';
      document.querySelector('.__focusOnContent').style.display = 'block';


      document.querySelector('.__focusOnContent').classList.remove('minimise');

      var oW = document.querySelector('header[role="banner"]').offsetWidth;
      document.querySelector('.__focusOnContent').style.width = 'calc(100% - ' + oW + 'px)';
      document.querySelector('.__focusOnContent').style.left = (oW + 1) + 'px';

      document.querySelector('.__focusOnContent span[data-item="minimise"]').innerText = 'Minimise';

      document.querySelector('.__focusOnContent .rdm-prompt').innerHTML = 'Random Prompt: ' + window.__tweetSuggestPrompts[Math.floor(Math.random() * window.__tweetSuggestPrompts.length)];
    }


    //console.warn('--cancel here timer-----');
    __stFuncExt.__extTimerStopBlock();


    //Listeners only run once..
    if (__stFuncExt.__displayOverlayBoard_setup == 0) {
      //Prefill
      var whiteboardWords = localStorage.getItem("__trt_whiteboard");
      document.querySelector('.__focusOnContent .__whiteboard').innerHTML = whiteboardWords;
      document.querySelector('.__focusOnContent .__whiteboard').addEventListener('keyup', function (ev) {
        var whiteboardWords = document.querySelector('.__focusOnContent .__whiteboard').innerHTML;
        localStorage.setItem("__trt_whiteboard", whiteboardWords);
        //console.warn('update...', whiteboardWords);
      }, false);

      //also listen to on paste but strip any styling...
      document.querySelector('.__focusOnContent .__whiteboard').addEventListener('paste', (event) => {
        event.preventDefault();

        let data = event.clipboardData.getData('text/plain');
        const newElement = createElementFromHTMLString(data);
        document.execCommand('insertHTML', false, newElement.innerHTML);

        var whiteboardWords = document.querySelector('.__focusOnContent .__whiteboard').innerHTML;
        localStorage.setItem("__trt_whiteboard", whiteboardWords);
        //console.log('update...', whiteboardWords);
      });

      //listener for charcount
      var counterArea = document.querySelector('.word-counterArea textarea');
      counterArea.addEventListener('keyup', (event) => {
        //Count HERE...
        var str = document.querySelector('.word-counterArea textarea').value;
        var countCh = str.length;
        document.querySelector('.word-counterArea span').innerText = countCh + ' / 280';
      });
      counterArea.addEventListener('paste', (event) => {
        setTimeout(function () {
          var str = document.querySelector('.word-counterArea textarea').value;
          var countCh = str.length;
          document.querySelector('.word-counterArea span').innerText = countCh + ' / 280';
        }, 100);
      });

      //charcount - word-counterArea
      document.querySelector('.__focusOnContent span[data-item="w-count"]').addEventListener('click', function () {
        document.querySelector('.word-counterArea').classList.toggle('toggle-hide');
      });


      //lists
      document.querySelector('.__focusOnContent span[data-item="lists"]').addEventListener('click', function () {
        document.querySelector('nav a[aria-label="Lists"]').click();
      });

      //close
      document.querySelector('.__focusOnContent span[data-item="close"]').addEventListener('click', function () {
        document.querySelector('.__focusOnContent').style.display = 'none';
      });
      //minimise toggle
      document.querySelector('.__focusOnContent span[data-item="minimise"]').addEventListener('click', function () {
        //console.warn(document.querySelector('.__focusOnContent').classList);
        if (document.querySelector('.__focusOnContent').classList.contains('minimise')) {
          //remove
          document.querySelector('.__focusOnContent').classList.remove('minimise');

          var oW = document.querySelector('header[role="banner"]').offsetWidth;
          document.querySelector('.__focusOnContent').style.width = 'calc(100% - ' + oW + 'px)';
          document.querySelector('.__focusOnContent').style.left = (oW + 1) + 'px';

          document.querySelector('.__focusOnContent span[data-item="minimise"]').innerText = 'Minimise';
        } else {
          //add
          document.querySelector('.__focusOnContent').classList.add('minimise');

          var minW = document.querySelector('div [aria-label="Timeline: Trending now"]').offsetWidth;
          document.querySelector('.__focusOnContent').style.width = (minW + 40) + 'px';

          document.querySelector('.__focusOnContent span[data-item="minimise"]').innerText = 'Maximise';
        }
      });


      __stFuncExt.__displayOverlayBoard_setup = 1;
    }
  } catch (e) {
    //console.log(e);
    //RUN AGAIN --

    __stFuncExt.__extTimerBlock = setInterval(function () {
      //console.warn('run once, ran ('+__stFuncExt.countExtReptBlock+') times');

      if (__stFuncExt.countExtReptBlock >= 3) {
        //console.warn('cancel timer-----');
        __stFuncExt.__extTimerStopBlock();
      } else {
        __stFuncExt.countExtReptBlock++;
        __stFuncExt.__displayOverlayBoard();
      }
    }, 1500);


  }
}

//document.addEventListener("DOMContentLoaded", __stFuncExt.run_ext);
__stFuncExt.run_ext();

__stFuncExt.__searchTweetsInit = function () {
  var u = window.location.pathname.split('/')[1];
  u = u.split('?')[0];
  var str = '/' + u + '/photo';
  var length = document.querySelector('a[href^="' + str + '" i]');
  try {
    var target = document.querySelector('input[placeholder="Search Twitter"]');
    //console.warn(target, target.placeholder);
    if (length.innerHTML != '' && target.placeholder == 'Search Twitter') {
      __stFuncExt.__extTimerStop();
      __stFuncExt.__searchTweets();
    }
  } catch (e) {
    //console.warn('e',e);
  }
}
__stFuncExt.__searchTweets = function () {

  //console.warn('init search run');
  if (document.querySelector('.WhoToFollow.chrome-ext-userstweets') == null) {
    //console.warn('listen for clicks');

    //Check Colour Scheme
    var bgColor = document.querySelector('body').style.backgroundColor;
    var trtColorScheme = 'light';
    if (bgColor == 'rgb(255, 255, 255)') {
      trtColorScheme = 'light';
    }
    if (bgColor == 'rgb(21, 32, 43)') {
      trtColorScheme = 'dim';
    }
    if (bgColor == 'rgb(0, 0, 0)') {
      trtColorScheme = 'dark';
    }
    //ici
    //bgColor = 'rgb(255, 0, 0)';

    var searchbox = '<div class="WhoToFollow chrome-ext-userstweets ' + trtColorScheme + '" style="display: block;">'
      + '<div class="heading">Search Users Tweets</div>'
      + '<p>Tap away to add your keyword below</p>'
      + '<input type="text" id="chrome-ext-query-input" class="query"/>'
      + '<button class="dosearch follow-btn btn">Search</button>'
      + '</div>'
    var htmlEle = document.createElement('div');
    htmlEle.innerHTML = searchbox;
    var target = document.querySelector('input[placeholder="Search Twitter"]').parentNode.parentNode.parentNode.parentNode
      .parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var before = target.children[2];
    //console.warn('target', target, before);
    target.insertBefore(htmlEle, before);

    document.getElementById('chrome-ext-query-input').onkeypress = function (e) {
      if (!e) e = window.event;
      var keyCode = e.keyCode || e.which;
      if (keyCode == '13') {
        // Enter pressed
        document.querySelector('.chrome-ext-userstweets .dosearch').click();
        return false;
      }
    }
    document.querySelector('.chrome-ext-userstweets .dosearch').addEventListener('click', function () {
      //Get username
      var u = window.location.pathname.split('/')[1];
      u = u.split('?')[0];
      //Get query
      var q = document.querySelector('.chrome-ext-userstweets .query').value;
      window.location = 'https://twitter.com/search?f=tweets&vertical=defaultsrc=typd&q=' + q + '%20from%3A' + u;
    });
  }
}
