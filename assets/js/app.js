const BASE_URL = '/planeamiento-municipal/';


document.addEventListener('DOMContentLoaded', async () => {

  await loadIncludes();

  applyBaseUrls();

  initMobileMenu();

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


/* ==========================================
   MOBILE MENU
   ========================================== */

function initMobileMenu() {

  const openButton = document.querySelector('.mobile-menu-toggle');

  const menu = document.getElementById('mobileMenu');

  const overlay = document.getElementById('mobileMenuOverlay');

  const closeButton = document.getElementById('mobileMenuClose');


  if (!openButton || !menu || !overlay) {
    return;
  }


  function openMenu() {

    menu.classList.add('is-open');

    overlay.classList.add('is-open');

    document.body.classList.add('mobile-menu-open');

    openButton.setAttribute('aria-expanded', 'true');

  }


  function closeMenu() {

    menu.classList.remove('is-open');

    overlay.classList.remove('is-open');

    document.body.classList.remove('mobile-menu-open');

    openButton.setAttribute('aria-expanded', 'false');

  }


  /* ABRIR */
  openButton.addEventListener('click', openMenu);


  /* CERRAR CON X */
  if (closeButton) {

    closeButton.addEventListener('click', closeMenu);

  }


  /* CERRAR TOCANDO FUERA */
  overlay.addEventListener('click', closeMenu);


  /* CERRAR CON ESC */
  document.addEventListener('keydown', event => {

    if (
      event.key === 'Escape' &&
      menu.classList.contains('is-open')
    ) {

      closeMenu();

    }

  });

}
