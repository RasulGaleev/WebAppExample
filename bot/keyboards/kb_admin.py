from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

kb_admin = ReplyKeyboardMarkup(keyboard=[[KeyboardButton(text="Рассылка")],
                                         [KeyboardButton(text="Реклама")]],
                               resize_keyboard=True)
