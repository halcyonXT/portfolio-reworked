import React from 'react'
import './Home.css'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import SceneInit from './SceneInit'


export default function Home(props) {

    React.useEffect(() => {
        const test = new SceneInit('three-canvas', 'three-wrapper');
        test.initialize();
        test.animate();

        let loadedModel;
        const stlLoader = new GLTFLoader();
        stlLoader.load('/portfolio-reworked/modelnet9.gltf', (stlScene) => {
            loadedModel = stlScene;
            test.scene.rotation.x = -0.3;
            test.scene.rotation.z = -0.2;
            test.scene.scale.set(0.65,0.65,0.65)
            test.scene.traverse((node) => {
                if (!node.isMesh) return;
                node.material.wireframe = true;
              });
            test.scene.add(stlScene.scene)
        })

        const animate = () => {
            if (loadedModel) {
              loadedModel.scene.rotation.y += 0.015;
            }
            requestAnimationFrame(animate);
          };
          animate();
    }, [])

    return (
        <div className='three-wrapper' id='three-wrapper'>
            <canvas id="three-canvas"></canvas>
        </div>
    )
}
