import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Cube = () => (
  <mesh rotation={[0.5, 0.5, 0]}>
    <boxGeometry args={[2, 2, 2]} />
    <meshStandardMaterial color="#68D391" wireframe={false} />
  </mesh>
);

// Simple responsive 3D slider demo
const Home3DSlider: React.FC = () => {
  return (
    <section className="w-full py-10 px-0 sm:px-2 mb-8">
      <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl group bg-gradient-to-r from-blue-100 via-white to-green-50">
        <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
          {/* 3D Canvas */}
          <div className="flex-1 w-full h-60 md:h-80 ">
            <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
              <ambientLight intensity={0.9} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <Suspense fallback={null}>
                <Cube />
              </Suspense>
              <OrbitControls enableZoom={true} />
            </Canvas>
          </div>
          {/* Slide Content */}
          <div className="flex-1 max-w-md text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary drop-shadow animate-fade-in">
              Experience 3D Shopping
            </h3>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 mb-5 animate-fade-in">
              Interact with products in true 3D—rotate, zoom, and explore from any angle. The future of e-commerce visualization starts here.
            </p>
            <a
              href="#featured-products"
              className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-green-400 via-blue-400 to-teal-400 text-white font-bold shadow-lg hover:scale-105 hover:from-teal-500 hover:to-blue-700 transition-all animate-scale-in"
            >
              Start Exploring
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home3DSlider;
