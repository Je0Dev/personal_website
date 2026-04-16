import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Torus, Icosahedron } from '@react-three/drei';
import { motion } from 'motion/react';
import * as THREE from 'three';
import { useIsMobile, useReducedMotion, useWebGLSupport } from '../../hooks/useDevice';

function AdvancedScene() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const shape1Ref = useRef<THREE.Mesh>(null);
  const shape2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.3;
      ring1Ref.current.rotation.z = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * -0.25;
      ring2Ref.current.rotation.x = t * 0.15;
    }
    if (shape1Ref.current) {
      shape1Ref.current.position.x = Math.sin(t * 0.5) * 0.3;
      shape1Ref.current.rotation.x = t * 0.2;
    }
    if (shape2Ref.current) {
      shape2Ref.current.position.x = Math.cos(t * 0.4) * 0.25;
      shape2Ref.current.position.y = Math.sin(t * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh ref={shape1Ref} position={[-0.5, 0, 0]}>
          <icosahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#ec4899" metalness={0.6} roughness={0.2} />
        </mesh>
        <mesh ref={shape2Ref} position={[0.5, 0.2, 0]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#06b6d4" metalness={0.6} roughness={0.2} />
        </mesh>
      </Float>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.8, 0.03, 8, 64]} />
        <meshBasicMaterial color="#ec4899" wireframe />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.1, 0.02, 8, 48]} />
        <meshBasicMaterial color="#06b6d4" wireframe />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <planeGeometry args={[2.5, 1.5]} />
        <meshBasicMaterial color="#1a1a1a" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--accent-pink)]/10 to-[var(--accent-cyan)]/10">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-10 h-10 border-3 border-[var(--accent-cyan)] border-t-transparent rounded-full" />
    </div>
  );
}

export function Location3D({ className = '' }: { className?: string }) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { isSupported: webglSupported } = useWebGLSupport();

  const canvasSettings = useMemo(() => ({
    antialias: !isMobile,
    powerPreference: isMobile ? 'low-power' as const : 'high-performance' as const,
    alpha: true,
  }), [isMobile]);

  if (prefersReducedMotion || !webglSupported) {
    return (
      <motion.div 
        className={`w-full h-32 rounded-xl overflow-hidden border-4 border-[var(--border-color)] ${className}`} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
      >
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--accent-pink)]/10 to-[var(--accent-cyan)]/10">
          <div className="w-16 h-16 border-2 border-[var(--border-color)] rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[var(--accent-cyan)] rounded-full" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className={`w-full h-32 rounded-xl overflow-hidden border-4 border-[var(--border-color)] ${className}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }} gl={canvasSettings} dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}>
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 3, 3]} intensity={1.2} color="#ec4899" />
          <pointLight position={[-3, -3, 2]} intensity={0.8} color="#06b6d4" />
          <pointLight position={[0, 0, 4]} intensity={0.5} color="#ffffff" />
          <AdvancedScene />
        </Canvas>
      </Suspense>
    </motion.div>
  );
}