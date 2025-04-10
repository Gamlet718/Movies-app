import { global } from "./global.js";
import { getData } from "./api/getData.js";
import { initSwiper } from "./components/swiper.js";
import { cardsTemplateWithSlider } from "./utils/generateTemplate.js";

/**
 * Инициализирует функции в зависимости от страницы.
 */
function init() {
  switch (global.currentPage) {
    // Если текущая страница корневая или index.html
    case "/":
    case "/index.html":
      // Вызываем функции для отображения фильмов в прокате (слайдер), а также популярных фильмов и сериалов
      const fetchData = async (movie, endpoint) => {
        try {
          const data = await getData(endpoint); // Вызов функции getData с динамическим эндпоинтом
          const results = data.results;
          // Передаем results в функцию cardsTemplateWithSlider
          cardsTemplateWithSlider(movie, endpoint, results);
        } catch (error) {
          console.error("Ошибка:", error);
        }
      };

      // Пример вызова с разными эндпоинтами
      fetchData(movie, "movie/now_playing");
      break;
    case "/movie-details.html":
      // Вызываем функцию для отображения деталей о фильме
      break;
    case "/tv-details.html":
      // Вызываем функцию для отображения деталей о сериале
      break;
    case "/search.html":
      // Вызываем функцию для выполнения поиска
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);
