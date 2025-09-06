import {
  alert,
  defaultModules,
  info,
  success,
  error,
} from "../../node_modules/@pnotify/core/dist/PNotify.js";
import * as PNotifyMobile from "../../node_modules/@pnotify/mobile/dist/PNotifyMobile.js";
import "@pnotify/core/dist/BrightTheme.css";

defaultModules.set(PNotifyMobile, {});

// Можливі клавіші
const keys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
let currentKeyIndex = 0;

// Елемент для відображення підказки
const keyElement = document.querySelector("#key");

// Функція показу поточної клавіші
const showKey = () => {
  keyElement.textContent = `"${keys[currentKeyIndex]}"`;
};
showKey();

// Обробник натискання клавіш
document.addEventListener("keydown", (evt) => {
  const press = evt.key.toLowerCase(); // виправлено
  const expected = keys[currentKeyIndex];

  if (press === expected) {
    success({
      title: "Success!",
      text: `Вірно: "${expected}"`,
      delay: 1000,
    });

    // перехід до наступної клавіші
    currentKeyIndex = (currentKeyIndex + 1) % keys.length;
    showKey();
  } else {
    error({
      title: "Помилка!",
      text: `Треба було натиснути "${expected}", а ти натиснув "${press}"`,
      delay: 1500,
    });
  }
});

// Блокуємо дію за замовчуванням
document.addEventListener("keypress", (evt) => {
  evt.preventDefault();
});

// Кнопка "Нова гра"
const btnElement = document.querySelector(".game-button");

const newGame = () => {
  currentKeyIndex = 0;
  showKey();
};

btnElement.addEventListener("click", () => {
  info({
    title: "Нова гра!",
    text: "Починай знову 🚀",
    delay: 1500,
  });
  newGame();
});
