import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Scene from './components/Scene';
import Overlay from './components/Overlay';

export default function App() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <header className="fixed top-0 left-0 w-full z-50 p-6 pointer-events-none">
        <h1 className="text-white font-sans text-xl tracking-[0.2em] font-light">SHADOW&trade;</h1>
      </header>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        <ScrollControls pages={5} damping={0.2}>
          <Scene />
          <Overlay />
        </ScrollControls>

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
