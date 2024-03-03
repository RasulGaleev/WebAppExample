from typing import Callable, Dict, Any, Awaitable, Union

from aiogram import BaseMiddleware
from aiogram.types import Message, CallbackQuery

from .api import web_app_api


class RegisterCheck(BaseMiddleware):

    def __init__(self):
        pass

    async def __call__(
            self,
            handler: Callable[[Message, Dict[str, Any]], Awaitable[Any]],
            event: Union[Message, CallbackQuery],
            data: Dict[str, Any]
    ) -> Any:
        user = event.from_user
        is_user_exists = await web_app_api.is_user_exists(user_id=user.id)
        if not is_user_exists:
            await web_app_api.create_user(user_data={
                "user_id": user.id,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.first_name
            })

        return await handler(event, data)
