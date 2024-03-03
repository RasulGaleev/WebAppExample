import asyncio
import logging
from typing import Optional

from aiogram import Bot, types
from aiogram.exceptions import TelegramRetryAfter
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import StatesGroup, State
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

from .api import web_app_api
from .keyboards import kb_admin, kb_cancel


class SenderStates(StatesGroup):
    waiting_for_message = State()


async def sender_handler(message: types.Message, state: FSMContext) -> None:
    await state.set_state(SenderStates.waiting_for_message)
    await message.answer("Отправьте сообщение для рассылки:",
                         reply_markup=kb_cancel)


async def send_message(user_id: int, content_type: str, file_id: Optional[str], text: str, bot: Bot) -> bool:
    try:
        if content_type == 'video':
            await bot.send_video(chat_id=user_id, video=file_id, caption=text)
        elif content_type == 'photo':
            await bot.send_photo(chat_id=user_id, photo=file_id, caption=text)
        else:
            await bot.send_message(chat_id=user_id, text=text)

    except TelegramRetryAfter as e:
        await asyncio.sleep(e.retry_after)
        return await send_message(user_id=user_id, content_type=content_type, file_id=file_id, text=text, bot=bot)
    except Exception as ex:
        logging.error(f"Ошибка при рассылке: {ex}")
        return False
    else:
        return True


async def process_sender_handler(message: types.Message, bot: Bot, state: FSMContext) -> Optional[types.Message]:
    text = message.text
    if text == "Отмена":
        await state.clear()
        return await message.answer("Рассылка отменена", reply_markup=kb_admin)

    if message.video:
        content_type = 'video'
        file_id = message.video.file_id
        text = message.caption
    elif message.photo:
        content_type = 'photo'
        file_id = message.photo[-1].file_id
        text = message.caption
    elif text:
        content_type = 'text'
        file_id = None
    else:
        return await message.answer("Отправьте сообщение с видео, фото или просто с текстом для рассылки")

    await state.clear()

    users = await web_app_api.get_users()
    counter = 0
    for user in users:
        if await send_message(user_id=user['user_id'], content_type=content_type, text=text, file_id=file_id, bot=bot):
            counter += 1
        await asyncio.sleep(0.05)

    await message.answer(f"Рассылка отправлена: {counter} пользователям", reply_markup=kb_admin)
