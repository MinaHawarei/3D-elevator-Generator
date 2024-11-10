import  { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import ElevatorModel from './components/ElevatorModel';
import ConfigPanel from './components/ConfigPanel';



export interface ElevatorConfig {
  width: number;
  height: number;
  depth: number;
  wallMaterial1: 'wall1' | 'wall2' | 'wall3' | 'wall4';
  wallMaterial2: 'wall1' | 'wall2' | 'wall3' | 'wall4';
  wallMaterial3: 'wall1' | 'wall2' | 'wall3' | 'wall4';
  floorMaterial: 'floor1' | 'floor2' | 'floor3';
  ceilingMaterial: 'ceiling1' | 'ceiling2' | 'ceiling3'| 'ceiling4';
  cpMaterial: 'CP1' | 'CP2';
  cpPosition: 'rightCenter' |'rightCorner' | 'leftCenter' | 'leftCorner' | 'frontCenter' | 'frontRight' | 'frontLeft';
  lightType: 'warm'|'white';
  spotFrame: 'gold'|'white'|'silver';
  entranceCount: 1 | 2;
}



function App() {

  const [config, setConfig] = useState<ElevatorConfig>({
    width: 1000,
    height: 2000,
    depth: 1000,
    wallMaterial1: 'wall1',
    wallMaterial2: 'wall1',
    wallMaterial3: 'wall1',
    floorMaterial:'floor1',
    cpMaterial:'CP1',
    cpPosition: 'leftCenter',
    ceilingMaterial:'ceiling1',
    entranceCount: 1,
    lightType: 'white',
    spotFrame: 'gold'
    

  });




  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 relative">
        
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[2, 2, 2]} />
          <ambientLight intensity={0.5} />

          <directionalLight position={[0, 0, 0]} intensity={0.5} castShadow />
          <ElevatorModel config={config} />

          <OrbitControls dampingFactor={0.5} />

        </Canvas>
      
      </div>
      <ConfigPanel config={config} setConfig={setConfig} />
    </div>
  );
}

export default App;
