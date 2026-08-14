const puppeteer = require('puppeteer');
const fs = require('fs');
const { spawn } = require('child_process');

(async () => {
    console.log("Starting server...");
    const server = spawn('npm', ['run', 'dev'], { stdio: 'pipe' });

    // Wait for server to be ready
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log("Starting puppeteer...");
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

    await page.goto('http://localhost:5173/post');
    console.log("Page loaded");

    await new Promise(resolve => setTimeout(resolve, 2000));
    await browser.close();
    server.kill();
})();
