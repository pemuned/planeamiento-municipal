const BASE_URL = 'https://pemuned.github.io/mult-2026-planeamiento-municipal/site/';


document.addEventListener('DOMContentLoaded', async () => {

  await loadIncludes();

  applyBaseUrls();

  initMobileMenu();

  initFontSizeControl();

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


/* ==========================================
   CONTROL DE TAMAÑO DE TEXTO
   ========================================== */

const FONT_SIZE_KEY = 'municipal-font-size';

const FONT_SIZES = {
  normal: 1,
  medium: 1.20,
  large: 1.4
};


/**
 * Inicializa el control de tamaño de texto.
 */
function initFontSizeControl() {

  const buttons = document.querySelectorAll(
    '.font-size-btn'
  );

  const contents = document.querySelectorAll(
    '.font-adjustable-content'
  );

  if (!contents.length) {
    return;
  }

  // Recuperar preferencia guardada
  let savedSize = 'normal';

  try {
    savedSize = localStorage.getItem(FONT_SIZE_KEY)
      || 'normal';
  } catch (error) {
    console.warn('No se pudo leer la preferencia.');
  }

  // Aplicar tamaño inicial
  applyFontSize(savedSize);

  // Eventos de los botones
  buttons.forEach(button => {

    button.addEventListener('click', () => {

      const size = button.dataset.fontSize;

      if (!Object.hasOwn(FONT_SIZES, size)) {
        return;
      }

      applyFontSize(size);

      // Guardar preferencia
      try {
        localStorage.setItem(FONT_SIZE_KEY, size);
      } catch (error) {
        console.warn('No se pudo guardar la preferencia.');
      }

    });

  });

}


/**
 * Aplica el tamaño seleccionado.
 */
function applyFontSize(size) {

  if (!Object.hasOwn(FONT_SIZES, size)) {
    size = 'normal';
  }

  document.querySelectorAll(
    '.font-adjustable-content'
  ).forEach(content => {

    content.style.setProperty(
      '--content-font-scale',
      FONT_SIZES[size]
    );

  });

  // Actualizar estado accesible de botones
  document.querySelectorAll(
    '.font-size-btn'
  ).forEach(button => {

    const active = button.dataset.fontSize === size;

    button.setAttribute(
      'aria-pressed',
      String(active)
    );

  });

  // Escalar también la etiqueta del control
  document.querySelectorAll('.font-size-toolbar')
      .forEach(toolbar => {

          toolbar.style.setProperty(
              '--content-font-scale',
              FONT_SIZES[size]
          );

      });

}



