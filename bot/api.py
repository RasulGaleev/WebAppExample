import json
import aiohttp
from config import config


class WebAppApi:
    def __init__(self):
        self.main_url = config.bot.web_app_url
        self.headers = {'accept': 'application/json', 'Content-Type': 'application/json'}

    async def request(self, method, endpoint, data=None):
        url = f"{self.main_url}/api/{endpoint}"
        async with aiohttp.ClientSession() as session:
            async with session.request(method, url, headers=self.headers, data=json.dumps(data)) as response:
                try:
                    response.raise_for_status()
                    return await response.json()
                except aiohttp.ClientResponseError as e:
                    print(f"Ошибка при выполнении запроса ({method} {url}): {e}")
                    return None

    async def get_users(self) -> list[dict]:
        return await self.request('GET', 'users')

    async def is_user_exists(self, user_id) -> bool:
        return await self.request('GET', f'users/is_user_exists?user_id={user_id}')

    async def create_user(self, user_data) -> None:
        await self.request('POST', 'users/create', user_data)

    async def create_ad(self, ad_data) -> None:
        await self.request('POST', 'ads/create', ad_data)

    async def get_last_ad(self) -> dict:
        return await self.request('GET', 'ads/last')


web_app_api = WebAppApi()
