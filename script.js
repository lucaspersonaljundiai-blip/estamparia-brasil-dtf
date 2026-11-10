/* Estamparia Brasil DTF V3. Sem analytics, persistência ou envio automático. */
(function () {
  'use strict';
  const head = document.querySelector('.head');
  const button = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  const header = document.querySelector('.site-header');
  const mobile = window.matchMedia('(max-width: 800px)');
  const updateHeaderOffset = function () {
    document.documentElement.style.setProperty('--header-offset', (header.offsetHeight + 16) + 'px');
  };
  function setOpen(open) {
    head.classList.toggle('menu-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    updateHeaderOffset();
  }
  if (head && button && nav && header) {
    head.classList.add('menu-ready');
    setOpen(false);
    button.addEventListener('click', function () { setOpen(button.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (event) { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { setOpen(false); button.focus(); }
    });
    document.addEventListener('click', function (event) { if (!head.contains(event.target)) setOpen(false); });
    window.addEventListener('resize', function () { if (!mobile.matches) setOpen(false); updateHeaderOffset(); });
    window.addEventListener('load', updateHeaderOffset);
    if ('ResizeObserver' in window) new ResizeObserver(updateHeaderOffset).observe(header);
  }
  document.querySelectorAll('[data-product]').forEach(function (link) {
    link.addEventListener('click', function () {
      const select = document.getElementById('peca');
      if (select) select.value = link.getAttribute('data-product');
    });
  });
  const form = document.getElementById('quote');
  if (!form) return;
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const get = id => document.getElementById(id).value.trim();
    ['nome', 'cidade'].forEach(function (id) {
      const input = document.getElementById(id);
      input.setCustomValidity(get(id) ? '' : 'Preencha este campo.');
      input.addEventListener('input', function () { input.setCustomValidity(''); }, { once: true });
    });
    if (!form.reportValidity()) return;
    const lines = [
      'Olá! Gostaria de solicitar um orçamento na Estamparia Brasil DTF.', '',
      'Nome/empresa: ' + get('nome'), 'Perfil: ' + get('tipo'),
      'Peça: ' + get('peca'), 'Quantidade: ' + get('quantidade'),
      'Modalidade: ' + get('modalidade'), 'Cidade/UF: ' + get('cidade'),
      'Prazo desejado: ' + (get('prazo') || 'A combinar'),
      'Posição/tamanho da estampa: ' + (get('estampa') || 'A definir'),
      'Edital: ' + (get('edital') || 'Não se aplica'),
      'Contato: ' + (get('contato') || 'Não informado'),
      'Detalhes: ' + (get('detalhes') || 'A definir')
    ];
    window.location.href = 'https://wa.me/5511991162998?text=' + encodeURIComponent(lines.join('\n'));
  });
})();
