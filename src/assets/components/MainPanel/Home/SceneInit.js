import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import gsap from 'gsap'

export default class SceneInit {
  constructor(canvasId, parentId) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;
    this.parentId = parentId

    // NOTE: Additional components.
    this.clock = undefined;
    this.stats = undefined;
    this.controls = undefined;

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    var parentDiv = document.getElementById(this.parentId);

    // Get the width and height of the div
    var divWidth = parentDiv.clientWidth;
    var divHeight = parentDiv.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      divWidth / divHeight,
      1,
      1000
    );
    this.camera.position.z = 102;

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });
    this.renderer.setSize(divWidth, divHeight);
    // this.renderer.shadowMap.enabled = true;
    document.getElementById(this.parentId).appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.NONE, // Set RIGHT to NONE to disable right-click
    };
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.07;
    /*
    this.stats = Stats();
    document.body.appendChild(this.stats.dom); VISIT LINE 94 IF STATS ARE RE-ENABLED
    */

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0x101820, 1.25);
    //this.directionalLight.castShadow = false;
    this.directionalLight.position.set(64, 64, 64);
    this.scene.add(this.directionalLight);

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);

    // NOTE: Load space background.
    // this.loader = new THREE.TextureLoader();
    this.scene.background = new THREE.Color(0xd3bf0f);

    // NOTE: Declare uniforms to pass into glsl shaders.
    // this.uniforms = {
    //   u_time: { type: 'f', value: 1.0 },
    //   colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
    //   colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
    // };
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    //this.stats.update();
    this.controls.update();
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    var parentDiv = document.getElementById(this.parentId);

    // Get the width and height of the div
    var divWidth = parentDiv.clientWidth;
    var divHeight = parentDiv.clientHeight;
    this.camera.aspect = divWidth / divHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(divWidth, divHeight);
  }
}