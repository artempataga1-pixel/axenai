'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export function HeroFuturistic() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const titleWords = ['AXEN', 'AI'];
  const subtitle   = 'Сайты созданные искусственным интеллектом.';

  useEffect(() => {
    if (!canvasRef.current) return;
    const container = canvasRef.current;
    let animId: number;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import('three/webgpu');
      const { bloom } = await import('three/examples/jsm/tsl/display/BloomNode.js');
      const {
        abs, blendScreen, float, mod, mx_cell_noise_float,
        oneMinus, smoothstep, texture, uniform, uv, vec2, vec3, mix, add, pass,
      } = await import('three/tsl');

      const W = container.clientWidth  || window.innerWidth;
      const H = container.clientHeight || window.innerHeight;

      /* ── Renderer ─────────────────────────────────────────── */
      const renderer = new THREE.WebGPURenderer({ antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      await renderer.init();

      /* ── Scene / Camera ───────────────────────────────────── */
      const scene  = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 0.1, 100);
      camera.position.z = 1;

      /* ── Textures ─────────────────────────────────────────── */
      const loader  = new THREE.TextureLoader();
      const rawMap  = await loader.loadAsync('https://i.postimg.cc/XYwvXN8D/img-4.png');
      const depthMap = await loader.loadAsync('https://i.postimg.cc/2SHKQh2q/raw-4.webp');
      rawMap.wrapS = rawMap.wrapT = THREE.RepeatWrapping;
      depthMap.wrapS = depthMap.wrapT = THREE.RepeatWrapping;

      /* ── Uniforms ─────────────────────────────────────────── */
      const uPointer  = uniform(new THREE.Vector2(0, 0));
      const uProgress = uniform(0);
      const strength  = 0.01;

      /* ── TSL shader ───────────────────────────────────────── */
      const tDepthMap  = texture(depthMap);
      const tMap       = texture(rawMap, uv().add(tDepthMap.r.mul(uPointer).mul(strength)));
      const SIDE       = 300;
      const aspect     = float(SIDE).div(SIDE);
      const tUv        = vec2(uv().x.mul(aspect), uv().y);
      const tiling     = vec2(120.0);
      const tiledUv    = mod(tUv.mul(tiling), 2.0).sub(1.0);
      const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
      const dist       = float(tiledUv.length());
      const dot        = float(smoothstep(0.5, 0.49, dist)).mul(brightness);
      const depth      = tDepthMap.r;
      const flow       = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));
      const mask       = dot.mul(flow).mul(vec3(0.0, 5.0, 10.0));
      const finalColor = blendScreen(tMap, mask);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mat = new (THREE.MeshBasicNodeMaterial as any)({
        colorNode: finalColor,
        transparent: true,
        opacity: 0,
      });

      const scale = Math.min(W, H) * 0.85;
      const mesh  = new THREE.Mesh(new THREE.PlaneGeometry(scale, scale), mat);
      scene.add(mesh);

      /* ── Post Processing ──────────────────────────────────── */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const PP: any = (THREE as any).RenderPipeline ?? (THREE as any).PostProcessing;
      const postProcessing = new PP(renderer);

      const scenePass      = pass(scene, camera);
      const scenePassColor = scenePass.getTextureNode('output');
      const bloomPass      = bloom(scenePassColor, 1, 0.5, 1);

      const uScanProgress = uniform(0);
      const scanPos   = uScanProgress;
      const uvY       = uv().y;
      const scanWidth = float(0.05);
      const scanLine  = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
      const blueOverlay = vec3(0.0, 0.5, 1.0).mul(oneMinus(scanLine)).mul(0.4);
      const withScan    = mix(scenePassColor, add(scenePassColor, blueOverlay),
        smoothstep(0.9, 1.0, oneMinus(scanLine)));
      postProcessing.outputNode = withScan.add(bloomPass);
      postProcessing.needsUpdate = true;

      /* ── Resize ───────────────────────────────────────────── */
      const onResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        camera.left   = -w / 2;
        camera.right  =  w / 2;
        camera.top    =  h / 2;
        camera.bottom = -h / 2;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onResize);

      /* ── Mouse ────────────────────────────────────────────── */
      const mouse = { x: 0, y: 0 };
      const onMouse = (e: MouseEvent) => {
        mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
        mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
      };
      window.addEventListener('mousemove', onMouse);

      /* ── Animate ──────────────────────────────────────────── */
      let opacity = 0;
      const startTime = performance.now();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const t = (performance.now() - startTime) / 1000;

        uProgress.value    = Math.sin(t * 0.5) * 0.5 + 0.5;
        uScanProgress.value = uProgress.value;
        uPointer.value.set(mouse.x, mouse.y);

        // Fade in
        opacity = THREE.MathUtils.lerp(opacity, 1, 0.04);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mat as any).opacity = opacity;

        postProcessing.render();
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', onMouse);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    })().catch(console.error);

    return () => { cleanup?.(); };
  }, []);

  return (
    <div className="h-svh relative overflow-hidden bg-black">

      {/* ── WebGPU Canvas ─────────────────────────────────────── */}
      <div ref={canvasRef} className="absolute inset-0 z-0" />

      {/* ── HTML overlay ──────────────────────────────────────── */}
      <div className="h-svh w-full absolute z-20 pointer-events-none flex flex-col items-center justify-center px-6">

        {/* Заголовок */}
        <div className="text-[clamp(3rem,12vw,9rem)] font-black uppercase leading-none tracking-wider">
          <div className="flex gap-[0.18em]">
            {titleWords.map((word, i) => (
              <span
                key={i}
                className="hero-word"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  color: '#ffffff',
                  textShadow: '0 0 40px rgba(255,255,255,0.15)',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Подзаголовок */}
        <div className="hero-subtitle-wrap mt-2 text-[clamp(0.65rem,1.8vw,1.1rem)] uppercase tracking-[0.2em] font-bold">
          <div
            className="hero-subtitle"
            style={{ animationDelay: '0.5s', color: 'rgba(255,255,255,0.85)' }}
          >
            {subtitle}
          </div>
        </div>

        {/* CTA кнопки */}
        <div
          className="hero-btns mt-8 flex flex-col sm:flex-row gap-3 pointer-events-auto"
          style={{ animationDelay: '0.85s' }}
        >
          <button className="hero-btn-cyan" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>▶ Смотреть каталог</button>
          <Link href="/order">
            <button className="hero-btn-green">⬡ Заказать сайт</button>
          </Link>
        </div>
      </div>

      {/* ── Scroll pill ───────────────────────────────────────── */}
      <button
        className="hero-explore-btn"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        Прокрутить вниз
        <span className="hero-explore-arrow">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <path d="M11 5V17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M6 12L11 17L16 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
    </div>
  );
}

export default HeroFuturistic;
