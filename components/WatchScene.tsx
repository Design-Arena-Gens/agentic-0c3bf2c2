'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { useState, useRef } from 'react'
import WatchMechanism from './WatchMechanism'
import Controls from './Controls'

export default function WatchScene() {
  const [speed, setSpeed] = useState(1)
  const [exploded, setExploded] = useState(0)
  const [showLayer, setShowLayer] = useState('all')
  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const mechanismRef = useRef<any>(null)

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0a' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[8, 5, 8]} fov={50} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
          target={[0, 0, 0]}
        />

        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />

        <Environment preset="city" />

        <WatchMechanism
          ref={mechanismRef}
          speed={speed}
          exploded={exploded}
          showLayer={showLayer}
          selectedPart={selectedPart}
          onSelectPart={setSelectedPart}
        />
      </Canvas>

      <Controls
        speed={speed}
        setSpeed={setSpeed}
        exploded={exploded}
        setExploded={setExploded}
        showLayer={showLayer}
        setShowLayer={setShowLayer}
        selectedPart={selectedPart}
        setSelectedPart={setSelectedPart}
      />
    </div>
  )
}
