import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 105, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 6;
camera.position.y = 3
camera.position.x = 0;
// camera.fov = 90;

// function animate() {
// 	requestAnimationFrame( animate );

// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;

// 	renderer.render( scene, camera );
// }

// animate();


const loader = new GLTFLoader();

loader.load( './eukaryotic-cell.glb', function ( gltf ) {

	scene.add( gltf.scene );
    console.debug( gltf );
    renderer.render( scene, camera );

}, undefined, function ( error ) {

	console.error( "error" );

} );

//свет
var directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Параметры: цвет (белый) и интенсивность (1)

// Настроим позицию источника света
directionalLight.position.set(0, 15, 0); // Установим позицию света (x, y, z)

// Добавим свет на сцену
scene.add(directionalLight);

// Добавим небольшую вспомогательную сетку для отображения положения источника света
var helper = new THREE.DirectionalLightHelper(directionalLight, 5); // 5 - это размер сетки
scene.add(helper);


// vr 
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;
renderer.setAnimationLoop( function () {

	renderer.render( scene, camera );

} );