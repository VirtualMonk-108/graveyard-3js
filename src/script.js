import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
//const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping


const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

const matcapTexture2 = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png')
const matcapTexture5 = textureLoader.load('/textures/matcaps/5.png')
const matcapTexture6 = textureLoader.load('/textures/matcaps/6.png')
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png')
const matcapTexture8 = textureLoader.load('/textures/matcaps/8.png')


/**
 * Fonts
 */
const fontLoader = new FontLoader()

let text;

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Beware!',
            {
                font: font, // font is a FontLoader instance
                size: 1.5,
                height: 0.5,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        );
        textGeometry.center();
        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture7 });
        text = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(text);

        text.position.y = 5
        text.position.z = 8
        text.position.x = -0.6
    }

)




/**
 * Perimeter walls
 */
// perimater wall one
const perimaterWallOne = new THREE.Mesh(
    new THREE.BoxGeometry(20, 1, 0.2),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
perimaterWallOne.position.y = 0.5
perimaterWallOne.position.z = -9.5
perimaterWallOne.position.x = 0
scene.add(perimaterWallOne)

// // perimater wall two
// Perimeter wall two
const wallWidth = 20;
const wallHeight = 1;
const wallDepth = 0.2;

// Left side of the wall
const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(wallWidth / 2 - 2.9, wallHeight, wallDepth),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
);
leftWall.position.y = wallHeight / 2;
leftWall.position.z = 9.5;
leftWall.position.x = -6.4
scene.add(leftWall);


// add rusty_old_gate.glb model inbetween the two walls
const rustyOldGate = new GLTFLoader();
rustyOldGate.load(
    '/models/rusty_old_gate.glb',
    (gltf) => {
        const gate = gltf.scene;
        gate.scale.set(2, 1.5, 2); // Set the desired scale of the model
        gate.position.y = 0; // Adjust the position of the model along the y-axis
        gate.position.z = 8.9 // Adjust the position of the model along the z-axis
        gate.position.x = -6.2; // Adjust the position of the model along the x-axis

        scene.add(gate); // Add the model to the scene
    }
);
// add spotlight shining directly above the gate
const gateSpotLight = new THREE.SpotLight(0xffffff, 1, 7, Math.PI / 3, 0.25, 2);
gateSpotLight.position.set(-6.2, 2.5, 8.9);
gateSpotLight.target.position.set(-6.2, 0, 8.9);
scene.add(gateSpotLight, gateSpotLight.target);



// Right side of the wall
const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(wallWidth / 2 - 1.7, wallHeight, wallDepth),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
);
rightWall.position.y = wallHeight / 2;
rightWall.position.z = 9.5;
rightWall.position.x = 5.9
scene.add(rightWall);



// perimater wall three
const perimaterWallThree = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 1, 19.2),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
perimaterWallThree.position.y = 0.5
perimaterWallThree.position.x = -10
scene.add(perimaterWallThree)

// perimater wall four
const perimaterWallFour = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 1, 19.2),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
perimaterWallFour.position.y = 0.5
perimaterWallFour.position.x = 10
scene.add(perimaterWallFour)

/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,
    })
)
walls.position.y = 1.25
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.rotation.y = Math.PI * 0.25
roof.position.y = 2.5 + 0.5
house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

// Load the font
fontLoader.load('fonts/helvetiker_regular.typeface.json', (font) => {
    // Create a text geometry
    const graveTextGeometry = new TextGeometry('R.I.P', {
        font: font,
        size: 0.2,
        height: 0.05,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 5
    })

    // Create a text material
    const textMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' })

    // Iterate through each grave
    graves.children.forEach((grave) => {
        // Create a text mesh
        const textMesh = new THREE.Mesh(graveTextGeometry, textMaterial)

        // Position the text mesh in the middle of the grave
        textMesh.position.copy(grave.position)
        textMesh.position.y += 0.4
        textMesh.position.x -= 0.15

        // Add the text mesh to the graves group
        graves.add(textMesh)
    })
})

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.3, z)
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.castShadow = true
    graves.add(grave)
}



// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 19),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

// Ghost model
const ghost1Model = new GLTFLoader()
ghost1Model.load(
    '/models/ghost.glb',
    (gltf) => {
        const ghost = gltf.scene
        ghost.scale.set(0.2, 0.2, 0.2)
        ghost.position.set(0, 0.5, 0)
        ghost1.add(ghost)

        // Animate ghost1's position
        TweenMax.to(ghost.position, 2, { x: 2, y: 0.5, z: 2, repeat: -1, yoyo: true })
    }
)

const ghost2Model = new GLTFLoader()
ghost2Model.load(
    '/models/ghost.glb',
    (gltf) => {
        const ghost = gltf.scene
        ghost.scale.set(0.2, 0.2, 0.2)
        ghost.position.set(1, 1.5, 1)
        ghost2.add(ghost)

        // Animate ghost2's position
        TweenMax.to(ghost.position, 3, { x: -2, y: 1.5, z: -2, repeat: -1, yoyo: true })
    }
)

const brokeCoffinModel = new GLTFLoader();
brokeCoffinModel.load(
    '/models/broken_coffin.glb',
    (gltf) => {
        const brokeCoffin = gltf.scene;
        brokeCoffin.scale.set(0.02, 0.02, 0.02);
        brokeCoffin.position.set(6, 0, 6);
        scene.add(brokeCoffin);
    }
);


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.26)
moonLight.position.set(4, 5, - 2)
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

const doorLight = new THREE.PointLight('#ff7d46', 3, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

// Ghosts
const ghost1 = new THREE.PointLight('#ff00ff', 6, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 6, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 6, 3)
scene.add(ghost3)

const ghostLight = new THREE.PointLight('#FABFOC', 6, 3);
scene.add(ghostLight);



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 8
camera.position.z = 18
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// controls for mobile phones dragging and swiping and zooming
controls.enablePan = true;
controls.enableZoom = true;
controls.enableRotate = true;
controls.autoRotate = false;
controls.autoRotateSpeed = 0.5;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.5;
controls.zoomSpeed = 0.5;
controls.panSpeed = 0.5;
controls.minDistance = 1;
controls.maxDistance = 100;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2;
controls.minAzimuthAngle = - Infinity;
controls.maxAzimuthAngle = Infinity;
controls.keys = {
    LEFT: 37, //left arrow
    UP: 38, // up arrow
    RIGHT: 39, // right arrow
    BOTTOM: 40 // down arrow
};




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
walls.castShadow = true
floor.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

ghostLight.shadow.mapSize.width = 256
ghostLight.shadow.mapSize.height = 256
ghostLight.shadow.camera.far = 7






/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghostLightAngle = - elapsedTime * 0.18
    ghostLight.position.x = Math.cos(ghostLightAngle) * (7 + Math.sin(elapsedTime * 0.32))
    ghostLight.position.z = Math.sin(ghostLightAngle) * (7 + Math.sin(elapsedTime * 0.5))
    ghostLight.position.y = Math.sin(ghostLightAngle * 4) + Math.sin(elapsedTime * 2.5)




    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()