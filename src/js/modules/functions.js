// Проверка поддержки webp
export function isWebp() {
  function testWebp(callback) {
    const webP = new Image();
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    webP.onload = webP.onerror = () => {
      callback(webP.height == 2);
    };
  }

  testWebp(support => {
    let className = (support === true) ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  });
}