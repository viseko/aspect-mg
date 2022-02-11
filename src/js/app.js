import * as flsFunctions from "./modules/functions.js";
import {adaptiveMove} from "./modules/adaptive-move.js";

// Запуск основных функций
flsFunctions.isWebp();
adaptiveMove();

// Состояния страницы
let isMenuOpened = false;

// Мобильное меню
const menuBtn = document.querySelector("#js-menu-btn");
const menuCloseBtn = document.querySelector("#js-menu-close");

function closeMenu() {
  document.documentElement.classList.remove("_menu-open");
  menuBtn.focus();
  isMenuOpened = false;
}

function openMenu() {
  document.documentElement.classList.add("_menu-open");
  menuCloseBtn.focus();
  isMenuOpened = true;
}

menuBtn.addEventListener("click", openMenu);
menuCloseBtn.addEventListener("click", closeMenu);

// Функции оверлея
const overlay = document.querySelector("#js-page-overlay");
overlay.onclick = () => {
  if (isMenuOpened) closeMenu();
};
