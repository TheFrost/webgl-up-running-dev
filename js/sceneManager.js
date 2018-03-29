import * as THREE from 'three';

// subjects
import ChaosStar from './sceneSubjects/chaosStar';
// import Earth from './sceneSubjects/earth';
// import SunSimulation from './sceneSubjects/sunSimulation';

export default class SceneManager {
	constructor(canvas) {
		this._canvas = canvas;

		this._clock = new THREE.Clock();

		this._screenDimentions = {
			width: this._canvas.width,
			height: this._canvas.height
		};

		this.init();
	}

	// Public Methods -----------------------------------------
	
	init() {
		this._scene = this._buildScene();
		this._renderer = this._buildRender(this._screenDimentions);
		this._camera = this._buildCamera(this._screenDimentions);
		this._sceneSubjects = this._createScenSubjects(this._scene);
	}

	update() {
		let delta = this._clock.getDelta();
		
		for(let i = 0; i < this._sceneSubjects.length; i++) {
			if(this._sceneSubjects[i].update) {
				this._sceneSubjects[i].update(delta);
			}
		}

		this._renderer.render(this._scene, this._camera);
	}

	updateClientCoords(coords) {
		for(let i = 0; i < this._sceneSubjects.length; i++) {
			if (this._sceneSubjects[i].coordsNeedUpdate) {
				this._sceneSubjects[i].updateClientCoords(coords);
			}
		}
	}

	onWindowResize() {
		const { width, height } = this._canvas;

		this._screenDimentions.width = width;
		this._screenDimentions.height = height;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(width, height);
	}

	// Private Methods -----------------------------------------

	_createScenSubjects(scene) {
		const sceneSubjects = [
			// earth moon ----------
			// new Earth(scene),
			// new SunSimulation(scene)

			// chaos star -----------
			new ChaosStar(scene)
		];

		return sceneSubjects;
	}
	
	_buildScene() {
		const scene = new THREE.Scene();
		scene.background = new THREE.Color('#000');
		
		return scene;
	}

	_buildRender({ width, height }) {
		const renderer = new THREE.WebGLRenderer({
			canvas: this._canvas,
			antialias: true,
			alpha: true
		});

		const DPR = (window.devicePixelRatio) 
			? window.devicePixelRatio 
			: 1;

		renderer.setPixelRatio(DPR);
		renderer.setSize(width, height);

		renderer.gammaInput = true;
		renderer.gammaOutput = true;

		return renderer;
	}

	_buildCamera({ width, height }) {
		const aspectRatio = width / height;
		const fieldOfView = 45;
		const nearPlane = 1;
		const farPlane = 1000;
		const camera = new THREE.PerspectiveCamera(
			fieldOfView, 
			aspectRatio, 
			nearPlane, 
			farPlane
		);

		camera.position.z = 3.3333; 

		return camera;
	}
}