import Application from "../Application";

import * as THREE from 'three';

export default class World {
    constructor() {
        this.app = Application.getInstance();

        this.scene = new THREE.Object3D;

        this.setObjects();
        this.setLighting();
    }

    setObjects() {
        this.wireframeMesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2, 2, 2, 2), new THREE.MeshStandardMaterial({ wireframe: true, color: 0x000000, opacity: 0, transparent: true, depthWrite: false }))

        const textureLoader = new THREE.TextureLoader();

        function createStandardMaterial(options = {}) {
            return new THREE.MeshStandardMaterial({
                color: 0xffffff,
                ...options
            });
        }

        const pngTexture = textureLoader.load("/images/cubeSide.png");
        pngTexture.colorSpace = THREE.SRGBColorSpace;

        const pngMaterials = Array.from({ length: 6 }, (_, index) => {
            if (index === 2 || index === 5) {
                return createStandardMaterial({ map: pngTexture, opacity: 0, transparent: true });
            }

            return createStandardMaterial({ map: pngTexture, opacity: 0, transparent: true  });
        });

        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), pngMaterials)
        this.meshCol = new THREE.Group();
        this.meshCol.add(this.wireframeMesh, this.mesh)

        this.scene.add(this.meshCol)
    }

    setLighting() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 1)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(0, 10, 10);

        this.scene.add(this.ambientLight, directionalLight);
    }
}