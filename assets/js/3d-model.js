import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer, model, controls;

const loader = new GLTFLoader();


init();

function init() {
  // Create a camera, scene, and renderer
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create the model
  // Load a glTF resource
  loader.load(
    // resource URL
    './assets/stikpack.glb',
    // called when the resource is loaded
    function ( gltf ) {
    // get the loaded model
    model = gltf.scene;

    model.position.set(0, 0, 0);
    model.rotation.set(0, 0, 0);
    model.scale.set(1, 1, 1);

    // add the model to the scene
    scene.add( model );
    },
    // called while loading is progressing
    function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
    console.error( error );
    }
);


  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  model  = new THREE.Mesh(geometry, material);
  scene.add(model);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  // Add event listeners
  window.addEventListener('resize', onWindowResize, false);

  // Start the animation loop
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the model
  model.rotation.y += 0.01;


  // Render the scene
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
