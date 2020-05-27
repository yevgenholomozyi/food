/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabContent.forEach(item => {
      item.style.display = 'none';
    });
  }

  hideTabContent();

  function showTabContent(num = 0) {
    tabContent[num].style.display = 'block';
  }

  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        item.classList.remove('tabheader__item_active');

        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
      target.classList.add('tabheader__item_active');
    }
  }); // Timer

  const deadline = '2020-06-30';

  function getTimeRemaining(remainingTime) {
    let t = Date.parse(remainingTime) - Date.parse(new Date()),
        // converts dates to milsec and finds a diff
    seconds = Math.floor(t / 1000 % 60),
        // converts milsec to sec; divides into 60 (as minutes) and get a remainder
    minutes = Math.floor(t / 1000 / 60 % 60),
        // converts milsec  to min; divides into 60 twice (as min and hours) and get a remainder 
    hours = Math.floor(t / (1000 * 60 * 60) % 24),
        // converts mil mec to hours; divides into 60 twice 
    days = Math.floor(t / 1000 / 60 / 60 / 24); // // converts milmec to days;

    return {
      'total': t,
      'seconds': seconds,
      'minutes': minutes,
      'hours': hours,
      'days': days
    };
  } // end of getTimeRemaining function


  function addZero(num) {
    if (num < 10 && num >= 0) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(endtime) {
    days = document.getElementById('days'), hours = document.getElementById('hours'), minutes = document.getElementById('minutes'), seconds = document.getElementById('seconds'), timeInterval = setInterval(upDateClock, 1000);
    upDateClock(); // udDateClock is called here to prevent a 1 second break between  DOM loading and the timer update

    function upDateClock() {
      let t = getTimeRemaining(endtime);

      if (t.total > 0) {
        days.textContent = addZero(t.days), hours.textContent = addZero(t.hours), minutes.textContent = addZero(t.minutes), seconds.textContent = addZero(t.seconds);
      } else {
        days.textContent = '0', hours.textContent = '0', minutes.textContent = '0', seconds.textContent = '0';
        clearInterval(timeInterval);
      }
    }
  }

  setClock(deadline); // Modal 

  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modalClose = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal'); // open modal window 

  function callModal() {
    modal.classList.add('modal_active');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimer);
  }

  function callModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      callModal();
      window.removeEventListener('scroll', callModalByScroll);
    }
  } // close modal window


  function closeModal() {
    modal.classList.remove('modal_active');
    document.body.style.overflow = 'visible';
  } // Call modal window on click of the button


  modalTrigger.forEach(item => {
    item.addEventListener('click', () => {
      callModal();
    });
  }); // call modal window every 40 sec

  const modalTimeraddEventListener = setTimeout(callModal, 3000); // call modal window on scrolldown 

  window.addEventListener('scroll', callModalByScroll); // close modal window 

  modalClose.addEventListener('click', () => {
    closeModal();
  });
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('modal_active')) {
      closeModal();
    }
  }); // Cards

  const сardContent = [['Это первый заголовок', 'это первый текст', 'это первая цена'], ['Это второй заголовок', 'это второй текст', 'это вторая цена']];

  class Card {}
  /* constructor (classname, number) {
      this.number = number,
      this.elem = document.querySelectorAll(`.${classname}`)[number],
      this.subtitle = this.elem.querySelector(`.${classname}-subtitle`),
      this.descr = this.elem.querySelector(`.${classname}-descr`),
      this.totalPrice = this.elem.querySelector(`.${classname}-total`)
  }
  assignSubtitle(number=this.number) {
      this.subtitle.textContent = сardContent[number][0];
  }
  assignDescr(number=this.number) {
      this.descr.textContent = сardContent[number][1];
  }
  assignTotalPrice(number=this.number) {
      this.totalPrice.textContent = сardContent[number][2];
  }
  }
  const firstCard = new Card('menu__item', 0);
  firstCard.assignSubtitle();
  firstCard.assignDescr();
  firstCard.assignTotalPrice();
  const secondCard = new Card('menu__item', 1);
  secondCard.assignSubtitle();
  secondCard.assignDescr();
  secondCard.assignTotalPrice();
  */

});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map