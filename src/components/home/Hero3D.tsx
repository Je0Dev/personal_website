import { useRef, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion } from 'motion/react';
import * as THREE from 'three';
import { useIsMobile, useReducedMotion, useWebGLSupport } from '../../hooks/useDevice';

function FloatingShape({ detail = 1 }: { detail?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={hovered ? 1.15 : 1} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <icosahedronGeometry args={[1.8, detail]} />
        <meshStandardMaterial color={hovered ? '#ec4899' : '#06b6d4'} wireframe={false} metalness={0.9} roughness={0.1} />
      </mesh>
    </Float>
  );
}

function WireframeRings({ detail = 1 }: { detail?: number }) {
  const isMobile = useIsMobile();
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring1Ref.current) ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  const segments = isMobile ? 32 : 64;

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.015, 8, segments]} />
        <meshBasicMaterial color="#ec4899" wireframe />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3, 0.015, 8, 64]} />
        <meshBasicMaterial color="#06b6d4" wireframe />
      </mesh>
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--bg-color)]">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <motion.div key={i} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} className="w-3 h-3 rounded-full bg-[var(--accent-pink)]" />
        ))}
      </div>
    </div>
  );
}

export function Hero3D({ className = '' }: { className?: string }) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { isSupported: webglSupported } = useWebGLSupport();

  const canvasSettings = useMemo(() => ({
    antialias: !isMobile,
    powerPreference: isMobile ? 'low-power' as const : 'high-performance' as const,
    alpha: true,
  }), [isMobile]);

  const geometryDetail = isMobile ? 0 : 1;

  if (prefersReducedMotion || !webglSupported) {
    return (
      <motion.div 
        className={`w-full h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden border-4 border-[var(--border-color)] brutal-shadow bg-[var(--bg-color)] ${className}`} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-24 h-24 md:w-32 md:h-32 border-4 border-[var(--border-color)] rounded-full flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-[var(--accent-pink)] rounded-full" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className={`w-full h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden border-4 border-[var(--border-color)] brutal-shadow bg-[var(--bg-color)] ${className}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={canvasSettings} dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#ec4899" />
          <pointLight position={[-5, -5, 5]} intensity={0.8} color="#06b6d4" />
          <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
          <FloatingShape detail={geometryDetail} />
          <WireframeRings detail={geometryDetail} />
        </Canvas>
      </Suspense>
    </motion.div>
  );
}