const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    console.log('------------------------------------------------');
    console.log('SCAN THIS QR CODE WITH YOUR WHATSAPP:');
    qrcode.generate(qr, { small: true });
    console.log('------------------------------------------------');
});

client.on('ready', () => {
    console.log('WhatsApp Bot is ready!');
});

client.on('message', async (message) => {
    const text = message.body.toLowerCase().trim();

    if (text === 'hello' || text === 'hi') {
        await message.reply('Hello! Welcome. How can I help you today?');
    } 
    else if (text === 'price') {
        await message.reply('Our prices:\n- Basic: ₦2,000\n- Premium: ₦5,000\n- Business: ₦15,000');
    }
    else if (text === 'help') {
        await message.reply('Available commands:\n- hello\n- price\n- help');
    }
    else {
        await message.reply('Sorry, I did not understand.\nType *help* to see what I can do.');
    }
});

client.initialize();
