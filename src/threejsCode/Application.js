import * as THREE from 'three';

import gsap from 'gsap';
import AnimationTracker from './utils/AnimationTracker';
import Time from './utils/Time';
import Viewport from './utils/Viewport';
import World from './world';

export default class Application {
    static getInstance(_options) {
        if (!Application.instance)
            new Application(_options)

        return Application.instance;
    }

    constructor(_options) {
        this.$canvas = _options.$canvas;
        this.animationState = false;
        this.animationSetup = false;

        Application.instance = this;

        this.init()
    }

    async init() {
        this.scene = new THREE.Scene();

        this.time = new Time();
        this.viewport = new Viewport(this.$canvas);

        this.setRenderer();
        this.setCamera();

        this.setWorld();

        this.animationTrack = AnimationTracker.getInstance()

        this.setTick();
        this.setResize();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.$canvas,
            alpha: true,
            powerPreference: 'high-performance',
        })

        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(2);
    }

    setCamera() {
        const aspect = this.viewport.ratio;
        this.frustumSize = 6;

        this.camera = new THREE.OrthographicCamera(
            (-this.frustumSize * aspect) / 2,
            (this.frustumSize * aspect) / 2,
            this.frustumSize / 2,
            -this.frustumSize / 2,
            0.1, 100
        );

        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(0, 0, 0);
    }

    setTick() {
        this.time.events.on('tick', () => {
            this.renderer.render(this.scene, this.camera);

            // console.log(this.camera.position.x.toFixed(2), this.camera.position.y.toFixed(2), this.camera.position.z.toFixed(2))

            if (this.animationSetup) {
                this.heroTimeline.progress(this.animationTrack.animationEvents['HEROIN'])
                this.rotateTimeline.progress(this.animationTrack.animationEvents['JOURNEYIN'])
            }
        })
    }

    setResize() {
        this.viewport.events.on('resize', () => {
            const aspect = this.viewport.ratio;

            this.camera.left = (-this.frustumSize * aspect) / 2;
            this.camera.right = (this.frustumSize * aspect) / 2;
            this.camera.top = this.frustumSize / 2;
            this.camera.bottom = -this.frustumSize / 2;

            this.camera.updateProjectionMatrix();

            this.renderer.setSize(this.viewport.width, this.viewport.height);
        })
    }

    setWorld() {
        this.world = new World();

        this.scene.add(this.world.scene)
    }

    setAnimation(_state) {
        this.animationState = _state;

        if (this.animationState) {
            gsap.to(this.world.meshCol.position, {
                y: -0.8,
                duration: 1,
            })

            gsap.to(this.world.wireframeMesh.material, {
                opacity: 1,
                duration: 1,
            }, "<")

            gsap.to(this.world.meshCol.rotation, {
                z: Math.PI / 4,
                duration: 1,
                ease: 'power2.inOut'
            })

            this.cameraTarget = new THREE.Vector3(0, 0, 0);

            this.heroTimeline = gsap.timeline()
                .to(this.world.meshCol.position, { y: 0, duration: 0.2 },)
                .to(this.world.meshCol.rotation, { z: 0, duration: 0.2 }, "<")
            this.heroTimeline.pause()

            this.rotateTimeline = gsap.timeline()
                .to(this.camera.position, {
                    z: 8,
                    y: 8,
                    x: 8,
                    duration: 0.8,
                    onUpdate: () => {
                        this.camera.lookAt(this.cameraTarget);
                    },
                })
                .to(this.world.mesh.material, {
                    opacity: 1,
                    duration: 0.8,
                }, "<")
            this.rotateTimeline.pause()

            this.animationSetup = true;
        }
    }
}
