// pages/api/telegram-webhook.ts
export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import { Bot, InlineKeyboard, webhookCallback } from 'grammy'

const TOKEN = process.env.NEXT_TELEGRAM_BOT_TOKEN || ''
const WEB_APP_URL = process.env.NEXT_MIKTOOL_APP_URL || '';

if (!TOKEN) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.')


const bot = new Bot(TOKEN)

// bot.on('message:text', async (ctx) => {
//   await ctx.reply(ctx.message.text)
// })
console.log('TOKEN',TOKEN)
console.log('WEB_APP_URL',WEB_APP_URL)
const inlineKeyboard = new InlineKeyboard().webApp("Launch", {url: WEB_APP_URL});


bot.command("start", async (ctx) => {
  await ctx.reply("Hello! You can open the Miktool app by clicking the button below.", { reply_markup: inlineKeyboard });
});
bot.catch((err) => {
    console.error("Error in bot:", err);
});

export const POST = webhookCallback(bot, 'std/http')