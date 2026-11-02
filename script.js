document.addEventListener('DOMContentLoaded', () => {
  // --- 1. ЛОГИКА БОКОВОГО МЕНЮ (СЛАЙДЕРА) ---
  const openBtn = document.getElementById('open-slider');
  const closeBtn = document.getElementById('close-slider');
  const overlay = document.getElementById('slider-overlay');
  const slider = document.getElementById('side-slider');
  const sliderLinks = document.querySelectorAll('.slider-nav a');

  if (openBtn && slider) {
    // Функция открытия слайдера
    function openSlider() {
      slider.classList.add('active');
      slider.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Отключаем прокрутку сайта под меню
    }

    // Функция закрытия слайдера
    function closeSlider() {
      slider.classList.remove('active');
      slider.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // Возвращаем прокрутку
    }

    // Слушатели событий для открытия/закрытия
    openBtn.addEventListener('click', openSlider);
    if (closeBtn) closeBtn.addEventListener('click', closeSlider);
    if (overlay) overlay.addEventListener('click', closeSlider);

    // Закрывать слайдер при клике на любую ссылку внутри него
    sliderLinks.forEach(link => {
      link.addEventListener('click', closeSlider);
    });

    // Закрытие по кнопке Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && slider.classList.contains('active')) {
        closeSlider();
      }
    });
  }

  // --- 2. ЛОГИКА ОТПРАВКИ СООБЩЕНИЙ В TELEGRAM ---
  const BOT_TOKEN = "9058135119:AAGeqK1zFLu0IF_NLdmSCzIl0aodbRC4EvI";
  const CHAT_ID = "641141654";

  async function sendTelegramMessage(text) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "HTML"
        })
      });

      const data = await response.json();
      
      if (data.ok) {
        console.log("✅ Сообщение отправлено!");
        return true;
      } else {
        console.error("❌ Ошибка Telegram API:", data.description);
        return false;
      }
    } catch (error) {
      console.error("❌ Ошибка сети:", error);
      return false;
    }
  }

  // Обработчик отправки формы подписки
  const newsletterForm = document.querySelector('.newsletter');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Предотвращаем перезагрузку страницы
      
      const emailInput = document.getElementById('email-subscribe');
      const userEmail = emailInput.value;
      
      const message = `🔔 <b>Новая подписка на акции!</b>\nEmail: ${userEmail}`;
      
      const success = await sendTelegramMessage(message);
      
      if (success) {
        alert("Дякуємо за підписку!");
        emailInput.value = ""; // Очищаем поле ввода
      } else {
        alert("Сталася помилка при відправці. Спробуйте пізніше.");
      }
    });
  }
});