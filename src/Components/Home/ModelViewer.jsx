// src/Components/Home/ModelViewer.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center, Bounds } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Color, MeshStandardMaterial } from "three";

// ✅ Vite base-safe (works for /chroma3d/ on GitHub Pages)
const withBase = (file) => {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${file.replace(/^\//, "")}`;
};

const MODEL_URL = withBase("ganesha.glb");

export default function ModelViewer({ src = MODEL_URL, overrideBronze = true }) {
  const controls = useRef(null);

  useEffect(() => {
    if (!controls.current) return;
    controls.current.setAzimuthalAngle(0);
    controls.current.setPolarAngle(Math.PI / 2.45);
    controls.current.update();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start">
      <div
        className="
          relative z-[120] flex items-center justify-center
          w-[240px] h-[260px]
          sm:w-[300px] sm:h-[320px]
          md:w-[360px] md:h-[380px]
          lg:w-[460px] lg:h-[520px]
          xl:w-[500px] xl:h-[560px]
        "
      >
        <Canvas
          camera={{ fov: 30, position: [0, 0.6, 3.1], near: 0.1, far: 100 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
          shadows
        >
          <ambientLight intensity={0.7} />
          <hemisphereLight intensity={0.45} groundColor="#1a1a1a" />
          <directionalLight position={[2.5, 3.5, 3]} intensity={1.1} />
          <directionalLight position={[-3, 1.2, -2]} intensity={0.55} />
          <directionalLight position={[3, 0.6, -1.5]} intensity={0.3} />

          <Environment preset="studio" intensity={0.65} />

          <Suspense fallback={null}>
            <Center>
              <Bounds fit clip observe margin={1.05}>
                <Sculpture url={src} overrideBronze={overrideBronze} />
              </Bounds>
            </Center>
          </Suspense>

          <OrbitControls
            ref={controls}
            makeDefault
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.08}
            minPolarAngle={Math.PI / 2.8}
            maxPolarAngle={Math.PI / 2.0}
            minAzimuthAngle={-Math.PI / 10}
            maxAzimuthAngle={Math.PI / 10}
            target={[0, 0.1, 0]}
          />
        </Canvas>
      </div>

      <div className="mt-2 text-xs text-white/60 select-none">Hold &amp; drag to move</div>
    </div>
  );
}

function Sculpture({ url, overrideBronze }) {
  const { scene } = useGLTF(url);
  const clone = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const bronze = new MeshStandardMaterial({
      color: new Color("#c67c36"),
      metalness: 1,
      roughness: 0.3,
      emissive: new Color("#ff6a00"),
      emissiveIntensity: 0.15,
    });

    clone.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        if (overrideBronze) o.material = bronze;
      }
    });
  }, [clone, overrideBronze]);

  return <primitive object={clone} position={[0, -0.12, 0]} scale={1.3} />;
}

// ✅ Preload with same final URL
useGLTF.preload(MODEL_URL);
