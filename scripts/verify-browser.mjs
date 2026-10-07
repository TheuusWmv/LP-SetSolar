import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "../landing-page/node_modules/playwright/index.mjs";
const origin = process.argv[2];
if (!origin) throw new Error("Informe a URL do preview ou da produção.");
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--disable-quic"],
});
await mkdir("artifacts", { recursive: true });
try {
  for (const viewport of [
    { width: 360, height: 740 },
    { width: 412, height: 823 },
    { width: 1440, height: 900 },
  ]) {
    const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto(origin, { waitUntil: "networkidle" });
    assert.equal(await page.locator("h1").count(), 1);
    assert.ok(await page.locator("h1").isVisible());
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      true,
    );
    if (viewport.width < 768) {
      await page
        .getByRole("button", { name: "Abrir menu", exact: true })
        .click();
      await page.locator("#hero-mobile-menu").waitFor({ state: "visible" });
      await page
        .getByRole("button", { name: "Fechar menu", exact: true })
        .click();
      assert.equal(await page.locator("#hero-mobile-menu").isVisible(), false);
    }
    const services = page.locator("#services");
    await services.scrollIntoViewIfNeeded();
    await page.locator("[data-island=Services][data-hydrated=true]").waitFor();
    await page.waitForTimeout(250);
    await page.waitForLoadState("networkidle");
    if (viewport.width >= 1024) {
      const tabs = services.locator("button").filter({ hasText: /Comercial/ });
      await tabs.first().click();
      assert.ok(
        await services
          .getByRole("heading", { name: /Comercial/ })
          .first()
          .isVisible(),
      );
    }
    await page.locator("#testimonials").scrollIntoViewIfNeeded();
    await page
      .locator("[data-island=Testimonials][data-hydrated=true]")
      .waitFor();
    await page.waitForTimeout(250);
    await page.waitForLoadState("networkidle");
    const next = page.getByRole("button", {
      name:
        viewport.width < 1024
          ? "Próxima etapa do depoimento"
          : "Próximo depoimento",
      exact: true,
    });
    await next.first().click();
    if (viewport.width < 1024)
      await page
        .getByText("Avaliação 1 de", { exact: false })
        .filter({ hasText: "Depoimento" })
        .waitFor();
    const question = page.locator("#faq-2 summary");
    await question.scrollIntoViewIfNeeded();
    await question.click();
    assert.equal(await page.locator("#faq-2").getAttribute("open"), "");
    assert.ok(await page.locator("#faq-2 p").isVisible());
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    await page.screenshot({
      path: "artifacts/viewport-" + viewport.width + ".png",
    });
    assert.deepEqual(errors, [], errors.join("\n"));
    console.log(
      "OK " +
        viewport.width +
        "px: menu, serviços, depoimentos, FAQ e console.",
    );
    await page.close();
  }
  for (const viewport of [{width:412,height:823},{width:1440,height:900}]) {
    const criticalPage = await browser.newPage({viewport});
    await criticalPage.route('**/*.css',route=>route.abort());
    await criticalPage.goto(origin,{waitUntil:'networkidle'});
    const styles = await criticalPage.locator('.solar-hero h1 > span').evaluate(element=>({size:parseFloat(getComputedStyle(element).fontSize),color:getComputedStyle(element).color}));
    assert.equal(styles.size,viewport.width<768?34.4:72);
    assert.equal(styles.color,'rgb(255, 255, 255)');
    assert.equal(await criticalPage.locator('.solar-hero picture img').evaluate(element=>getComputedStyle(element).objectFit),'cover');
    assert.ok(await criticalPage.locator('.solar-hero h1').isVisible());
    await criticalPage.close();
  }
  console.log('OK CSS inline: primeira tela mantém tipografia e imagem sem depender de arquivos CSS externos.');
  const page = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 412, height: 823 },
  });
  await page.goto(origin);
  assert.ok(await page.locator("h1").isVisible());
  await page.locator("#faq-2 summary").click();
  assert.ok(await page.locator("#faq-2 p").isVisible());
  const data = JSON.parse(
    await page.locator('script[type="application/ld+json"]').textContent(),
  );
  const faqs = data["@graph"].find(
    (item) => item["@type"] === "FAQPage",
  ).mainEntity;
  for (let i = 0; i < faqs.length; i++)
    assert.equal(
      (await page.locator("#faq-" + (i + 1) + " p").textContent()).trim(),
      faqs[i].acceptedAnswer.text,
    );
  assert.ok(
    data["@graph"].some(
      (item) =>
        item["@type"] === "LocalBusiness" &&
        item.address.addressCountry === "BR",
    ),
  );
  console.log(
    "OK sem JavaScript: conteúdo, FAQ e dados estruturados correspondem ao HTML.",
  );
} finally {
  await browser.close();
}
