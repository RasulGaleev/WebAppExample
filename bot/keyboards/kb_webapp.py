from aiogram.types import WebAppInfo, InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder

from config import config


def get_kb_webapp() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="Старт", web_app=WebAppInfo(url=config.bot.web_app_url))
    return builder.as_markup()
