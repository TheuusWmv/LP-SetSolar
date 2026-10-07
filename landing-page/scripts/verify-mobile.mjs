import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
const page = await context.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
const out = 'artifacts/mobile';
await mkdir(out, { recursive: true });
const settle = () => page.waitForTimeout(700);
try {
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  for (const width of [320, 360, 390, 430, 640, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await settle();
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow at ${width}`);
    await page.screenshot({ path: `${out}/${width}-hero.png` });
    for (const section of ['about', 'services', 'testimonials']) {
      await page.locator(`#${section}`).scrollIntoViewIfNeeded();
      await settle();
      await page.locator(`#${section}`).screenshot({ path: `${out}/${width}-${section}.png` });
    }
    await page.locator('footer').scrollIntoViewIfNeeded();
    await settle();
    await page.locator('footer').screenshot({ path: `${out}/${width}-footer.png` });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('#services').scrollIntoViewIfNeeded();
  const previous = page.getByRole('button', { name: 'Serviço anterior', exact: true });
  const next = page.getByRole('button', { name: 'Próximo serviço', exact: true });
  const serviceStatus = page.locator('#services [aria-live]');
  assert(await previous.isDisabled());
  for (let i = 1; i < 5; i++) {
    await next.click(); await settle();
    assert.match(await serviceStatus.innerText(), new RegExp(`0${i+1} / 05`));
  }
  assert(await next.isDisabled());
  for (let i = 3; i >= 0; i--) { await previous.click(); await settle(); assert.match(await serviceStatus.innerText(), new RegExp(`0${i+1} / 05`)); }
  const cdp = await context.newCDPSession(page);
  async function swipe(locator, direction = -1) {
    await locator.scrollIntoViewIfNeeded(); await settle();
    const box = await locator.boundingBox();
    const x = box.x + box.width * (direction < 0 ? .8 : .2), y = box.y + Math.min(100, box.height / 2);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    for (let i = 1; i <= 8; i++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + direction * i * 25, y }] });
      await page.waitForTimeout(30);
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await settle();
  }
  await swipe(page.locator('.services-track'));
  assert.match(await serviceStatus.innerText(), /02 \/ 05/);
  assert.equal(await page.locator('.services-track a').count(), 5);
  for (const link of await page.locator('.services-track a').all()) assert.match(await link.getAttribute('href'), /^https:\/\/wa.me\/5562000000000\?text=/);
  const status = page.locator('#testimonials .lg\\:hidden [aria-live]');
  const advance = page.getByRole('button', { name: 'Próxima etapa do depoimento', exact: true });
  const names = [];
  for (let i = 0; i < 12; i++) {
    assert.equal(await status.innerText(), `Cliente ${Math.floor(i/2)+1} de 6 · ${i%2 ? 'Relato' : 'Foto'}`);
    const name = await page.locator('.testimonial-step h3').innerText();
    if (i%2) { assert.equal(name, names.at(-1)); assert(await page.locator('.testimonial-step blockquote').isVisible()); }
    else names.push(name);
    await advance.click(); await settle();
  }
  assert.equal(await status.innerText(), 'Cliente 1 de 6 · Foto');
  await swipe(page.locator('.testimonial-step'));
  assert.equal(await status.innerText(), 'Cliente 1 de 6 · Relato');
  await advance.click(); await advance.click();
  await page.setViewportSize({ width: 1440, height: 844 }); await settle();
  await page.setViewportSize({ width: 390, height: 844 }); await settle();
  assert.equal(await status.innerText(), 'Cliente 2 de 6 · Foto');
  await page.locator('footer').scrollIntoViewIfNeeded();
  for (const detail of await page.locator('.mobile-footer details').all()) {
    assert.equal(await detail.getAttribute('open'), null);
    await detail.locator('summary').focus(); await page.keyboard.press('Enter');
    assert.notEqual(await detail.getAttribute('open'), null);
  }
  assert(await page.locator('.mobile-footer a[href="#faq"]').isVisible());
  assert(await page.locator('.mobile-footer').getByRole('link', { name: /Industrial/ }).isVisible());
  await page.locator('footer').screenshot({ path: `${out}/footer-expanded.png` });
  await page.evaluate(() => window.scrollTo(0, 0)); await settle();
  await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
  await page.screenshot({ path: `${out}/menu.png` });
  await page.getByRole('button', { name: 'Fechar menu', exact: true }).click();
  for (const y of [120, 260]) { await page.evaluate(y => window.scrollTo(0,y), y); await settle(); await page.screenshot({ path: `${out}/notch-${y}.png` }); }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 480 });
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  await page.evaluate(() => window.scrollTo(0,0)); await settle();
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  const hero = page.locator('.solar-hero-canvas');
  assert(await hero.evaluate(el => el.scrollHeight <= el.clientHeight + 1), 'hero content clipped');
  await hero.screenshot({ path: `${out}/large-text-short-screen.png` });
  assert.deepEqual(errors, []);
  console.log('PASS: 8 widths, service arrows/extremes/swipe/CTAs, 12 testimonial steps/swipe/resize, footer keyboard, menu, notch, reduced motion, 200% text and short screen.');
} finally { await browser.close(); }
