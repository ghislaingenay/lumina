import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "node:child_process";
import { glob } from "glob";
import sharp from "sharp";

// # ETC1S only (no Draco)
// npx tsx compress.ts models

// # ETC1S + Draco
// npx tsx compress.ts models --draco

// # All passes with Draco
// npx tsx compress.ts --draco

// npx tsx compress.ts models
// npx tsx compress.ts textures,pictures

// ─── Configuration ──────────────────────────────────────────────────────────────

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

// ─── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Run a shell command and return a promise that resolves with the exit code.
 */
function exec(command: string, args: (string | number)[]): Promise<number> {
  return new Promise((resolve, reject) => {
    console.log(`\n> ${command} ${args.join(" ")}`);

    const child = spawn(command, args.map(String), { stdio: "inherit" });
    child.on("close", (code) => resolve(code ?? 1));
    child.on("error", reject);
  });
}

/**
 * Run commands sequentially for each item in the list.
 */
async function sequential<T>(
  items: T[],
  fn: (item: T) => Promise<void>,
): Promise<void> {
  for (const item of items) await fn(item);
}

// ─── 1. Models — ETC1S texture compression + optional Draco geometry compression

async function compressModels(draco: boolean): Promise<void> {
  console.log("\n══════════════════════════════════════════════");
  console.log(`  Models — ETC1S${draco ? " + Draco" : ""} compression`);
  console.log("══════════════════════════════════════════════");

  const files = await glob(`${PUBLIC_DIR}/**/*.glb`, {
    ignore: {
      ignored: (p) => /-(draco|ktx|compressed)\.glb$/.test(p.name),
    },
  });

  if (files.length === 0) {
    console.log("No .glb files found.");
    return;
  }

  await sequential(files, async (inputFile) => {
    const baseName = inputFile.replace(/\.glb$/, "");
    const etc1sFile = `${baseName}-compressed.glb`;

    console.log(`\n── Compressing model: ${path.basename(inputFile)}`);

    // Step 1: ETC1S texture compression (KTX2 basis)
    const etc1sCode = await exec("gltf-transform", [
      "etc1s",
      inputFile,
      etc1sFile,
      "--quality",
      255,
      "--verbose",
    ]);

    if (etc1sCode !== 0) {
      console.error(`  ✗ ETC1S failed for ${path.basename(inputFile)}`);
      return;
    }

    // Step 2: Draco geometry compression (optional)
    if (draco) {
      const dracoCode = await exec("gltf-transform", [
        "draco",
        etc1sFile,
        etc1sFile, // overwrite in-place
        "--method",
        "edgebreaker",
        "--quantization-volume",
        "mesh",
        "--quantize-position",
        14,
        "--quantize-normal",
        10,
        "--quantize-texcoord",
        12,
        "--quantize-color",
        8,
        "--quantize-generic",
        8,
      ]);

      if (dracoCode !== 0)
        console.error(`  ✗ Draco failed for ${path.basename(inputFile)}`);
      else console.log(`  ✓ ${path.basename(etc1sFile)}`);
    } else {
      console.log(`  ✓ ${path.basename(etc1sFile)} (no Draco)`);
    }
  });
}

// ─── 2. Textures — PNG / JPG → KTX2 via toktx ──────────────────────────────

interface KtxPreset {
  match: RegExp;
  flags: string;
}

const KTX_PRESETS: KtxPreset[] = [
  // Normal maps — need high precision, use UASTC + linear + RG
  {
    match: /_nor[_.]|_normal[_.]/i,
    flags:
      "--nowarn --2d --t2 --encode uastc --uastc_quality 4 --zcmp 18 --genmipmap --assign_oetf linear --target_type RG",
  },
  // ARM / ORM / roughness-metallic maps — linear, ETC1S, RGB
  {
    match: /_arm[_.]|_orm[_.]|_roughness|_metallic|_ao[_.]/i,
    flags:
      "--nowarn --2d --t2 --encode etc1s --qlevel 255 --clevel 4 --genmipmap --assign_oetf linear --target_type RGB",
  },
  // Diffuse / albedo / base-color maps — sRGB, ETC1S, RGB
  {
    match: /_diff[_.]|_albedo[_.]|_basecolor[_.]|_color[_.]/i,
    flags:
      "--nowarn --2d --t2 --encode etc1s --qlevel 255 --clevel 4 --genmipmap --assign_oetf srgb --target_type RGB",
  },
];

// Fallback: sRGB, ETC1S, RGBA (handles PNGs with alpha)
const KTX_DEFAULT =
  "--nowarn --2d --t2 --encode etc1s --qlevel 255 --clevel 4 --genmipmap --assign_oetf srgb --target_type RGBA";

async function compressTextures(): Promise<void> {
  console.log("\n══════════════════════════════════════════════");
  console.log("  Textures — PNG / JPG → KTX2");
  console.log("══════════════════════════════════════════════");

  const files = await glob(`${PUBLIC_DIR}/textures/**/*.{png,jpg,jpeg}`);

  if (files.length === 0) {
    console.log("No texture files found.");
    return;
  }

  await sequential(files, async (inputFile) => {
    const ktxFile = inputFile.replace(/\.(png|jpe?g)$/i, ".ktx2");

    // Pick preset based on filename
    const preset = KTX_PRESETS.find((p) => p.match.test(inputFile));
    const flags = preset ? preset.flags : KTX_DEFAULT;

    console.log(`\n── ${path.basename(inputFile)} → ${path.basename(ktxFile)}`);

    const code = await exec("toktx", [...flags.split(" "), ktxFile, inputFile]);

    if (code !== 0)
      console.error(`  ✗ KTX2 encoding failed for ${path.basename(inputFile)}`);
    else console.log(`  ✓ ${path.basename(ktxFile)}`);
  });
}

// ─── 3. Pictures — PNG / JPG → WebP via sharp ──────────────────────────────

async function compressPictures(): Promise<void> {
  console.log("\n══════════════════════════════════════════════");
  console.log("  Pictures — PNG / JPG → WebP");
  console.log("══════════════════════════════════════════════");

  // All images in public/ except textures (handled above) and already-compressed
  const files = await glob(`${PUBLIC_DIR}/**/*.{png,jpg,jpeg}`, {
    ignore: [
      `${PUBLIC_DIR}/textures/**`, // handled by KTX pass
    ],
  });

  if (files.length === 0) {
    console.log("No picture files found.");
    return;
  }

  await sequential(files, async (inputFile) => {
    const webpFile = inputFile.replace(/\.(png|jpe?g)$/i, ".webp");
    const ext = path.extname(inputFile).toLowerCase();

    // PNG images often contain graphics / illustrations → higher quality
    // JPG images are usually photographs → standard quality is fine
    const quality = ext === ".png" ? 90 : 80;

    console.log(
      `\n── ${path.basename(inputFile)} → ${path.basename(webpFile)}`,
    );

    try {
      const { size: originalSize } = await sharp(inputFile).metadata();
      const info = await sharp(inputFile)
        .webp({
          quality,
          effort: 6, // max compression effort (0-6)
          smartSubsample: true, // better chroma sub-sampling
          nearLossless: ext === ".png", // near-lossless for graphics
        })
        .toFile(webpFile);

      const saved = originalSize
        ? `${((1 - info.size / originalSize) * 100).toFixed(1)}% smaller`
        : `${(info.size / 1024).toFixed(1)} KB`;

      console.log(`  ✓ ${path.basename(webpFile)} (${saved})`);
    } catch (err) {
      console.error(`  ✗ Failed: ${(err as Error).message}`);
    }
  });
}

// ─── Main ───────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const startTime = Date.now();

  const args = process.argv.slice(2);
  const draco = args.includes("--draco");
  const taskArgs = args.filter((a) => !a.startsWith("--"));
  const tasks =
    taskArgs.length > 0
      ? taskArgs[0].split(",")
      : ["models", "textures", "pictures"];

  if (tasks.includes("models")) await compressModels(draco);
  if (tasks.includes("textures")) await compressTextures();
  if (tasks.includes("pictures")) await compressPictures();

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n══════════════════════════════════════════════`);
  console.log(`  Done in ${elapsed}s`);
  console.log(`══════════════════════════════════════════════\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
