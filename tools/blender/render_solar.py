import bpy, bmesh, math, random, sys
from mathutils import Matrix, Vector

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
MODE = argv[0] if argv else 'hero'
W = int(argv[1]) if len(argv) > 1 else 480
H = int(argv[2]) if len(argv) > 2 else 245
SAMPLES = int(argv[3]) if len(argv) > 3 else 16
OUT = argv[4] if len(argv) > 4 else '/tmp/out.png'

random.seed(7)
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'CYCLES'
sc.cycles.device = 'CPU'
sc.cycles.samples = SAMPLES
sc.cycles.use_adaptive_sampling = True
sc.cycles.max_bounces = 6
try:
    sc.cycles.use_denoising = True
    sc.cycles.denoiser = 'OPENIMAGEDENOISE'
except Exception as e:
    print('denoise', e)
sc.render.resolution_x = W
sc.render.resolution_y = H
sc.render.resolution_percentage = 100
sc.render.image_settings.file_format = 'PNG'
sc.render.filepath = OUT
for vt in ('AgX', 'Filmic', 'Standard'):
    try:
        sc.view_settings.view_transform = vt
        break
    except Exception:
        pass
for lk in ('AgX - Medium High Contrast', 'Medium High Contrast', 'Filmic - Medium High Contrast'):
    try:
        sc.view_settings.look = lk
        break
    except Exception:
        pass
sc.view_settings.exposure = float(argv[5]) if len(argv) > 5 else -1.0
print('VT', sc.view_settings.view_transform, sc.view_settings.look)

# ---------- materials ----------
def mat(name, color, rough=0.6, metal=0.0, emit=None, estr=0.0, coat=0.0):
    m = bpy.data.materials.new(name)
    nt = m.node_tree if m.node_tree else None
    if nt is None:
        m.use_nodes = True
        nt = m.node_tree
    b = nt.nodes.get('Principled BSDF')
    b.inputs['Base Color'].default_value = (*color, 1)
    b.inputs['Roughness'].default_value = rough
    b.inputs['Metallic'].default_value = metal
    if coat:
        b.inputs['Coat Weight'].default_value = coat
        b.inputs['Coat Roughness'].default_value = 0.02
    if emit:
        b.inputs['Emission Color'].default_value = (*emit, 1)
        b.inputs['Emission Strength'].default_value = estr
    return m

def panel_mat():
    m = bpy.data.materials.new('pv')
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes.get('Principled BSDF')
    tc = nt.nodes.new('ShaderNodeTexCoord')
    br = nt.nodes.new('ShaderNodeTexBrick')
    br.inputs['Scale'].default_value = 1.0
    br.inputs['Mortar Size'].default_value = 0.012
    br.inputs['Brick Width'].default_value = 0.17
    br.inputs['Row Height'].default_value = 0.17
    br.offset = 0.0
    br.inputs['Color1'].default_value = (0.006, 0.014, 0.045, 1)
    br.inputs['Color2'].default_value = (0.010, 0.022, 0.070, 1)
    br.inputs['Mortar'].default_value = (0.10, 0.12, 0.16, 1)
    nt.links.new(tc.outputs['Object'], br.inputs['Vector'])
    nt.links.new(br.outputs['Color'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = 0.08
    b.inputs['Coat Weight'].default_value = 1.0
    b.inputs['Coat Roughness'].default_value = 0.01
    b.inputs['Specular IOR Level'].default_value = 0.6
    return m

M_PV = panel_mat()
M_STEEL = mat('steel', (0.55, 0.57, 0.6), rough=0.35, metal=1.0)

def ground_mat(c1, c2):
    m = bpy.data.materials.new('ground')
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes.get('Principled BSDF')
    nz = nt.nodes.new('ShaderNodeTexNoise')
    nz.inputs['Scale'].default_value = 0.08
    nz.inputs['Detail'].default_value = 8
    ramp = nt.nodes.new('ShaderNodeValToRGB')
    ramp.color_ramp.elements[0].color = (*c1, 1)
    ramp.color_ramp.elements[1].color = (*c2, 1)
    tc = nt.nodes.new('ShaderNodeTexCoord')
    nt.links.new(tc.outputs['Object'], nz.inputs['Vector'])
    nt.links.new(nz.outputs['Fac'], ramp.inputs['Fac'])
    nt.links.new(ramp.outputs['Color'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = 0.95
    bump = nt.nodes.new('ShaderNodeBump')
    nz2 = nt.nodes.new('ShaderNodeTexNoise')
    nz2.inputs['Scale'].default_value = 3.0
    nt.links.new(tc.outputs['Object'], nz2.inputs['Vector'])
    nt.links.new(nz2.outputs['Fac'], bump.inputs['Height'])
    bump.inputs['Strength'].default_value = 0.4
    nt.links.new(bump.outputs['Normal'], b.inputs['Normal'])
    return m

def obj_from_bm(name, bm, mats):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    for m in mats:
        me.materials.append(m)
    sc.collection.objects.link(ob)
    return ob

def add_box(bm, center, size, rot=None, mat_index=0):
    mtx = Matrix.Translation(center)
    if rot is not None:
        mtx = mtx @ rot
    mtx = mtx @ Matrix.Diagonal((size[0], size[1], size[2], 1))
    res = bmesh.ops.create_cube(bm, size=1.0, matrix=mtx)
    for v in res['verts']:
        for f in v.link_faces:
            f.material_index = mat_index

# ---------- terrain ----------
def hill_h(x, y, start=330.0):
    d = max(0.0, y - start)
    h = d * 0.33 * (1 + 0.22 * math.sin(x * 0.006 + 0.7) + 0.06 * math.sin(x * 0.021 + 1.3))
    h += 2 * math.sin(x * 0.02) * min(1.0, d / 40)
    return h

def build_ground(c1, c2, size=14000):
    bm = bmesh.new()
    bmesh.ops.create_grid(bm, x_segments=2, y_segments=2, size=size / 2)
    ob = obj_from_bm('ground', bm, [ground_mat(c1, c2)])
    return ob

def build_hill(c1, c2):
    bm = bmesh.new()
    nx, ny = 140, 70
    x0, x1, y0, y1 = -1100.0, 1100.0, 300.0, 1400.0
    verts = []
    for j in range(ny + 1):
        row = []
        y = y0 + (y1 - y0) * j / ny
        for i in range(nx + 1):
            x = x0 + (x1 - x0) * i / nx
            row.append(bm.verts.new((x, y, hill_h(x, y) - 0.3)))
        verts.append(row)
    for j in range(ny):
        for i in range(nx):
            bm.faces.new((verts[j][i], verts[j][i + 1], verts[j + 1][i + 1], verts[j + 1][i]))
    ob = obj_from_bm('hill', bm, [ground_mat(c1, c2)])
    for p in ob.data.polygons:
        p.use_smooth = True
    return ob

def build_far_range(color):
    bm = bmesh.new()
    nx = 120
    pts = []
    for i in range(nx + 1):
        x = -3000 + 6000 * i / nx
        z = 330 + 120 * math.sin(x * 0.0015 + 2.0) + 60 * math.sin(x * 0.004 + 0.4) + 25 * math.sin(x * 0.011)
        a = bm.verts.new((x, 1900, -10)); b = bm.verts.new((x, 1900, z))
        pts.append((a, b))
    for i in range(nx):
        bm.faces.new((pts[i][0], pts[i + 1][0], pts[i + 1][1], pts[i][1]))
    return obj_from_bm('far', bm, [mat('far', color, 1.0)])

def build_streetlights(n_streets, xr=(-750, 750), yr=(350, 880), strength=18.0):
    sm = mat('sodium', (1.0, 0.6, 0.2), 0.5, emit=(1.0, 0.52, 0.16), estr=strength)
    bm = bmesh.new()
    for k in range(n_streets):
        yb = yr[0] + (yr[1] - yr[0]) * (random.random() ** 1.4)
        ph = random.uniform(0, 6.28)
        amp = random.uniform(6, 22)
        x = xr[0]
        while x < xr[1]:
            if random.random() < 0.85:
                y = yb + amp * math.sin(x * 0.012 + ph)
                add_box(bm, Vector((x, y, hill_h(x, y) + 3.5)), (0.45, 0.45, 0.45))
            x += random.uniform(7, 12)
    obj_from_bm('lights', bm, [sm])

def build_clouds(z=1100, color=(1.0, 0.42, 0.30), strength=0.85):
    m = bpy.data.materials.new('clouds')
    m.use_nodes = True
    nt = m.node_tree
    out = nt.nodes.get('Material Output')
    for n in list(nt.nodes):
        if n.name != 'Material Output':
            nt.nodes.remove(n)
    tc = nt.nodes.new('ShaderNodeTexCoord')
    mp = nt.nodes.new('ShaderNodeMapping')
    mp.inputs['Scale'].default_value = (1.0, 2.6, 1.0)
    nz = nt.nodes.new('ShaderNodeTexNoise')
    nz.inputs['Scale'].default_value = 0.0009
    nz.inputs['Detail'].default_value = 12
    nz.inputs['Roughness'].default_value = 0.62
    ramp = nt.nodes.new('ShaderNodeValToRGB')
    ramp.color_ramp.elements[0].position = 0.47
    ramp.color_ramp.elements[1].position = 0.78
    em = nt.nodes.new('ShaderNodeEmission')
    em.inputs['Color'].default_value = (*color, 1)
    em.inputs['Strength'].default_value = strength
    tr = nt.nodes.new('ShaderNodeBsdfTransparent')
    mix = nt.nodes.new('ShaderNodeMixShader')
    nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
    nt.links.new(mp.outputs['Vector'], nz.inputs['Vector'])
    nt.links.new(nz.outputs['Fac'], ramp.inputs['Fac'])
    nt.links.new(ramp.outputs['Color'], mix.inputs['Fac'])
    nt.links.new(tr.outputs['BSDF'], mix.inputs[1])
    nt.links.new(em.outputs['Emission'], mix.inputs[2])
    nt.links.new(mix.outputs['Shader'], out.inputs['Surface'])
    bm = bmesh.new()
    bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=9000)
    ob = obj_from_bm('clouds', bm, [m])
    ob.location = (0, 0, z)
    ob.visible_shadow = False

def build_trees(n, xr=(-900, 900), yr=(500, 1200)):
    tm = mat('tree', (0.03, 0.05, 0.03), 0.95)
    bm = bmesh.new()
    for _ in range(n):
        x = random.uniform(*xr); y = random.uniform(*yr)
        r = random.uniform(3, 7)
        res = bmesh.ops.create_icosphere(bm, subdivisions=1, radius=r, matrix=Matrix.Translation((x, y, hill_h(x, y) + r * 0.6)))
    obj_from_bm('trees', bm, [tm])

def build_far_ridge_x(x=-2400, color=(0.18, 0.2, 0.26)):
    bm = bmesh.new()
    pts = []
    nx = 120
    for i in range(nx + 1):
        y = -3000 + 6000 * i / nx
        z = 70 + 45 * math.sin(y * 0.0017 + 1.0) + 25 * math.sin(y * 0.005) + 10 * math.sin(y * 0.013)
        pts.append((bm.verts.new((x, y, -10)), bm.verts.new((x, y, z))))
    for i in range(nx):
        bm.faces.new((pts[i][0], pts[i + 1][0], pts[i + 1][1], pts[i][1]))
    return obj_from_bm('ridgex', bm, [mat('ridgex', color, 1.0)])

def build_houses(n, lights=True, xr=(-750, 750), yr=(345, 900)):
    walls = [
        mat('w0', (0.17, 0.06, 0.028), 0.9), mat('w1', (0.20, 0.19, 0.18), 0.9),
        mat('w2', (0.30, 0.28, 0.25), 0.9), mat('w3', (0.10, 0.13, 0.18), 0.9),
        mat('w4', (0.28, 0.20, 0.09), 0.9), mat('w5', (0.24, 0.10, 0.08), 0.9),
        mat('w6', (0.26, 0.25, 0.24), 0.9)
    ]
    win = mat('win', (1.0, 0.75, 0.4), 0.5, emit=(1.0, 0.70, 0.38), estr=9.0)
    bm = bmesh.new()
    wbm = bmesh.new()
    placed = 0
    tries = 0
    while placed < n and tries < n * 3:
        tries += 1
        x = random.uniform(*xr)
        y = yr[0] + (yr[1] - yr[0]) * (random.random() ** 1.6)
        w = random.uniform(3.5, 7); d = random.uniform(4, 8); hgt = random.uniform(3.5, 8.0)
        z = hill_h(x, y) + hgt / 2 - 1.2
        add_box(bm, Vector((x, y, z)), (w, d, hgt), mat_index=random.choice([0,0,0,0,5,5,1,1,2,3,4,6]))
        placed += 1
        if random.random() < 0.35:
            add_box(bm, Vector((x, y, z + hgt / 2 + 0.6)), (w * 1.05, d * 1.05, 0.25), mat_index=1)
        if lights and random.random() < 0.30:
            for k in range(random.choice([1, 1, 2])):
                wx = x + random.uniform(-w / 3, w / 3)
                wz = z + random.uniform(-hgt / 4, hgt / 4)
                add_box(wbm, Vector((wx, y - d / 2 - 0.06, wz)), (0.55, 0.12, 0.5))
    obj_from_bm('houses', bm, walls)
    if lights:
        obj_from_bm('windows', wbm, [win])

def build_trackers(rows, x0, pitch, ylen, y0, tilt_deg, height=1.7, width=2.4):
    bm = bmesh.new()
    sbm = bmesh.new()
    rot = Matrix.Rotation(math.radians(tilt_deg), 4, 'Y')
    for r in range(rows):
        cx = x0 + r * pitch
        cy = y0 + ylen / 2
        add_box(bm, Vector((cx, cy, height)), (width, ylen, 0.045), rot=rot)
        # torque tube + posts
        add_box(sbm, Vector((cx, cy, height - 0.12)), (0.12, ylen, 0.12))
        p = y0
        while p <= y0 + ylen:
            add_box(sbm, Vector((cx, p, (height - 0.12) / 2)), (0.12, 0.12, height - 0.12))
            p += 7.0
    obj_from_bm('pv', bm, [M_PV])
    obj_from_bm('steel', sbm, [M_STEEL])

def world(elev, rot, strength=1.0, sky_type='MULTIPLE_SCATTERING'):
    w = bpy.data.worlds.new('sky')
    sc.world = w
    w.use_nodes = True
    nt = w.node_tree
    bg = nt.nodes.get('Background')
    sky = nt.nodes.new('ShaderNodeTexSky')
    try:
        sky.sky_type = sky_type
    except Exception:
        sky.sky_type = 'SINGLE_SCATTERING'
    sky.sun_elevation = math.radians(elev)
    sky.sun_rotation = math.radians(rot)
    try:
        sky.sun_intensity = 1.0
        sky.altitude = 2600
    except Exception:
        pass
    nt.links.new(sky.outputs['Color'], bg.inputs['Color'])
    bg.inputs['Strength'].default_value = strength
    # sun lamp matching sky
    ld = bpy.data.lights.new('sun', 'SUN')
    ld.energy = 4.0 if elev > 10 else 2.0
    ld.angle = math.radians(0.6)
    ld.color = (1.0, 0.85, 0.7) if elev < 10 else (1.0, 0.97, 0.92)
    lo = bpy.data.objects.new('sun', ld)
    sc.collection.objects.link(lo)
    # sky texture: rotation measured from +X? align lamp
    az = math.radians(rot)
    el = math.radians(elev)
    d = Vector((math.cos(el) * math.sin(az), math.cos(el) * math.cos(az), math.sin(el)))
    lo.rotation_euler = (-d).to_track_quat('-Z', 'Y').to_euler()

def camera(loc, target, lens):
    cd = bpy.data.cameras.new('cam')
    cd.lens = lens
    cd.clip_end = 5000
    co = bpy.data.objects.new('cam', cd)
    sc.collection.objects.link(co)
    co.location = loc
    dvec = Vector(target) - Vector(loc)
    co.rotation_euler = dvec.to_track_quat('-Z', 'Y').to_euler()
    sc.camera = co

if MODE == 'hero':
    # dusk: solar field in front of illuminated hillside (Ciudad Bolívar), sun setting behind hills
    world(float(argv[6]) if len(argv) > 6 else -1.5, -14, strength=float(argv[7]) if len(argv) > 7 else 0.8)
    build_far_range((0.20, 0.24, 0.32))
    build_ground((0.16, 0.15, 0.07), (0.28, 0.24, 0.12))
    build_hill((0.07, 0.08, 0.05), (0.13, 0.11, 0.07))
    build_houses(9000, lights=True)
    build_trees(1600)
    build_streetlights(60)
    build_clouds()
    build_trackers(rows=22, x0=-40, pitch=6.5, ylen=240, y0=-5, tilt_deg=-9)
    camera((-4.0, -20.0, 5.5), (8, 160, 30), 24)
elif MODE == 'day':
    world(7, -35, strength=0.4)
    build_far_range((0.30, 0.38, 0.50))
    build_ground((0.20, 0.22, 0.09), (0.34, 0.31, 0.14))
    build_hill((0.10, 0.14, 0.06), (0.20, 0.20, 0.10))
    build_houses(9000, lights=False)
    build_trees(1600)
    build_clouds(color=(1.0, 0.86, 0.74), strength=1.4)
    build_trackers(rows=30, x0=-80, pitch=6.5, ylen=260, y0=-20, tilt_deg=-22)
    camera((-30.0, -60.0, 28.0), (10, 170, 20), 24)
elif MODE in ('close', 'drone'):
    world(-2.0, -14, strength=0.9)
    build_far_range((0.20, 0.24, 0.32))
    build_ground((0.16, 0.15, 0.07), (0.28, 0.24, 0.12))
    build_hill((0.07, 0.08, 0.05), (0.13, 0.11, 0.07))
    build_houses(9000, lights=True)
    build_trees(1600)
    build_streetlights(60)
    build_clouds()
    if MODE == 'drone':
        build_trackers(rows=34, x0=-110, pitch=6.5, ylen=260, y0=-10, tilt_deg=-9)
        camera((-60.0, -70.0, 42.0), (0, 220, 20), 26)
    else:
        build_trackers(rows=8, x0=-24, pitch=6.5, ylen=220, y0=-5, tilt_deg=-14)
        camera((1.6, -3.0, 2.6), (-9, 90, 0.8), 20)
elif MODE == 'aerial':
    world(5.0, 78, strength=0.45)
    build_far_ridge_x()
    build_ground((0.10, 0.12, 0.05), (0.22, 0.20, 0.09))
    build_trackers(rows=40, x0=-130, pitch=6.5, ylen=300, y0=-140, tilt_deg=-30)
    camera((70.0, -175.0, 55.0), (-60, 60, 0), 30)
elif MODE == 'golden':
    world(2.4, -78, strength=0.5)
    build_far_ridge_x()
    build_ground((0.12, 0.12, 0.05), (0.24, 0.21, 0.10))
    build_clouds(color=(1.0, 0.55, 0.32), strength=1.0)
    build_trackers(rows=26, x0=-90, pitch=6.5, ylen=260, y0=-130, tilt_deg=-35)
    camera((40.0, -12.0, 3.0), (-200, 30, 12), 26)

bpy.ops.render.render(write_still=True)
print('DONE', OUT)
