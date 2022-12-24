import * as THREE from "three";
// import { TrackballControls } from "node_modules/three/examples/jsm/controls/TrackballControls.js"
// const TrackballControls = require('TrackballControls');
import { TrackballControls } from "https://cdn.skypack.dev/three-trackballcontrols-ts@0.2.3";

// Scene
const scene = new THREE.Scene();

// Cube
const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff83} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Light
// const light = new THREE.PointLight(0xffffff, 1, 100)
// scene.add(light)

// Lights
const lights = []; // Storage for lights
// const lightHelpers = []; // Storage for light helpers
// Properties for each light
const lightValues = [
    {colour: 0x14D14A, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
    {colour: 0xBE61CF, intensity: 6, dist: 12, x: -2, y: 1, z: -10},
    {colour: 0x00FFFF, intensity: 3, dist: 10, x: 0, y: 10, z: 1},
    {colour: 0x00FF00, intensity: 6, dist: 12, x: 0, y: -10, z: -1},
    {colour: 0x16A7F5, intensity: 6, dist: 12, x: 10, y: 3, z: 0},
    {colour: 0x90F615, intensity: 6, dist: 12, x: -10, y: -1, z: 0}
];
for (let i=0; i<6; i++) {
    // Loop 6 times to add each light to lights array
    // using the lightValues array to input properties
    lights[i] = new THREE.PointLight(
      lightValues[i]['colour'], 
      lightValues[i]['intensity'], 
      lightValues[i]['dist']
    );
  
    lights[i].position.set(
      lightValues[i]['x'], 
      lightValues[i]['y'], 
      lightValues[i]['z']
    );
  
    scene.add(lights[i]);
// Add light helpers for each light
    // lightHelpers[i] = new THREE.PointLightHelper(lights[i]);
    // scene.add(lightHelpers[i]);
};

// Camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight )
camera.position.z = 10
scene.add(camera);


// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)

// Make Canvas Responsive
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

//Trackball Controls for Camera
const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 2;
controls.dynamicDampingFactor = 0.15;

const rendering = function() {
  requestAnimationFrame(rendering);

  // Update trackball controls
  controls.update();

  renderer.render(scene, camera);

}
rendering();