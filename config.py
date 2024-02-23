from dataclasses import dataclass

from environs import Env


@dataclass()
class Bot:
    token: str
    admin_id: int
    web_app_url: str


@dataclass()
class Database:
    name: str
    user: str
    password: str
    host: str
    port: str


@dataclass()
class Settings:
    bot: Bot
    db: Database


def get_config(path: str):
    env = Env()
    env.read_env(path)

    return Settings(
        bot=Bot(
            token=env.str("BOT_TOKEN"),
            admin_id=env.int("BOT_ADMIN_ID"),
            web_app_url=env.str("BOT_WEB_APP_URL"),
        ),
        db=Database(
            name=env.str("DB_NAME"),
            user=env.str("DB_USER"),
            password=env.str("DB_PASS"),
            host=env.str("DB_HOST"),
            port=env.str("DB_PORT"),
        ),
    )


config = get_config(".env")
