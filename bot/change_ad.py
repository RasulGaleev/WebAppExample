import os.path

from aiogram import types, Bot
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import StatesGroup, State
import validators
from .api import web_app_api
from .keyboards import kb_cancel, kb_admin


class AdStates(StatesGroup):
    waiting_for_gif = State()
    waiting_for_url = State()


async def ad_handler(message: types.Message, state: FSMContext) -> None:
    await state.set_state(AdStates.waiting_for_gif)
    await message.answer("Отправьте GIF файл для рекламы:", reply_markup=kb_cancel)


async def process_ad_gif_handler(message: types.Message, state: FSMContext, bot: Bot) -> types.Message:
    text = message.text
    gif_document = message.document

    if text == "Отмена":
        await state.clear()
        return await message.answer("Рассылка отменена", reply_markup=kb_admin)

    filename = '.'.join(gif_document.file_name.split('.')[:-1])
    if filename.endswith(".gif"):
        await bot.download(file=gif_document.file_id, destination=os.path.join("app", "static", "ads", filename))
        await state.update_data(gif_filename=filename)
        await state.set_state(AdStates.waiting_for_url)
        await message.answer("Отправьте ссылку для рекламы")
    else:
        await message.answer("Отправьте файл с разрешением GIF")


async def process_ad_url_handler(message: types.Message, state: FSMContext) -> types.Message:
    text = message.text
    data = await state.get_data()
    gif_filename = data['gif_filename']

    if text == "Отмена":
        await state.clear()
        return await message.answer("Рассылка отменена", reply_markup=kb_admin)

    if validators.url(text):
        await web_app_api.create_ad(ad_data={
            "img": gif_filename,
            "url": text
        })
        await message.answer("Реклама успешно обновлена", reply_markup=kb_admin)
    else:
        await message.answer("Пожалуйста, введите корректную ссылку")
