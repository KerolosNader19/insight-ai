import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function OrbContent() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    // Manually create Three.js objects to bypass R3F JSX factory version issues
    const geometry = new THREE.SphereGeometry(1, 48, 48);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#79fcd4"),
      roughness: 0.15,
      metalness: 0.85,
      emissive: new THREE.Color("#1a4d40"),
      emissiveIntensity: 0.2,
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.setScalar(2.5);
    meshRef.current = mesh;

    if (groupRef.current) {
      groupRef.current.add(mesh);
    }

    return () => {
      geometry.dispose();
      material.dispose();
      if (groupRef.current) {
        groupRef.current.remove(mesh);
      }
    };
  }, []);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Premium breathing + rotation
    const time = clock.getElapsedTime();
    const breathe = Math.sin(time * 0.8) * 0.03 + 1;
    mesh.scale.setScalar(2.5 * breathe);
    
    mesh.rotation.y = time * 0.15;
    mesh.rotation.z = Math.sin(time * 0.5) * 0.1;
  });

  return <group ref={groupRef} />;
}

export function Orb() {
  return <OrbContent />;
}
