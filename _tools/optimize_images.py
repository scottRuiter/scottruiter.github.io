"""Create web-optimized copies of curated site images in images/web/."""
import os
from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None  # trusted local files

SRC = r"D:\TopX Development\scottruiter.github.io\images"
OUT = os.path.join(SRC, "web")
os.makedirs(OUT, exist_ok=True)

# (source file, output slug, max long edge px)
CURATED = [
    # Hero / section backgrounds
    ("IMG_20240818_221325_726.jpg", "hero-eye", 1920),
    ("IMG_20240818_221323_332.jpg", "hero-eye-2", 1920),
    ("20260527_091528.jpg", "connector-tray-1", 1920),
    ("20260527_091450.jpg", "connector-tray-2", 1600),
    ("20260527_091501.jpg", "connector-tray-3", 1600),
    ("cbmbnr.jpg", "banner-network", 1600),
    ("IMG_20240816_231813_700.jpg", "topx-banner", 1600),
    ("20240416_181516.jpg", "topx-eye-machine", 1600),
    ("AISelect_20260327_182713_Spotify.jpg", "topx-starburst", 1200),
    # Engineering / builds
    ("20240427_002630.jpg", "pc-build-1", 1400),
    ("20240427_015806.jpg", "pc-build-2", 1400),
    # Travel photography
    ("20260308_121435-EFFECTS.jpg", "travel-pagoda", 1600),
    ("20260308_121031.jpg", "travel-buddha", 1400),
    ("20260313_124311.jpg", "travel-altar", 1400),
    ("20260313_124925.jpg", "travel-temple-flowers", 1400),
    ("20260313_131929.jpg", "travel-2026-sign", 1400),
    ("20260313_120241.jpg", "travel-park", 1400),
    ("20260308_123151.jpg", "travel-shrine", 1400),
    ("FB_IMG_1760315623178.jpg", "travel-waterfall-bridge", 1400),
    ("20250101_073537.jpg", "life-cat-candles", 1400),
    ("20251005_083705.jpg", "life-pumpkin", 1400),
    ("20180916_013027.png", "life-gliders-1", 1400),
    ("glider1.png", "life-gliders-2", 1400),
    ("aphrodite.png", "life-glider-3", 1400),
    # AI art
    ("IMG_20240523_164822_600.jpg", "art-milkyway", 1400),
    ("IMG_20240523_164822_880.jpg", "art-lotus", 1400),
    ("IMG_20240523_164822_937.jpg", "art-lion", 1400),
    ("IMG_20240523_164826_706.jpg", "art-flower-path", 1400),
    ("IMG_20240523_164826_729.jpg", "art-eye", 1400),
    ("IMG_20240523_164826_925.jpg", "art-crystal-world", 1400),
    ("IMG_20240523_164827_356.jpg", "art-lotus-glow", 1400),
    ("IMG_20240523_164827_374.jpg", "art-island", 1400),
    ("AISelect_20260304_000041_Meet.jpg", "art-starry-night", 1400),
    ("AISelect_20260322_131826_Facebook.jpg", "art-ghost", 1200),
    ("IMG_20241012_205858_752.jpg", "art-space", 1400),
    ("IMG_20241018_091404_074.jpg", "art-cyber-lion", 1400),
    ("IMG_20241212_222813_102.png", "art-colosseum", 1600),
    ("FB_IMG_1768234019145.jpg", "art-neon-ring", 1200),
    # Brand
    ("Profit - Promo.png", "brand-promo", 1000),
    ("headshot.png", "brand-headshot", 800),
]


def save_opt(im, path, quality=80):
    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA", "P", "LA"):
        im = im.convert("RGB")
    im.save(path, "JPEG", quality=quality, optimize=True, progressive=True)


total = 0
for src_name, slug, max_edge in CURATED:
    src = os.path.join(SRC, src_name)
    if not os.path.exists(src):
        print(f"MISSING: {src_name}")
        continue
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)
    scale = max_edge / max(im.size)
    if scale < 1:
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    out = os.path.join(OUT, f"{slug}.jpg")
    save_opt(im, out)
    kb = os.path.getsize(out) // 1024
    total += kb
    print(f"{slug}.jpg  {im.width}x{im.height}  {kb} KB")

# Favicon from headshot
fav = Image.open(os.path.join(SRC, "headshot.png"))
fav = ImageOps.exif_transpose(fav).convert("RGBA")
side = min(fav.size)
fav = fav.crop(((fav.width - side) // 2, 0, (fav.width + side) // 2, side))
fav = fav.resize((64, 64), Image.LANCZOS)
fav.save(os.path.join(SRC, "web", "favicon.png"))
print("favicon.png 64x64")
print(f"TOTAL: {total/1024:.1f} MB")
