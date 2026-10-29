"""Render 3D del símbolo de Alliance Edu (escena abstracta de marca)."""
import bpy, sys, math
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
MODE = argv[0] if argv else 'hero'
W = int(argv[1]) if len(argv) > 1 else 1600
H = int(argv[2]) if len(argv) > 2 else 900
SAMPLES = int(argv[3]) if len(argv) > 3 else 64
OUT = argv[4] if len(argv) > 4 else '/tmp/mark.png'

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'CYCLES'
sc.cycles.samples = SAMPLES
sc.cycles.use_denoising = True
try:
    sc.cycles.denoiser = 'OPENIMAGEDENOISE'
except Exception:
    pass
sc.render.resolution_x = W
sc.render.resolution_y = H
sc.render.film_transparent = False
sc.view_settings.view_transform = 'AgX'
try:
    sc.view_settings.look = 'AgX - Medium High Contrast'
except Exception:
    pass

def hexc(h, a=1.0):
    h = h.lstrip('#')
    r, g, b = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    f = lambda c: c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return (f(r), f(g), f(b), a)

def mat(name, base, metal=0.0, rough=0.2, trans=0.0, ior=1.45, emit=None, estr=0.0, coat=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    p = m.node_tree.nodes['Principled BSDF']
    p.inputs['Base Color'].default_value = hexc(base)
    p.inputs['Metallic'].default_value = metal
    p.inputs['Roughness'].default_value = rough
    p.inputs['IOR'].default_value = ior
    for k in ('Transmission Weight', 'Transmission'):
        if k in p.inputs:
            p.inputs[k].default_value = trans
            break
    for k in ('Coat Weight', 'Clearcoat'):
        if k in p.inputs:
            p.inputs[k].default_value = coat
            break
    if emit:
        for k in ('Emission Color', 'Emission'):
            if k in p.inputs:
                p.inputs[k].default_value = hexc(emit)
                break
        p.inputs['Emission Strength'].default_value = estr
    return m


# --- símbolo Tejido Humano: tres anillos abiertos con nodos (viewBox 48)
U = 2.9 / 48.0
CX, CZ = 0.0, 2.15
def arc(name, r, stroke, start_deg, sweep_deg, depth, m):
    pts = []
    n = 160
    for k in range(n + 1):
        th = math.radians(start_deg + sweep_deg * k / n)   # ángulo de pantalla (y hacia abajo)
        pts.append((CX + r * math.cos(th) * U, depth, CZ - r * math.sin(th) * U))
    cu = bpy.data.curves.new(name, 'CURVE')
    cu.dimensions = '3D'
    cu.bevel_depth = stroke / 2 * U
    cu.bevel_resolution = 8
    sp = cu.splines.new('POLY')
    sp.points.add(len(pts) - 1)
    for i, p in enumerate(pts):
        sp.points[i].co = (p[0], p[1], p[2], 1)
    ob = bpy.data.objects.new(name, cu)
    bpy.context.collection.objects.link(ob)
    ob.data.materials.append(m)
    for p in (pts[0], pts[-1]):
        bpy.ops.mesh.primitive_uv_sphere_add(radius=stroke / 2 * U, location=p, segments=32, ring_count=16)
        c = bpy.context.active_object
        c.data.materials.append(m)
        bpy.ops.object.shade_smooth()
    return pts

m_blue = mat('blue', '#2F7BEA', metal=0.0, rough=0.05, trans=1.0, ior=1.5)
m_orange = mat('orange', '#E8732C', metal=0.1, rough=0.28, coat=0.6)
m_navy = mat('navy', '#123A73', metal=0.9, rough=0.16, coat=1.0)
m_node = mat('node', '#F5F8FF', metal=0.0, rough=0.12, coat=1.0)

def screen_pt(x, y, depth):
    return (CX + (x - 24) * U, depth, CZ - (y - 24) * U)

arc('outer', 21, 4.2, -120, 104 / (2 * math.pi * 21) * 360, 0.0, m_blue)
arc('middle', 14, 4.2, -40, 64 / (2 * math.pi * 14) * 360, -0.32, m_orange)
arc('inner', 7, 3.8, 150, 32 / (2 * math.pi * 7) * 360, -0.6, m_navy)
for (x, y, r, d) in ((13.5, 5.8, 3.4, 0.0), (34.7, 15, 3.2, -0.32), (20.4, 44.6, 3.1, 0.0)):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r * U, location=screen_pt(x, y, d), segments=48, ring_count=24)
    s = bpy.context.active_object
    s.data.materials.append(m_node)
    bpy.ops.object.shade_smooth()

# inclinar todo el símbolo
bpy.ops.object.empty_add(location=(CX, 0, CZ))
piv = bpy.context.active_object
for o in list(bpy.data.objects):
    if o is not piv and o.type in ('MESH', 'CURVE'):
        o.parent = piv
        o.matrix_parent_inverse = piv.matrix_world.inverted()
piv.rotation_euler = (math.radians(-6), 0, math.radians(-24))

# --- suelo, fondo
bpy.ops.mesh.primitive_plane_add(size=60, location=(0, 0, 0))
floor = bpy.context.active_object
fm = mat('floor', '#03070F', metal=0.0, rough=0.35)
fp = fm.node_tree.nodes['Principled BSDF']
if 'Specular IOR Level' in fp.inputs: fp.inputs['Specular IOR Level'].default_value = 0.25
floor.data.materials.append(fm)
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 22, 8))
bd = bpy.context.active_object
bd.scale = (80, 40, 1)
bd.rotation_euler = (math.radians(90), 0, 0)
bd.data.materials.append(mat('bd', '#000000', rough=1.0, emit='#123A73', estr=0.28))

ring_o = mat('ringO', '#000000', emit='#FF9A55', estr=6.0)
ring_b = mat('ringB', '#000000', emit='#5FA3EE', estr=3.0)
for r, mm, th in ((1.9, ring_o, 0.012), (3.1, ring_b, 0.008), (4.5, ring_b, 0.006), (6.3, ring_o, 0.005)):
    bpy.ops.mesh.primitive_torus_add(major_radius=r, minor_radius=th, location=(0, 0, 0.004), major_segments=256, minor_segments=8)
    t = bpy.context.active_object
    t.scale.z = 0.2
    t.data.materials.append(mm)

world = bpy.data.worlds.new('w')
sc.world = world
world.use_nodes = True
world.node_tree.nodes['Background'].inputs['Color'].default_value = hexc('#0B2A4F')
world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.3

def area(name, loc, target, color, power, size):
    L = bpy.data.lights.new(name, 'AREA')
    L.color = hexc(color)[:3]
    L.energy = power
    L.size = size
    if name.startswith('rim'):
        L.spread = math.radians(60)
    if name == 'key':
        L.spread = math.radians(40)
    ob = bpy.data.objects.new(name, L)
    bpy.context.collection.objects.link(ob)
    ob.location = loc
    d = Vector(target) - Vector(loc)
    ob.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()

area('key', (4.0, -6.5, 5.0), (0, 0, 2.2), '#DCE8FF', 650, 3)
area('rimO', (-2.8, 5.2, 2.6), (0, 0, 2.6), '#FF8A3D', 2000, 1.4)
area('rimB', (4.2, 4.0, 2.6), (0, 0, 2.6), '#3D7BFF', 1500, 2)
area('top', (0, 0, 8), (0, 0, 0), '#FFFFFF', 60, 6)

cam_d = bpy.data.cameras.new('cam')
cam = bpy.data.objects.new('cam', cam_d)
bpy.context.collection.objects.link(cam)
sc.camera = cam
if MODE == 'hero':
    cam_d.lens = 42
    cam.location = (-4.4, -9.0, 2.1)
    tgt = (-2.0, 0, 1.85)
else:
    cam_d.lens = 62
    cam.location = (2.6, -7.6, 1.6)
    tgt = (0.1, 0, 2.0)
d = Vector(tgt) - cam.location
cam.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
cam_d.dof.use_dof = True
cam_d.dof.focus_distance = (Vector((0, 0, 2.0)) - cam.location).length
cam_d.dof.aperture_fstop = 4.0
sc.render.filepath = OUT
sc.render.image_settings.file_format = 'PNG'
bpy.ops.render.render(write_still=True)
print('done', OUT)
