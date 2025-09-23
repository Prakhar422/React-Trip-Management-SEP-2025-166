"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

function Globe() {
  const earthRef = useRef()
  const atmosphereRef = useRef()

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.003
      earthRef.current.rotation.x += 0.001
      earthRef.current.rotation.z += 0.0005
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.002
      atmosphereRef.current.rotation.x += 0.0008
    }
  })

  useEffect(() => {
    const globe = earthRef.current
    if (!globe) return

    const group = new THREE.Group()
    const points = []

    const latitudes = 8
    const longitudes = 12

    for (let lat = 0; lat < latitudes; lat++) {
      for (let lon = 0; lon < longitudes; lon++) {
        const phi = (lat / (latitudes - 1)) * Math.PI
        const theta = (lon / longitudes) * 2 * Math.PI
        const x = Math.sin(phi) * Math.cos(theta)
        const y = Math.sin(phi) * Math.sin(theta)
        const z = Math.cos(phi)
        points.push({
          position: new THREE.Vector3(x, y, z).multiplyScalar(2.05),
          lat,
          lon,
        })
      }
    }

    points.forEach((point, i) => {
      const { lat, lon } = point

      // Connect to right neighbor
      if (lon < longitudes - 1) {
        const rightNeighbor = points.find((p) => p.lat === lat && p.lon === lon + 1)
        if (rightNeighbor) {
          const geometry = new THREE.BufferGeometry().setFromPoints([point.position, rightNeighbor.position])
          const material = new THREE.LineBasicMaterial({
            color: 0x64ffda,
            transparent: true,
            opacity: 0.4,
          })
          const line = new THREE.Line(geometry, material)
          group.add(line)
        }
      }

      // Connect to bottom neighbor
      if (lat < latitudes - 1) {
        const bottomNeighbor = points.find((p) => p.lat === lat + 1 && p.lon === lon)
        if (bottomNeighbor) {
          const geometry = new THREE.BufferGeometry().setFromPoints([point.position, bottomNeighbor.position])
          const material = new THREE.LineBasicMaterial({
            color: 0x4fc3f7,
            transparent: true,
            opacity: 0.3,
          })
          const line = new THREE.Line(geometry, material)
          group.add(line)
        }
      }

      // Connect longitude wrap-around (last to first)
      if (lon === longitudes - 1) {
        const wrapNeighbor = points.find((p) => p.lat === lat && p.lon === 0)
        if (wrapNeighbor) {
          const geometry = new THREE.BufferGeometry().setFromPoints([point.position, wrapNeighbor.position])
          const material = new THREE.LineBasicMaterial({
            color: 0x64ffda,
            transparent: true,
            opacity: 0.4,
          })
          const line = new THREE.Line(geometry, material)
          group.add(line)
        }
      }
    })

    globe.add(group)

    const interval = setInterval(() => {
      group.children.forEach((line, index) => {
        const time = Date.now() * 0.002
        const baseOpacity = line.material.color.getHex() === 0x64ffda ? 0.4 : 0.3
        line.material.opacity = baseOpacity + 0.3 * Math.sin(time + index * 0.5)
      })
    }, 50)

    return () => {
      clearInterval(interval)
      globe.remove(group)
    }
  }, [])

  const earthTexture = new THREE.TextureLoader().load("/earth.png")

  // Ensure proper texture mapping for world map
  earthTexture.wrapS = THREE.RepeatWrapping
  earthTexture.wrapT = THREE.ClampToEdgeWrapping
  earthTexture.flipY = false
  earthTexture.minFilter = THREE.LinearFilter
  earthTexture.magFilter = THREE.LinearFilter

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 256, 256]} />
        <meshPhysicalMaterial
          map={earthTexture}
          roughness={0.8}
          metalness={0.1}
          clearcoat={0.1}
          clearcoatRoughness={0.3}
        />
      </mesh>

      <mesh ref={atmosphereRef} scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color={0x4fc3f7} transparent={true} opacity={0.1} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

export default function RotatingGlobe() {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
      <ambientLight intensity={0.3} color={0x404040} />
      <directionalLight position={[10, 5, 5]} intensity={1.2} color={0xffffff} castShadow />
      <pointLight position={[-10, -5, -5]} intensity={0.5} color={0x4fc3f7} />
      <Globe />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        dampingFactor={0.05}
        enableDamping={true}
      />
    </Canvas>
  )
}
