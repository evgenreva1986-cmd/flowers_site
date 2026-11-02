// Константы (замени CHAT_ID на свой ID)
const BOT_TOKEN = "9058135119:AAGeqK1zFLu0IF_NLdmSCzIl0aodbRC4EvI";
const CHAT_ID = "641141654";

// Функция отправки сообщения
async function sendTelegramMessage(text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: 641141654,
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

// Пример вызова:
document.addEventListener('DOMContentLoaded', () => {
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