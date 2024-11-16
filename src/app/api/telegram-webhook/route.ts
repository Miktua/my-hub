// pages/api/telegram-webhook.ts
import { NextResponse, type NextRequest } from 'next/server'
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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        if(!body) return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        await bot.handleUpdate(body);
        return new Response('Updated', { status: 200 })
    } catch (error) {
        console.error('Error handling update:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}