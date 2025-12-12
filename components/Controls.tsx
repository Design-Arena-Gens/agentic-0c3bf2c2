interface ControlsProps {
  speed: number
  setSpeed: (speed: number) => void
  exploded: number
  setExploded: (exploded: number) => void
  showLayer: string
  setShowLayer: (layer: string) => void
  selectedPart: string | null
  setSelectedPart: (part: string | null) => void
}

const partInfo: Record<string, { name: string; description: string }> = {
  balance: {
    name: 'Balance Wheel',
    description: 'Oscillates at 8 Hz, acts as the timing regulator with hairspring for precise timekeeping'
  },
  escapement: {
    name: 'Escapement Wheel',
    description: 'Swiss lever escapement that converts continuous rotation into precise ticks'
  },
  barrel: {
    name: 'Main Barrel',
    description: 'Stores energy from mainspring, provides 40+ hours power reserve'
  },
  geartrain: {
    name: 'Gear Train',
    description: 'Transmits power from barrel to escapement, reduces speed through multiple gears'
  },
  hands: {
    name: 'Watch Hands',
    description: 'Hour, minute, and second hands driven by the gear train'
  },
  crown: {
    name: 'Crown',
    description: 'Winds the mainspring and sets the time when pulled out'
  },
  case: {
    name: 'Watch Case',
    description: 'Protects the movement, houses all components with sapphire crystal'
  }
}

export default function Controls({
  speed,
  setSpeed,
  exploded,
  setExploded,
  showLayer,
  setShowLayer,
  selectedPart,
  setSelectedPart
}: ControlsProps) {
  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      background: 'rgba(0, 0, 0, 0.85)',
      padding: '20px',
      borderRadius: '12px',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '320px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 600 }}>
        Mechanical Watch Control
      </h2>

      {/* Speed Control */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#aaa' }}>
          Speed: {speed.toFixed(1)}x
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button onClick={() => setSpeed(0)} style={buttonStyle}>Pause</button>
          <button onClick={() => setSpeed(1)} style={buttonStyle}>Normal</button>
          <button onClick={() => setSpeed(5)} style={buttonStyle}>Fast</button>
        </div>
      </div>

      {/* Exploded View */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#aaa' }}>
          Exploded View: {(exploded * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={exploded}
          onChange={(e) => setExploded(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      {/* Layer Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#aaa' }}>
          View Layer
        </label>
        <select
          value={showLayer}
          onChange={(e) => setShowLayer(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #333',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        >
          <option value="all">All Components</option>
          <option value="balance">Balance Wheel</option>
          <option value="escapement">Escapement</option>
          <option value="geartrain">Gear Train</option>
          <option value="barrel">Main Barrel</option>
          <option value="hands">Hands</option>
          <option value="crown">Crown</option>
          <option value="case">Case</option>
        </select>
      </div>

      {/* Selected Part Info */}
      {selectedPart && partInfo[selectedPart] && (
        <div style={{
          padding: '12px',
          background: 'rgba(59, 130, 246, 0.15)',
          borderRadius: '8px',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#60a5fa' }}>
            {partInfo[selectedPart].name}
          </h3>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5', color: '#ccc' }}>
            {partInfo[selectedPart].description}
          </p>
          <button
            onClick={() => setSelectedPart(null)}
            style={{
              ...buttonStyle,
              marginTop: '10px',
              width: '100%',
              background: 'rgba(59, 130, 246, 0.2)'
            }}
          >
            Deselect
          </button>
        </div>
      )}

      {!selectedPart && (
        <div style={{ fontSize: '12px', color: '#666', marginTop: '12px', fontStyle: 'italic' }}>
          Click any component to inspect details
        </div>
      )}
    </div>
  )
}

const buttonStyle: React.CSSProperties = {
  padding: '6px 12px',
  background: '#2a2a2a',
  border: '1px solid #444',
  borderRadius: '6px',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '13px',
  flex: 1
}
