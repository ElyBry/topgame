const CACHE_NAME = "chessify-cache-v1";
const ASSETS = [
  "/",                 // Главная страница
  "/index.html",       // Основной HTML-файл
  //"/styles.css",       // Стили
  "/src/main.tsx",        // Основной JS-код
  //"/chess.js",         // Логика шахмат
  // "/assets/board.png",
  // "/assets/pieces.png",
  // "/assets/sounds/move.mp3",
  // "/assets/sounds/capture.mp3",
];

// Установка Service Worker и кеширование ресурсов
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache and caching assets");
      return cache.addAll(ASSETS);
    })
  );
});

// Перехват запросов и загрузка из кеша, если нет интернета
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(() => caches.match("/index.html")) // Если ничего не найдено, грузим index.html
  );
});

// Очистка старого кеша при обновлении Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});
