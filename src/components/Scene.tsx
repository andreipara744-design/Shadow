import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Environment } from '@react-three/drei';
import * as THREE from 'three';

export default function Scene() {
  const scroll = useScroll();
  
  const pointsRef = useRef<THREE.Points>(null);
  const monolithRef = useRef<THREE.Mesh>(null);
  const monolithMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const icosahedronRef = useRef<THREE.Mesh>(null);
  const goldenSphereRef = useRef<THREE.Mesh>(null);

  // Generate points for Scene 1
  const particlesCount = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const r = 2 + Math.random() * 0.5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    const offset = scroll.offset;
    const time = state.clock.elapsedTime;

    // SCENE 1: Calm & Premium Sphere (0.0 - 0.25)
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.15;
      pointsRef.current.rotation.x = time * 0.1;
      
      // Fade out and scale down as we approach 0.25
      const s1Progress = THREE.MathUtils.clamp(1 - offset * 4, 0, 1); // 1 at 0, 0 at 0.25
      pointsRef.current.scale.setScalar(s1Progress);
      (pointsRef.current.material as THREE.PointsMaterial).opacity = s1Progress;
      
      // Fluid, slow, hypnotic effect
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3] += Math.sin(time * 2 + i) * 0.005 * s1Progress;
        positions[i3 + 1] += Math.cos(time * 2.5 + i) * 0.005 * s1Progress;
        positions[i3 + 2] += Math.sin(time * 3 + i) * 0.005 * s1Progress;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // SCENE 2: Monolith (0.25 - 0.50)
    if (monolithRef.current && monolithMaterialRef.current) {
      // Rises from below between 0.1 and 0.25
      const riseProgress = THREE.MathUtils.clamp((offset - 0.1) * (1 / 0.15), 0, 1);
      monolithRef.current.position.y = THREE.MathUtils.lerp(-10, 0, riseProgress);
      
      // Rotates slightly
      monolithRef.current.rotation.y = time * 0.1;

      // Becomes transparent/opens between 0.4 and 0.5
      const transProgress = THREE.MathUtils.clamp((offset - 0.4) * 10, 0, 1);
      monolithMaterialRef.current.transmission = THREE.MathUtils.lerp(0.5, 1, transProgress);
      monolithMaterialRef.current.opacity = THREE.MathUtils.lerp(1, 0, transProgress);
      
      // Fades out completely by 0.6
      const fadeOutProgress = THREE.MathUtils.clamp((offset - 0.5) * 10, 0, 1);
      if (offset > 0.5) {
         monolithRef.current.scale.setScalar(1 - fadeOutProgress);
      } else {
         monolithRef.current.scale.setScalar(1);
      }
    }

    // SCENE 3: Glowing Icosahedron (0.50 - 0.75)
    if (icosahedronRef.current) {
      // Fades in between 0.4 and 0.5
      const fadeInProgress = THREE.MathUtils.clamp((offset - 0.4) * 10, 0, 1);
      // Fades out between 0.65 and 0.75
      const fadeOutProgress = THREE.MathUtils.clamp((offset - 0.65) * 10, 0, 1);
      
      const visibility = fadeInProgress * (1 - fadeOutProgress);
      icosahedronRef.current.scale.setScalar(visibility * 1.5);
      
      icosahedronRef.current.rotation.y = time * 0.2;
      icosahedronRef.current.rotation.x = time * 0.1;
    }

    // SCENE 4: Golden Sphere (0.75 - 1.0)
    if (goldenSphereRef.current) {
      const fadeInProgress = THREE.MathUtils.clamp((offset - 0.7) * (1 / 0.15), 0, 1);
      goldenSphereRef.current.scale.setScalar(fadeInProgress * 1.2);
      
      // Levitates
      goldenSphereRef.current.position.y = Math.sin(time * 2) * 0.2;
    }
  });

  return (
    <>
      <Environment preset="city" />
      
      {/* Scene 1: Chaotic Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#FFD700" transparent opacity={1} />
      </points>

      {/* Scene 2: Monolith */}
      <mesh ref={monolithRef} position={[0, -10, 0]}>
        <boxGeometry args={[2, 5, 2]} />
        <meshPhysicalMaterial
          ref={monolithMaterialRef}
          color="#000000"
          roughness={0.1}
          metalness={0.8}
          transmission={0.5}
          thickness={2}
          transparent
        />
      </mesh>

      {/* Scene 3: Icosahedron */}
      <mesh ref={icosahedronRef} scale={0}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#FFD700"
          emissiveIntensity={2}
          wireframe
        />
      </mesh>

      {/* Scene 4: Golden Sphere */}
      <mesh ref={goldenSphereRef} scale={0}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFA500"
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={1}
        />
      </mesh>
    </>
  );
}
