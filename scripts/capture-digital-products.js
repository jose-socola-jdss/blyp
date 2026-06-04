const { chromium } = require("playwright");
const path = require("path");

const products = [
  ["bolsa-laboral-corporativa", "https://bolsa-laboral-corporativa.vercel.app/"],
  ["chatbot-reglamento-interno", "https://chatbot-reglamento-interno.vercel.app/"],
  ["galeria-eventos-interna", "https://galeria-eventos-interna.vercel.app/"],
  ["creador-perfiles-web", "https://creador-perfiles-web.vercel.app/"],
  ["buzon-ideas-interno", "https://buzon-ideas-interno.vercel.app/"],
  ["directorio-corporativo", "https://directorio-corporativo.vercel.app/"],
  ["agenda-eventos-interna", "https://agenda-eventos-interna.vercel.app/"],
  ["portal-comunicados-internos", "https://portal-comunicados-internos.vercel.app/"],
  ["generador-encuestas", "https://generador-encuestas.vercel.app/"],
  ["biblioteca-documental", "https://biblioteca-documental.vercel.app/"]
];

async function main() {
  console.log("Iniciando captura de pantallas reales...");
  const browser = await chromium.launch({ headless: true });

  for (const [slug, url] of products) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 1920 },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();

    try {
      console.log(`Visitando y capturando: ${slug} (${url})...`);
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      // Espera de 4 segundos para asegurar transiciones/cargas dinámicas completas
      await page.waitForTimeout(4000);
      
      const outputPath = path.resolve(
        __dirname,
        "..",
        "assets",
        "images",
        "portfolio",
        `${slug}.png`
      );
      
      await page.screenshot({
        path: outputPath,
        type: "png"
      });
      console.log(`Captura exitosa: ${slug}.png guardado.`);
    } catch (error) {
      console.error(`Error capturando ${slug}: ${error.message}`);
    } finally {
      await page.close();
      await context.close();
    }
  }

  await browser.close();
  console.log("Proceso de captura completado.");
}

main().catch((error) => {
  console.error("Error en ejecución principal:", error);
  process.exit(1);
});
