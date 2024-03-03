from aiogram.types import Message

from config import config
from .keyboards import get_kb_webapp, kb_admin


async def start_handler(message: Message) -> None:
    user_id = message.from_user.id
    await message.reply("Ас-саляму алейкум,\n"
                        "добро пожаловать в Muslim Fortress!",
                        reply_markup=get_kb_webapp())

    if user_id == config.bot.admin_id:
        await message.answer("Вам доступная админ-панель",
                             reply_markup=kb_admin)
