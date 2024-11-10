import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {  Mesh } from 'three';
import { ElevatorConfig } from '../App';
import {  useLoader } from '@react-three/fiber';
import * as THREE from 'three';

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

const SPOT_COLOR = {
  'white': '#FFFFFF',
  'warm': '#ffff00'
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
    'rightCenter': [width/2-0.02, 0, 0],
    'rightCorner': [width/2-0.02, 0, depth/2+0.02-0.2],
    'leftCenter': [-width/2+0.02, 0, 0],
    'leftCorner': [-width/2+0.02, 0, depth/2+0.02-0.2],
    'frontCenter': [0 , 0, -depth/2+0.02],
    'frontRight': [width/2-0.2, 0, -depth/2+0.02],
    'frontLeft': [-width/2+0.2, 0, -depth/2+0.02]
 
  } as const;

  const spotlightHeighr = height/2-0.01;
  const wallColor1 = MATERIAL_COLORS[config.wallMaterial1];
  const wallColor2 = MATERIAL_COLORS[config.wallMaterial2];
  const wallColor3 = MATERIAL_COLORS[config.wallMaterial3];
  const fffloor =  FLOORL_COLORS[config.floorMaterial];
  const ceiling =  CEILING_COLORS[config.ceilingMaterial];
  const cp =  CONTROLPANLE_STYLE[config.cpMaterial];
  const cpposition =  CONTROLPANLE_POSITION[config.cpPosition];
  const spotframe = SPOT_FRAME[config.spotFrame];
  const spotcolor = SPOT_COLOR[config.lightType];

  var cpdirection ;
  if (config.cpPosition == 'leftCenter' || config.cpPosition == 'leftCorner'){
    cpdirection = Math.PI / 2;
  }else if (config.cpPosition == 'rightCenter' || config.cpPosition == 'rightCorner'){

    cpdirection = -Math.PI / 2;
  }else{
    cpdirection = 0;
  };

  const floorColortest = useLoader(THREE.TextureLoader,fffloor);
  const ceilingDesign = useLoader(THREE.TextureLoader,ceiling);
  const wallDesign1 = useLoader(THREE.TextureLoader,wallColor1);
  const wallDesign2 = useLoader(THREE.TextureLoader,wallColor2);
  const wallDesign3 = useLoader(THREE.TextureLoader,wallColor3);
  const cpDesign = useLoader(THREE.TextureLoader,cp);
  const lights = useLoader(THREE.TextureLoader,lightwarm);
  const spotFrame = useLoader(THREE.TextureLoader,spotframe);



  const marbleNormalMap = useLoader(THREE.TextureLoader, 'src/materials/floor/marble/14/Marble014_1K-JPG_NormalDX.jpg'); 
  const marbleRoughnessMap = useLoader(THREE.TextureLoader, 'src/materials/floor/marble/14/Marble014_1K-JPG_Roughness.jpg');
  return (

    <group>
        
      {/* Floor */}
      <mesh position={[0, -height/2, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
         <boxGeometry args={[width,depth,0.05]} />
          <meshPhysicalMaterial
            map={floorColortest}
            normalMap={marbleNormalMap}
            roughnessMap={marbleRoughnessMap}
            roughness={0.5}
            metalness={0}
            reflectivity={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1} />
      </mesh>
    
      

      {/* Ceiling */}
      <mesh position={[0, height/2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow >
        <boxGeometry args={[width, depth, 0.02]} />
        <meshStandardMaterial color={"#ffffff"} />
        <meshPhysicalMaterial
            map={ceilingDesign}
            normalMap={marbleNormalMap}
            roughnessMap={marbleRoughnessMap}
            roughness={-0.5}
            metalness={0}
            reflectivity={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1} />
      </mesh>

      {/* Back wall */}
      {config.entranceCount === 1 ? (
        <>
          <mesh position={[0, 0, -depth/2]}>
          <boxGeometry args={[width, height , 0.02]} />
            <meshPhysicalMaterial
            map={wallDesign1}
            normalMap={marbleNormalMap}
            roughnessMap={marbleRoughnessMap}
            roughness={0.5}
            metalness={0}
            reflectivity={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1} />
          </mesh>
       
        </>
      ) : (
        <></>
        
      )}
      <mesh position={[0, 0, -depth/2+0.02]}>
        <boxGeometry args={[0.5 , 1 , 0.005]} />


      </mesh>

      {/* Side left wall */}
      <mesh position={[-width/2, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow >
        <boxGeometry args={[depth, height , 0.02]} />
        <meshPhysicalMaterial
            map={wallDesign2}
            normalMap={marbleNormalMap}
            roughnessMap={marbleRoughnessMap}
            roughness={0.5}
            metalness={0}
            reflectivity={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1} />
      </mesh>

      {/* Side right wall */}
      <mesh position={[width/2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[depth, height , 0.02]} />
        <meshPhysicalMaterial
            map={wallDesign3}
            normalMap={marbleNormalMap}
            roughnessMap={marbleRoughnessMap}
            roughness={0.5}
            metalness={0}
            reflectivity={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1} />
      </mesh>

      {/* controll panle */}


      <mesh position={cpposition} rotation ={[0, cpdirection , 0 ]} castShadow receiveShadow>
              <planeGeometry args={[0.2, 1.9]} />
              <meshStandardMaterial map={cpDesign} />

      </mesh>
      
      {/* spot lights 1 */}
      <mesh position={[width/2-width/8, spotlightHeighr-0.005, -depth/2 + width/8]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow >
              <circleGeometry args={[0.05 , 100]} />
              <meshStandardMaterial map={lights} />
      </mesh>
      <spotLight position={[width/2-width/8, spotlightHeighr-0.005, -depth/2 + width/8]} angle={1.2} penumbra={1.3} intensity={0.5} color={spotcolor}  castShadow />
      <pointLight position={[width/2-width/8, spotlightHeighr-0.051, -depth/2 + width/8]} intensity={0.01} color={spotcolor} castShadow />

      <mesh position={[width/2-width/8, spotlightHeighr, -depth/2 + width/8]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.06,0.06,0.005,100]} />
              <meshStandardMaterial map = {spotFrame} />
              
      </mesh>

      {/* spot lights 2 */}
      <mesh position={[width/2-width/8, spotlightHeighr-0.005, depth/2 - width/8]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <circleGeometry args={[0.05 , 100]} />
              <meshStandardMaterial map={lights} />
              
      </mesh>
      <spotLight position={[width/2-width/8, spotlightHeighr-0.005, depth/2 - width/8]} angle={1.2} penumbra={1.3} intensity={0.5} color={spotcolor}  castShadow />
      <pointLight position={[width/2-width/8, spotlightHeighr-0.051, depth/2 - width/8]} intensity={0.01} color={spotcolor} castShadow />


      <mesh position={[width/2-width/8, spotlightHeighr, depth/2 - width/8]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.06,0.06,0.005,100]} />
              <meshStandardMaterial map = {spotFrame} />
            

      </mesh>

      {/* spot lights 3 */}
            <mesh position={[-width/2+width/8, spotlightHeighr-0.005, depth/2 - width/8]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <circleGeometry args={[0.05 , 100]} />
              <meshStandardMaterial map={lights} />
      </mesh>
      <spotLight position={[-width/2+width/8, spotlightHeighr-0.005, depth/2 - width/8]} angle={1.2} penumbra={1.3} intensity={0.5} color={spotcolor}  castShadow />
      <pointLight position={[-width/2+width/8, spotlightHeighr-0.051, depth/2 - width/8]} intensity={0.01} color={spotcolor} castShadow />

      <mesh position={[-width/2+width/8, spotlightHeighr, depth/2 - width/8]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.06,0.06,0.005,100]} />
              <meshStandardMaterial map = {spotFrame} />
      </mesh>

      {/* spot lights 4 */}
      <mesh position={[-width/2+width/8, spotlightHeighr-0.005, -depth/2 + width/8]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <circleGeometry args={[0.05 , 100]} />
        <meshStandardMaterial map={lights} />
      </mesh>
      <spotLight position={[-width/2+width/8, spotlightHeighr-0.005, -depth/2 + width/8]} angle={1.2} penumbra={1.3} intensity={0.5} color={spotcolor} castShadow />
      <pointLight position={[-width/2+width/8, spotlightHeighr-0.051, -depth/2 + width/8]} intensity={0.01} color={spotcolor} castShadow />
      <mesh position={[-width/2+width/8, spotlightHeighr, -depth/2 + width/8]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.06,0.06,0.005,100]} />
              <meshStandardMaterial map = {spotFrame} />
      </mesh>

    </group>

  );
}

export default ElevatorModel;
