import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Plane
const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30,30,),
    new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        visible: false
    })
)

planeMesh.rotateX(-Math.PI / 2);
scene.add(planeMesh)

const grid = new THREE.GridHelper(30,30)
scene.add(grid)

// Player
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'purple' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Zombie
const zombieGeo = new THREE.BoxGeometry(1, 1, 1)
const zombieMaterial = new THREE.MeshBasicMaterial({ color: 'brown' })
const zombieMesh = new THREE.Mesh(zombieGeo, zombieMaterial)

zombieMesh.position.set(10, 0, 10)

scene.add(zombieMesh)

// let zombieSpeed = 0.05

function moveZombie(){
    let x,y,z;
    x = Math.floor(Math.random() * 15 + 1)
    y = 0;
    z = Math.floor(Math.random() * 15 + 1)

    console.log(`${'x:' + x + ' y:' + y + ' z:' + z}`)

    zombieMesh.position.set(x,y,z)


}

moveZombie()

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 16
camera.position.y = 20
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    // moveZombie(1)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()