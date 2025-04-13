import { global } from "./global.js";
import { getData } from "./api/getData.js";
import { initSwiper } from "./components/swiper.js";
import {
  cardsTemplate,
  cardsTemplateWithSlider,
} from "./utils/generateTemplate.js";

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

      const showingFilms = async (endpoint, containerSelector, idParam) => {
        try {
          const data1 = await getData(endpoint);
          const results1 = data1.results;
          cardsTemplate(endpoint, containerSelector, idParam, results1);
        } catch (error) {
          console.error("Ошибка:", error);
        }
      };
      showingFilms("movie/popular", ".popular-movies", "movie");

      const tabs = document.querySelectorAll(".tabs__btn");
      const contents = document.querySelectorAll(".tabs__content");
      
      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          // Удаляем класс 'active' у всех табов
          tabs.forEach((t) => t.classList.remove("tabs__btn--active"));
      
          // Добавляем класс 'active' к текущему табу
          tab.classList.add("tabs__btn--active");
      
          // Получаем путь для контента из data-tabs-path
          const target = tab.getAttribute("data-tabs-path");
          console.log(`Active tab target: ${target}`); // Логируем путь активного таба
      
          // Удаляем класс 'tabs__content--active' у всех контентных блоков
          contents.forEach((content) => {
            content.classList.remove("tabs__content--active");
            console.log(`Removed active class from: ${content.dataset.tabsTarget}`);
          });
      
          // Находим соответствующий контент по data-tabs-target
          const activeContent = document.querySelector(`
            .tabs__content[data-tabs-target="${target}"]`
          );
      
          if (activeContent) {
            activeContent.classList.add("tabs__content--active");
            console.log(`Added active class to: ${activeContent.dataset.tabsTarget}`);
          } else {
            console.error(`No content found for target: ${target}`);
          }
      
          // Загружаем контент в зависимости от выбранного таба
          loadContent(target);
        });
      });
      // Функция для загрузки контента в зависимости от выбранного таба
      const loadContent = (path) => {
        // Здесь вы можете добавить логику для загрузки контента
        // Например, меняем текст в зависимости от выбранного таба
        if (path === "movies") {
          const showingFilms = async (endpoint, containerSelector, idParam) => {
            try {
              const data2 = await getData(endpoint);
              const results2 = data2.results;
              console.log(data2);
              cardsTemplate(endpoint, containerSelector, idParam, results2);
            } catch (error) {
              console.error("Ошибка:", error);
            }
          };
          showingFilms("movie/popular", ".popular-movies", "movie");
          // Дополнительная логика для загрузки фильмов
        } else if (path === "shows") {
          const showingTV = async (endpoint, containerSelector, idParam) => {
            try {
              const data3 = await getData(endpoint);
              const results3 = data3.results;
              console.log(results3);
              cardsTemplate(endpoint, containerSelector, idParam, results3);
            } catch (error) {
              console.error("Ошибка:", error);
            }
          };
          showingTV("tv/popular", ".popular-tv", "shows");
          // Дополнительная логика для загрузки шоу
        }
      };
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
