import * as THREE from 'three';

// assets
import sunmap from '../../images/color-texture.jpg';
import noisemap from '../../images/lavatile.jpg';

// shaders
import vertexShader from '../../shaders/star-vertex.glsl';
import fragmentShader from '../../shaders/star-fragment.glsl';

export default class ChaosStar {
	constructor(scene) {
		// Public props -----------------------------

		this.coordsNeedUpdate = true;

		// Private props -----------------------------------

		this._scene = scene;
		this._loader = new THREE.TextureLoader();

		this._init();
	}

	// Public Methods ----------------------------------
	
	update(delta) {
		this._uniforms.time.value += delta;
		
		this._mesh.rotation.y -= 0.001;

		this._moveStarWaves();
	}
	
	updateClientCoords(coords) {
		this._uniforms.mouse.value = new THREE.Vector2(
			coords.x,
			coords.y
		);
	}
	
	// Private Methods ----------------------------------

	_init() {
		this._setupTextures();
		this._setupUniforms();
		this._makeStar();
		this._moveStarWaves()
	}

	_setupTextures() {
		this.SUNMAP = this._loader.load(sunmap);
		this.SUNMAP.wrapS = this.SUNMAP.wrapT = THREE.RepeatWrapping;
		
		this.NOISEMAP = this._loader.load(noisemap);
		this.NOISEMAP.wrapS = this.NOISEMAP.wrapT = THREE.RepeatWrapping;
	}

	_setupUniforms() {
		this._uniforms = {
			time: {
				type: 'f',
				value: 1.0
			},
			mouse: {
				type: 'v2',
				value: new THREE.Vector2(1, 1)
			},
			texture1: {
				type: 't',
				value: this.NOISEMAP
			},
			texture2: {
				type: 't',
				value: this.SUNMAP
			}
		};
	}

	_makeStar() {
		// geom ---------------------------
		let geom = new THREE.SphereGeometry(1, 32, 32);
		geom.mergeVertices();

		let vLength = geom.vertices.length;

		this._waves = [];

		for(let i = 0; i < vLength; i++) {
			let v = geom.vertices[i];

			this._waves.push({
				y: v.y,
				x: v.x,
				z: v.z,
				ang: Math.random() * Math.PI * 2,
				amp: 0.05 + Math.random() * 0.15,
				speed: 0.004 + Math.random() * 0.008
			});
		}
		

		// mat -----------------------------
		let mat = new THREE.ShaderMaterial({
			uniforms: this._uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		});

		this._mesh = new THREE.Mesh(geom, mat);

		this._scene.add(this._mesh);
	}

	_moveStarWaves() {
		let verts = this._mesh.geometry.vertices;
		let vLength = verts.length;

		for(let i = 0; i < vLength; i++) {
			let v = verts[i];

			let vprops = this._waves[i];

			v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
			v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;

			vprops.ang += vprops.speed;
		}

		this._mesh.geometry.verticesNeedUpdate = true;
	}
}

// --------------------------------------------------------------