import * as THREE from 'three';
// assets
import earthClouds from '../../images/earth_clouds_1024.png';
import earthTexture from '../../images/earth_surface_2048.jpg';
import earthNightMap from '../../images/earth_nightmap.jpg';
import earthNormalMap from '../../images/earth_normal_2048.jpg';
import earthSpecularMap from '../../images/earth_specular_2048.jpg';

// subjects
import Moon from './moon';

export default class Earth {
	constructor(scene) {
		this.scene = scene;

		this.RADIUS = 6371;
		this.SPEED = 0.003;
		this.TILT = 0.41;
		this.CLOUDS_SCALE = 1.005;
		this.CLOUDS_SPEED = this.SPEED * 0.95;
		
		this.object3D = new THREE.Object3D();
		this.texLoader = new THREE.TextureLoader();
		
		this.init();
	}
	
	init() {
		this.loadTextures();
		this.makePlanet();
		this.makeClouds();
		this.makeMoon();
	}
	
	loadTextures() {
		this.texture = this.texLoader.load( earthTexture );
		this.normalMap = this.texLoader.load( earthNormalMap );
		this.specularMap = this.texLoader.load( earthSpecularMap );
		this.cloudsTexture = this.texLoader.load( earthClouds );
	}
	
	makePlanet() {
		let geom = new THREE.SphereGeometry(1, 32, 32);
		let mat = new THREE.MeshPhongMaterial({
			map: this.texture,
			normalMap: this.normalMap,
			specularMap: this.specularMap
		});
		
		this.planet = new THREE.Mesh(geom, mat);
		this.planet.rotation.x = this.TILT;
		
		this.object3D.add(this.planet);

		this.scene.add(this.object3D);
	}
	
	makeClouds() {
		let geom = new THREE.SphereGeometry(this.CLOUDS_SCALE, 32, 32);
		let mat = new THREE.MeshLambertMaterial({
			color: 0xffffff,
			map: this.cloudsTexture,
			transparent: true
		});
		
		this.clouds = new THREE.Mesh(geom, mat);
		this.clouds.rotation.x = this.TILT;
		
		this.object3D.add(this.clouds);
	}

	makeMoon() {
		this.moon = new Moon(this.RADIUS, this.SPEED);
		this.object3D.add(this.moon.object3D);
	}
	
	update() {
		this.planet.rotation.y += this.SPEED;
		this.clouds.rotation.y += this.CLOUDS_SPEED;
		this.moon.update();
	}
}