'use client';

import { useEffect, useRef } from 'react';

type ShapeType = 'torusknot' | 'icosahedron' | 'octahedron' | 'torus' | 'sphere' | 'cube';

interface Scene3DProps {
  shape?: ShapeType;
  size?: number;        // px высота контейнера
  color?: string;       // hex цвет
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
  mouseParallax?: boolean;
}

export default function Scene3D({
  shape = 'icosahedron',
  size = 320,
  color = '#00e5ff',
  opacity = 0.7,
  className = '',
  style = {},
  mouseParallax = true,
}: Scene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    let animId: number;
    let renderer: import('three').WebGLRenderer;

    (async () => {
      const THREE = await import('three');

      const W = mount.clientWidth  || size;
      const H = mount.clientHeight || size;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
      camera.position.z = 3;

      /* ── Геометрия ──────────────────────────────────────── */
      let geometry: import('three').BufferGeometry;
      switch (shape) {
        case 'torusknot':   geometry = new THREE.TorusKnotGeometry(0.8, 0.28, 120, 18); break;
        case 'icosahedron': geometry = new THREE.IcosahedronGeometry(1.1, 1); break;
        case 'octahedron':  geometry = new THREE.OctahedronGeometry(1.1, 2); break;
        case 'torus':       geometry = new THREE.TorusGeometry(0.9, 0.35, 24, 80); break;
        case 'sphere':      geometry = new THREE.SphereGeometry(1.1, 32, 32); break;
        case 'cube':        geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4, 4, 4, 4); break;
        default:            geometry = new THREE.IcosahedronGeometry(1.1, 1);
      }

      // Wireframe + solid combo
      const col = new THREE.Color(color);

      const wireMat = new THREE.MeshBasicMaterial({
        color: col,
        wireframe: true,
        transparent: true,
        opacity: opacity * 0.5,
      });
      const solidMat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0x000510),
        emissive: col,
        emissiveIntensity: 0.06,
        transparent: true,
        opacity: 0.85,
        shininess: 80,
      });

      const wireMesh  = new THREE.Mesh(geometry, wireMat);
      const solidMesh = new THREE.Mesh(geometry, solidMat);
      scene.add(solidMesh, wireMesh);

      // Освещение
      const ambient = new THREE.AmbientLight(0xffffff, 0.2);
      const point1  = new THREE.PointLight(col, 2, 10);
      const point2  = new THREE.PointLight(0x0044ff, 1, 10);
      point1.position.set(3, 3, 3);
      point2.position.set(-3, -2, 2);
      scene.add(ambient, point1, point2);

      /* ── Mouse parallax ─────────────────────────────────── */
      const mouse = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      const onMouse = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      if (mouseParallax) window.addEventListener('mousemove', onMouse);

      /* ── Resize ─────────────────────────────────────────── */
      const onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      /* ── Анимация ───────────────────────────────────────── */
      const animate = () => {
        animId = requestAnimationFrame(animate);

        // Плавное вращение
        wireMesh.rotation.x  += 0.003;
        wireMesh.rotation.y  += 0.005;
        solidMesh.rotation.x += 0.003;
        solidMesh.rotation.y += 0.005;

        // Mouse parallax
        if (mouseParallax) {
          target.x += (mouse.x * 0.25 - target.x) * 0.05;
          target.y += (mouse.y * 0.25 - target.y) * 0.05;
          scene.rotation.y = target.x;
          scene.rotation.x = -target.y;
        }

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
      };
    })().catch(console.error);

    return () => {
      cancelAnimationFrame(animId);
      if (renderer && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width: '100%', height: size, ...style }}
    />
  );
}
