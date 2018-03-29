import * as THREE from 'three';

export default class SunSimulation {
	constructor(scene) {
		this.scene = scene;

		this.init();
	}
	
	init() {
		let light = new THREE.PointLight(0xffffff, 2, 100);
		light.position.set(-10, 0, 20);

		this.scene.add(light);
	}
}