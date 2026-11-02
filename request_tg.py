import requests

# Твой токен бота
TOKEN = "9058135119:AAGeqK1zFLu0IF_NLdmSCzIl0aodbRC4EvI"

# Твой числовой ID получателя
CHAT_ID = "641141654"

# Текст сообщения
TEXT = "Привет! Это тестовое сообщение от твоего бота."

def send_telegram_message(token, chat_id, message):
    # Исправлено: используем переменные token и chat_id вместо ошибочной подстановки
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "HTML"
    }
    
    try:
        response = requests.post(url, json=payload)
        result = response.json()
        
        if result.get("ok"):
            print("✅ Сообщение успешно отправлено!")
        else:
            print(f"❌ Ошибка отправки: {result.get('description')}")
            
    except Exception as e:
        print(f"❌ Произошла ошибка при отправке запроса: {e}")

if __name__ == "__main__":
    send_telegram_message(TOKEN, CHAT_ID, TEXT)