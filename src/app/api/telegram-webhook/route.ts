// pages/api/telegram-webhook.ts
import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { Markup, Telegraf } from 'telegraf';

// Инициализация бота с использованием токена из переменных окружения
const bot = new Telegraf(process.env.NEXT_TELEGRAM_BOT_TOKEN || '');
const WEB_APP_URL = "t.me/Miktool_bot/Miktool";

bot.on("text", ctx => ctx.reply("Hello"));

bot.command("inlinekb", ctx =>
	ctx.reply(
		"Hello! You can open the Miktool app by clicking the button below.",
		Markup.inlineKeyboard([Markup.button.webApp("Launch", WEB_APP_URL)]),
	),
);

bot.launch();

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        await bot.handleUpdate(req.body, res);
        return NextResponse.json({ message:'Updated' }, { status: 200 })
    } catch (error) {
        console.error('Error handling update:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

}