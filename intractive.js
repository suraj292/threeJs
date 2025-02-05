// Import necessary Three.js modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();

scene.background = new THREE.Color(0xf2f2f2); // Set background to white

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 1, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Load 3D model
const loader = new GLTFLoader();
let model;
loader.load(
    'models/train/queensland_rail_diesel_tilt_train_power_car.glb',
    (gltf) => {
        model = gltf.scene;
        console.log("Model loaded successfully:", model);
        scene.add(model);
    },
    (xhr) => {
        console.log(`Loading progress: ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`);
    },
    (error) => {
        console.error('Error loading model:', error);
    }
);

// Orbit Controls for cursor interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true; // Enables auto-rotation
controls.autoRotateSpeed = 1.5; // Adjust speed

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
