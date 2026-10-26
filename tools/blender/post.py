import sys
import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1], sys.argv[2]
bloom = float(sys.argv[3]) if len(sys.argv) > 3 else 0.55
im = Image.open(src).convert('RGB')
a = np.asarray(im).astype(np.float32) / 255.0
h, w, _ = a.shape

# bloom: bright pass, blurred at two radii
lum = a.max(axis=2, keepdims=True)
bright = np.clip((lum - 0.62) / 0.38, 0, 1) * a
b_img = Image.fromarray((bright * 255).astype(np.uint8))
b1 = np.asarray(b_img.filter(ImageFilter.GaussianBlur(w / 320))).astype(np.float32) / 255
b2 = np.asarray(b_img.filter(ImageFilter.GaussianBlur(w / 80))).astype(np.float32) / 255
a = a + bloom * (0.6 * b1 + 0.8 * b2)

# gentle S-curve contrast
a = np.clip(a, 0, 1)
a = a + 0.10 * (a - 0.5) * (1 - np.abs(2 * a - 1))

# vignette
yy, xx = np.mgrid[0:h, 0:w]
r = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2)
v = 1 - 0.28 * np.clip(r - 0.55, 0, 1) ** 1.5
a = a * v[..., None]

# grain
rng = np.random.default_rng(3)
a = a + rng.normal(0, 0.012, a.shape).astype(np.float32)
a = np.clip(a, 0, 1)
Image.fromarray((a * 255).astype(np.uint8)).save(dst, quality=88, optimize=True, progressive=True)
print('ok', dst, w, h)
