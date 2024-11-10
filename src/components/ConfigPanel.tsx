import React from 'react';
import { ElevatorConfig } from '../App';

interface Props {
  config: ElevatorConfig;
  setConfig: (config: ElevatorConfig) => void;
}

const MATERIALS = [
  { id: 'wall1', name: 'wood light' },
  { id: 'wall2', name: 'wood black' },
  { id: 'wall3', name: 'wood dark' },
  { id: 'wall4', name: 'clading1' },
] as const;


const FLOOR = [
  { id: 'floor1', name: 'floor1' },
  { id: 'floor2', name: 'floor2' },
  { id: 'floor3', name: 'floor3' },
] as const;

const CEILING = [
  { id: 'ceiling1', name: 'ceiling1' },
  { id: 'ceiling2', name: 'ceiling2' },
  { id: 'ceiling3', name: 'ceiling3' },
  { id: 'ceiling4', name: 'ceiling4' },

] as const;

const CP = [
  { id: 'CP1', name: 'controll panel 1' },
  { id: 'CP2', name: 'controll panel 2' },
] as const;

const CPPOSITION = [

  { id: 'rightCenter', name: 'Right Center' },
  { id: 'rightCorner', name: 'Right corner' },
  { id: 'leftCenter', name: 'Left Center' },
  { id: 'leftCorner', name: 'Left corner' },
  { id: 'frontCenter', name: 'Front Center' },
  { id: 'frontRight', name: 'Front Right' },
  { id: 'frontLeft', name: 'Front Left' },

] as const;

const lightType = [
  { id: 'warm', name: 'Warm' },
  { id: 'white', name: 'white' }
] as const;

const FRAME = [
  { id: 'gold', name: 'gold' },
  { id: 'silver', name: 'silver' },
  { id: 'white', name: 'white' }
] as const;



function ConfigPanel({ config, setConfig }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('entrance.')) {
      setConfig({
        ...config,
       
      });
    } else {
      setConfig({
        ...config,
        [name]: type === 'number' ? Number(value) : value,
      });
    }
  };

  return (
    <div className="w-96 bg-white p-6 shadow-lg overflow-y-auto border-l border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Elevator Designer</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Cabin Dimensions</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Width (mm)</label>
            <input
              type="number"
              name="width"
              value={config.width}
              onChange={handleChange}
              min="1000"
              max="3000"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Height (mm)</label>
            <input
              type="number"
              name="height"
              value={config.height}
              onChange={handleChange}
              min="2000"
              max="3000"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Depth (mm)</label>
            <input
              type="number"
              name="depth"
              value={config.depth}
              onChange={handleChange}
              min="1000"
              max="3000"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Materials</h3>
        <div className="space-y-4">



          <h3 className="text-lg font-semibold text-gray-900">Wall Material</h3>
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">wall back</label>
              <select
                name="wallMaterial1"
                value={config.wallMaterial1}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {MATERIALS.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.name}
                  </option>
                ))}
              </select>

              <label className="block text-sm font-medium text-gray-700">side left wall</label>
              <select
                name="wallMaterial2"
                value={config.wallMaterial2}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {MATERIALS.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.name}
                  </option>
                ))}
              </select>
              <label className="block text-sm font-medium text-gray-700">side left wall</label>
              <select
                name="wallMaterial3"
                value={config.wallMaterial3}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {MATERIALS.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.name}
                  </option>
                ))}
              </select>
            </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">floor Material</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">graniet styel</label>
              <select
                name="floorMaterial"
                value={config.floorMaterial}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {FLOOR.map((floor) => (
                  <option key={floor.id} value={floor.id}>
                    {floor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">ceiling Material</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">wood styel</label>
                <select
                  name="ceilingMaterial"
                  value={config.ceilingMaterial}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {CEILING.map((ceiling) => (
                    <option key={ceiling.id} value={ceiling.id}>
                      {ceiling.name}
                    </option>
                  ))}
                </select>
             </div>
            </div>
          </div>

          <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Control Panel</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">control panle style</label>
            <select
              name="cpMaterial"
              value={config.cpMaterial}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {CP.map((cp) => (
                <option key={cp.id} value={cp.id}>
                  {cp.name}
                </option>
              ))}
            </select>
            
          
            <label className="block text-sm font-medium text-gray-700">control panle podition</label>
            <select
              name="cpPosition"
              value={config.cpPosition}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {CPPOSITION.map((cpp) => (
                <option key={cpp.id} value={cpp.id}>
                  {cpp.name}
                </option>
              ))}
            </select>
          </div>

        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Entrances</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Entrances</label>
            <select
              name="entranceCount"
              value={config.entranceCount}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value={1}>1 Entrance</option>
              <option value={2}>2 Entrances</option>
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Spot Lights</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">light type</label>
              <select
                name="lightType"
                value={config.lightType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {lightType.map((lightType) => (
                  <option key={lightType.id} value={lightType.id}>
                    {lightType.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Spot Frame</label>
              <select
                name="spotFrame"
                value={config.spotFrame}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {FRAME.map((FRAME) => (
                  <option key={FRAME.id} value={FRAME.id}>
                    {FRAME.name}
                  </option>
                ))}
              </select>
            </div>
          </div>


        </div>
      </div>
    </div>


  );
}
export default ConfigPanel;
