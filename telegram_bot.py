import asyncio
import logging

from aiogram import Bot, Dispatcher, F
from aiogram.filters import CommandStart

from bot import RegisterCheck, start_handler, sender_handler, process_sender_handler, SenderStates, \
    ad_handler, process_ad_gif_handler, process_ad_url_handler, AdStates
from config import config


async def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        filename="bot.log",
        format="%(asctime)s - [%(levelname)s]: %(message)s",
    )

    bot = Bot(token=config.bot.token)
    dp = Dispatcher()

    dp.message.middleware(RegisterCheck())
    dp.message.register(start_handler, CommandStart())
    dp.message.register(sender_handler, F.text == "Рассылка")
    dp.message.register(ad_handler, F.text == "Реклама")
    dp.message.register(process_sender_handler, SenderStates.waiting_for_message)
    dp.message.register(process_ad_gif_handler, AdStates.waiting_for_gif)
    dp.message.register(process_ad_url_handler, AdStates.waiting_for_url)
    await dp.start_polling(bot)


if __name__ == '__main__':
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        print('Bot stopped')
