const { chromium } = require("playwright");
const path = require("path");

const shots = [
  ["invest-in-latam", "https://investinlatam.es/"],
  ["lumina-tueste", "https://lumina-tueste.vercel.app/"],
  ["vitacubo", "https://vitacubo.vercel.app/"],
  ["kognivia", "https://kognivia.vercel.app/"],
  ["auralino", "https://auralino.vercel.app/"],
  ["nexoflow", "https://nexoflow-pi.vercel.app/"],
  ["valera-montes", "https://valera-montes.vercel.app/"],
  ["brisas-paramo", "https://brisas-paramo.vercel.app/"],
  ["serenoespacio", "https://serenoespacio.vercel.app/"],
  ["horizonte-cero", "https://horizonte-cero.vercel.app/"],
  ["epica-eventos", "https://epica-eventos.vercel.app/"],
  ["trama-textura", "https://trama-textura.vercel.app/"],
  ["sebastian-varela", "https://sebastian-varela.vercel.app/"],
  ["horno-mila", "https://horno-mila.vercel.app/"],
  ["hierro-ferreo", "https://hierro-ferreo.vercel.app/"],
  ["raices-vivas", "https://raices-vivas.vercel.app/"],
  ["arcobase", "https://arcobase.vercel.app/"],
  ["voltruta", "https://voltruta.vercel.app/"],
  ["canis-fel", "https://canis-fel.vercel.app/"],
  ["croma-digital", "https://croma-digital.vercel.app/"],
];

async function main() {
  const browser = await chromium.launch({ headless: true });

  for (const [slug, url] of shots) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 2400 },
      deviceScaleFactor: 1,
    });

    try {
      console.log(`Capturing ${slug}...`);
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.waitForTimeout(2500);
      const outputPath = path.resolve(
        __dirname,
        "..",
        "assets",
        "images",
        "portfolio",
        `${slug}.jpg`
      );
      await page.screenshot({
        path: outputPath,
        type: "jpeg",
        quality: 82,
      });
    } catch (error) {
      console.error(`Failed ${slug}: ${error.message}`);
      process.exitCode = 1;
    } finally {
      await page.close();
    }
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
