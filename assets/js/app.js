const BASE_URL = '/mult-2026-planeamiento-municipal/site/';

document.addEventListener('DOMContentLoaded', () => {
  loadIncludes();
  applyBaseUrls();
});

async function loadIncludes() {
  const elements = document.querySelectorAll('[data-include]');

  for (const element of elements) {
    const file = element.getAttribute('data-include');

    try {
      const response = await fetch(file);

      if (!response.ok) {
        throw new Error(`No se pudo cargar: ${file}`);
      }

      element.innerHTML = await response.text();

    } catch (error) {
      console.error(error);
    }
  }

  applyBaseUrls();
}

function applyBaseUrls() {

  document.querySelectorAll('[data-src]').forEach(el => {
    el.src = BASE_URL + el.dataset.src;
  });

  document.querySelectorAll('[data-href]').forEach(el => {
    el.href = BASE_URL + el.dataset.href;
  });

}