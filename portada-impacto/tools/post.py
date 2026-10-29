import sys
import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1], sys.argv[2]
cx = float(sys.argv[3]) if len(sys.argv) > 3 else 0.7
cy = float(sys.argv[4]) if len(sys.argv) > 4 else 0.45
im = Image.open(src).convert('RGB')
a = np.asarray(im).astype(np.float32) / 255
h, w, _ = a.shape
# bloom
b = np.asarray(im.filter(ImageFilter.GaussianBlur(w / 60))).astype(np.float32) / 255
a = a + np.clip(b - 0.55, 0, 1) * 0.6
# halo azul detrás del símbolo
yy, xx = np.mgrid[0:h, 0:w]
d = np.sqrt(((xx / w - cx) * 1.6) ** 2 + ((yy / h - cy) * 1.0) ** 2)
halo = np.exp(-(d / 0.32) ** 2)[..., None] * np.array([0.10, 0.20, 0.55])
a = a + halo * 0.55 * (1 - a)
# viñeta
v = np.sqrt(((xx / w - 0.5) * 1.3) ** 2 + ((yy / h - 0.5) * 1.1) ** 2)
a = a * (1 - np.clip(v - 0.35, 0, 1)[..., None] * 0.8)
# grano
a = a + np.random.default_rng(3).normal(0, 0.012, a.shape)
Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)).save(dst, quality=90)
print('ok', dst)
