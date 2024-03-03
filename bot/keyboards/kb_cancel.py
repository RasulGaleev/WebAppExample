from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

kb_cancel = ReplyKeyboardMarkup(keyboard=[
    [KeyboardButton(text="Отмена")]],
    resize_keyboard=True,
)
