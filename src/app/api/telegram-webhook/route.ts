// pages/api/telegram-webhook.ts
import { Markup, Telegraf } from 'telegraf';

// Инициализация бота с использованием токена из переменных окружения
const bot = new Telegraf(process.env.NEXT_TELEGRAM_BOT_TOKEN || '');
const WEB_APP_URL = "t.me/Miktool_bot/Miktool";

bot.command("inlinekb", ctx =>
	ctx.reply(
		"Hello! You can open the Miktool app by clicking the button below.",
		Markup.inlineKeyboard([Markup.button.webApp("Launch", WEB_APP_URL)]),
	),
);

bot.launch();