import { useRef, forwardRef, useImperativeHandle } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'
import BalanceWheel from './parts/BalanceWheel'
import EscapementWheel from './parts/EscapementWheel'
import MainBarrel from './parts/MainBarrel'
import GearTrain from './parts/GearTrain'
import WatchCase from './parts/WatchCase'
import Crown from './parts/Crown'
import Hands from './parts/Hands'

interface WatchMechanismProps {
  speed: number
  exploded: number
  showLayer: string
  selectedPart: string | null
  onSelectPart: (part: string | null) => void
}

const WatchMechanism = forwardRef(({
  speed,
  exploded,
  showLayer,
  selectedPart,
  onSelectPart
}: WatchMechanismProps, ref) => {
  const groupRef = useRef<Group>(null)
  const balanceRef = useRef<Group>(null)
  const escapementRef = useRef<Group>(null)
  const barrelRef = useRef<Group>(null)
  const gearTrainRef = useRef<Group>(null)
  const handsRef = useRef<Group>(null)
  const crownRef = useRef<Group>(null)

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (balanceRef.current) balanceRef.current.rotation.z = 0
      if (escapementRef.current) escapementRef.current.rotation.z = 0
      if (barrelRef.current) barrelRef.current.rotation.z = 0
    }
  }))

  useFrame((state, delta) => {
    const adjustedDelta = delta * speed

    // Balance wheel oscillation (8-10 Hz typical)
    if (balanceRef.current) {
      const oscillationSpeed = 8 * Math.PI * 2
      balanceRef.current.rotation.z = Math.sin(state.clock.elapsedTime * oscillationSpeed) * 0.5
    }

    // Escapement wheel (locked/unlocked motion)
    if (escapementRef.current) {
      const tickSpeed = 0.3
      escapementRef.current.rotation.z -= adjustedDelta * tickSpeed
    }

    // Main barrel (very slow rotation)
    if (barrelRef.current) {
      barrelRef.current.rotation.z += adjustedDelta * 0.02
    }

    // Gear train
    if (gearTrainRef.current) {
      gearTrainRef.current.rotation.z -= adjustedDelta * 0.5
    }

    // Watch hands
    if (handsRef.current) {
      const secondHand = handsRef.current.children[0]
      const minuteHand = handsRef.current.children[1]
      const hourHand = handsRef.current.children[2]

      if (secondHand) secondHand.rotation.z -= adjustedDelta * 0.1
      if (minuteHand) minuteHand.rotation.z -= adjustedDelta * 0.00167
      if (hourHand) hourHand.rotation.z -= adjustedDelta * 0.000139
    }

    // Crown rotation when winding
    if (crownRef.current && speed > 5) {
      crownRef.current.rotation.x += adjustedDelta * 2
    }
  })

  const isVisible = (layer: string) => {
    return showLayer === 'all' || showLayer === layer
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Watch Case */}
      {isVisible('case') && (
        <group position={[0, 0, exploded * -3]}>
          <WatchCase
            selected={selectedPart === 'case'}
            onClick={() => onSelectPart(selectedPart === 'case' ? null : 'case')}
          />
        </group>
      )}

      {/* Crown */}
      {isVisible('crown') && (
        <group ref={crownRef} position={[2.5 + exploded * 1, 0, 0]}>
          <Crown
            selected={selectedPart === 'crown'}
            onClick={() => onSelectPart(selectedPart === 'crown' ? null : 'crown')}
          />
        </group>
      )}

      {/* Hands */}
      {isVisible('hands') && (
        <group ref={handsRef} position={[0, 0, 1.5 + exploded * 2]}>
          <Hands
            selected={selectedPart === 'hands'}
            onClick={() => onSelectPart(selectedPart === 'hands' ? null : 'hands')}
          />
        </group>
      )}

      {/* Main Barrel */}
      {isVisible('barrel') && (
        <group ref={barrelRef} position={[-1.5 + exploded * -1.5, 0, 0.2]}>
          <MainBarrel
            selected={selectedPart === 'barrel'}
            onClick={() => onSelectPart(selectedPart === 'barrel' ? null : 'barrel')}
          />
        </group>
      )}

      {/* Gear Train */}
      {isVisible('geartrain') && (
        <group ref={gearTrainRef} position={[0, 0, 0.3 + exploded * 0.5]}>
          <GearTrain
            selected={selectedPart === 'geartrain'}
            onClick={() => onSelectPart(selectedPart === 'geartrain' ? null : 'geartrain')}
          />
        </group>
      )}

      {/* Escapement Wheel */}
      {isVisible('escapement') && (
        <group ref={escapementRef} position={[1.2 + exploded * 1.2, 0, 0.4]}>
          <EscapementWheel
            selected={selectedPart === 'escapement'}
            onClick={() => onSelectPart(selectedPart === 'escapement' ? null : 'escapement')}
          />
        </group>
      )}

      {/* Balance Wheel */}
      {isVisible('balance') && (
        <group ref={balanceRef} position={[1.8 + exploded * 2, 0, 0.5 + exploded * 1]}>
          <BalanceWheel
            selected={selectedPart === 'balance'}
            onClick={() => onSelectPart(selectedPart === 'balance' ? null : 'balance')}
          />
        </group>
      )}
    </group>
  )
})

WatchMechanism.displayName = 'WatchMechanism'

export default WatchMechanism
