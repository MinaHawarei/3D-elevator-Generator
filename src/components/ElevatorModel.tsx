import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { ElevatorConfig } from '../App';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber'
import { SpotLight } from '@react-three/drei';

interface Props {
  config: ElevatorConfig;
}

const MATERIAL_COLORS = {
  'wall1': '/src/materials/wall/1.png',
  'wall2': '/src/materials/wall/2.png',
  'wall3': '/src/materials/wall/3.png',
  'wall4': '/src/materials/wall/4.png'
} as const;
const FLOORL_COLORS = {
  'floor1': '/src/materials/floor/1.png',
  'floor2': '/src/materials/floor/2.png',
  'floor3': '/src/materials/floor/3.png'
} as const;

const CEILING_COLORS = {
  'ceiling1': '/src/materials/ceiling/1.png',
  'ceiling2': '/src/materials/ceiling/2.png',
  'ceiling3': '/src/materials/ceiling/3.png',
  'ceiling4': '/src/materials/ceiling/4.png'
} as const;

const CONTROLPANLE_STYLE = {
  'CP1': '/src/materials/cp/1.png',
  'CP2': '/src/materials/cp/2.png'
} as const;

const SPOT_FRAME = {
  'gold': '/src/materials/frame/1.png',
  'silver': '/src/materials/frame/2.png',
  'white': '/src/materials/frame/2.png'
} as const;

const lightwarm = '/src/materials/lights/1.png';






function ElevatorModel({ config }: Props) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  const width = config.width / 1000;
  const height = config.height / 1000;
  const depth = config.depth / 1000;

  const CONTROLPANLE_POSITION = {
    'rightCenter': [width/2-0.01, 0, 0],
    'rightCorner': [width/2-0.01, 0, depth/2+0.01-0.2],
    'leftCenter': [-width/2+0.01, 0, 0],
    'leftCorner': [-width/2+0.01, 0, depth/2+0.01-0.2],
    'frontCenter': [0 , 0, -depth/2+0.01],
    'frontRight': [width/2-0.2, 0, -depth/2+0.01],
    'frontLeft': [-width/2+0.2, 0, -depth/2+0.01]
 
  } as const;






  const wallColor1 = MATERIAL_COLORS[config.wallMaterial1];
  const wallColor2 = MATERIAL_COLORS[config.wallMaterial2];
  const wallColor3 = MATERIAL_COLORS[config.wallMaterial3];
  const fffloor =  FLOORL_COLORS[config.floorMaterial];
  const ceiling =  CEILING_COLORS[config.ceilingMaterial];
  const cp =  CONTROLPANLE_STYLE[config.cpMaterial];
  const cpposition =  CONTROLPANLE_POSITION[config.cpPosition];
  const spotframe = SPOT_FRAME[config.spotFrame];

  var cpdirection ;
  if (config.cpPosition == 'leftCenter' || config.cpPosition == 'leftCorner'){
    cpdirection = [0, Math.PI / 2, 0];
  }else if (config.cpPosition == 'rightCenter' || config.cpPosition == 'rightCorner'){

    cpdirection = [0, -Math.PI / 2, 0];
  }else{
    cpdirection = [0,0,0];
  }
  







  
  const floorColortest = useLoader(THREE.TextureLoader,fffloor);
  const ceilingDesign = useLoader(THREE.TextureLoader,ceiling);
  const wallDesign1 = useLoader(THREE.TextureLoader,wallColor1);
  const wallDesign2 = useLoader(THREE.TextureLoader,wallColor2);
  const wallDesign3 = useLoader(THREE.TextureLoader,wallColor3);
  const cpDesign = useLoader(THREE.TextureLoader,cp);
  const lights = useLoader(THREE.TextureLoader,lightwarm);
  const spotFrame = useLoader(THREE.TextureLoader,spotframe);



  // Door dimensions in meters
  const doorWidth = config.width / 1000;
  const doorHeight = config.height / 1000;

  return (
    <group ref={meshRef}>
      {/* Floor */}

        <mesh position={[0, -height/2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width, depth]} />
         
          <meshStandardMaterial map={floorColortest} />

      </mesh>

      {/* Ceiling */}
      <mesh position={[0, height/2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={"#ffffff"} />
        <meshStandardMaterial map={ceilingDesign} />
      </mesh>

      {/* Back wall */}
      {config.entranceCount === 2 ? (
        <>
          {/* Left section */}
          <mesh position={[-width/4 - doorWidth/4, 0, -depth/2]}>
            <planeGeometry args={[(width - doorWidth)/2, height]} />
            <meshStandardMaterial map={wallDesign1} />
          </mesh>
          {/* Right section */}
          <mesh position={[width/4 + doorWidth/4, 0, -depth/2]}>
            <planeGeometry args={[(width - doorWidth)/2, height]} />
            <meshStandardMaterial map={wallDesign1} />
          </mesh>
          {/* Top section */}
          <mesh position={[0, height/2 - (height - doorHeight)/4, -depth/2]}>
            <planeGeometry args={[doorWidth, (height - doorHeight)/2]} />
            <meshStandardMaterial map={wallDesign1} />
          </mesh>
        </>
      ) : (
        <mesh position={[0, 0, -depth/2]}>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial map={wallDesign1} />
        </mesh>
      )}

      {/* Side left wall */}
      <mesh position={[-width/2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial map={wallDesign2} />
      </mesh>

      {/* Side right wall */}
      <mesh position={[width/2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial map={wallDesign3} />
      </mesh>

      {/* controll panle */}


      <mesh position={cpposition} rotation={cpdirection}>
              <planeGeometry args={[0.2, 1.9]} />
              <meshStandardMaterial map={cpDesign} />

      </mesh>
      
      {/* spot lights 1 */}
      <mesh position={[width/2-width/8, height/2-0.001, -depth/2 + width/8]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.05 , 100]} />
              <meshStandardMaterial map={lights} />

      </mesh>
      <mesh position={[width/2-width/8, height/2-0.001, -depth/2 + width/8]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.05,0.01,3,100]} />
              <meshStandardMaterial map = {spotFrame} />
      </mesh>

      {/* spot lights 2 */}
      <mesh position={[width/2-width/8, height/2-0.001, depth/2 - width/8]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.05 , 100]} />
              <meshStandardMaterial map={lights} />

      </mesh>
      <mesh position={[width/2-width/8, height/2-0.001, depth/2 - width/8]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.05,0.01,3,100]} />
              <meshStandardMaterial map = {spotFrame} />
      </mesh>

      {/* spot lights 3 */}
            <mesh position={[-width/2+width/8, height/2-0.001, depth/2 - width/8]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.05 , 100]} />
              <meshStandardMaterial map={lights} />

      </mesh>
      <mesh position={[-width/2+width/8, height/2-0.001, depth/2 - width/8]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.05,0.01,3,100]} />
              <meshStandardMaterial map = {spotFrame} />
      </mesh>
            {/* spot lights 4 */}
            <mesh position={[-width/2+width/8, height/2-0.001, -depth/2 + width/8]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.05 , 100]} />
              <meshStandardMaterial map={lights} />

      </mesh>
      <mesh position={[-width/2+width/8, height/2-0.001, -depth/2 + width/8]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.05,0.01,3,100]} />
              <meshStandardMaterial map = {spotFrame} />
      </mesh>


      {/* Front wall with entrance */}
      {/* Left section */}
      <mesh position={[-width/4 - doorWidth/4, 0, depth/2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[(width - doorWidth)/2, height]} />
        <meshStandardMaterial map={wallDesign3} />
      </mesh>
      {/* Right section */}
      <mesh position={[width/4 + doorWidth/4, 0, depth/2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[(width - doorWidth)/2, height]} />
        <meshStandardMaterial map={wallDesign3} />
      </mesh>
      {/* Top section */}
      <mesh position={[0, height/2 - (height - doorHeight)/4, depth/2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[doorWidth, (height - doorHeight)/2]} />
        <meshStandardMaterial map={wallDesign3} />
      </mesh>
    </group>
  );
}

export default ElevatorModel;