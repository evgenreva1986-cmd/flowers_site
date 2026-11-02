function initChips() {
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  });
}

// Если DOM уже загружен — запускаем сразу
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initChips();
} else {
  // Иначе ждём DOMContentLoaded
  document.addEventListener('DOMContentLoaded', initChips);
}