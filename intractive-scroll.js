// Import necessary Three.js modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2f2f2); // Set background to white

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const radius = 20; // Fixed distance from the model
let angle = 6; // Rotation angle
let height = 5; // Initial height
window.innerHeight = 740;

// Set initial camera position
camera.position.set(radius * Math.cos(angle), 5, radius * Math.sin(angle));
camera.lookAt(0, 0, 0); // Ensure camera is looking at the model

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
        scene.add(model);
    },
    (xhr) => console.log(`Loading progress: ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`),
    (error) => console.error('Error loading model:', error)
);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = false; 
controls.enableZoom = false; // Disable zoom

// Scroll-based rotation
window.addEventListener("wheel", (event) => {
    const delta = event.deltaY * 0.001; // Normalize scroll speed

    angle += delta * 2; // Adjust rotation speed
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);

    camera.lookAt(0, 0, 0); // Keep the model centered
});

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
