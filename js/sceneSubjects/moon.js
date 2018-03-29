import * as THREE from 'three';
// assets
import moonTexture from '../../images/moon_1024.jpg';

export default class Moon {
	constructor(earthRadius, earthSpeedRotation) {
		this.DISTANCE_FROM_EARTH = 356400;
		this.PERIOD = 28;
		this.EXAGGERATE_FACTOR = 1.2;
		this.INCLINATION = 0.089;
		this.SIZE_IN_EARTHS = 1 / 3.7 * this.EXAGGERATE_FACTOR;
		this.EARTH_RADIUS = earthRadius;
		this.EARTH_SPEED_ROTATION = earthSpeedRotation;

		this.object3D = new THREE.Object3D();
		this.texLoader = new THREE.TextureLoader();

		this.init();
	}

	init() {
		this.loadTextures();
		this.makeMoon();
	}

	loadTextures() {
		this.texture = this.texLoader.load( moonTexture );
	}

	makeMoon() {
		let geom = new THREE.SphereGeometry(
			this.SIZE_IN_EARTHS,
			32, 32
		);
		let mat = new THREE.MeshPhongMaterial({
			map: this.texture
		});

		this.moon = new THREE.Mesh(geom, mat);

		// positioning
		let distance = this.DISTANCE_FROM_EARTH / this.EARTH_RADIUS;

		this.moon.position.set(
			Math.sqrt(distance / 2),
			0,
			-Math.sqrt(distance / 2)
		);

		this.moon.rotation.y = Math.PI;

		this.object3D.add(this.moon);
		this.object3D.rotation.x = this.INCLINATION;
	}

	update() {
		this.object3D.rotation.y += (this.EARTH_SPEED_ROTATION / this.PERIOD)
	}
}