import SceneManager from './sceneManager';

export default class App {
	constructor(canvas) {
		this._canvas = canvas;
		
		this._sceneManager = new SceneManager(this._canvas);
	}

	// Public Methods ------------------------------------
	
	init() {
		this._resizeCanvas();
		this._bindEvents();
		this._render();
	}
	
	// Private Methods ------------------------------------

	_bindEvents() {
		window.onresize = this._resizeCanvas.bind(this);

		['mousemove', 'touchmove'].forEach(event => {
			document.addEventListener(
				event, 
				this._updateClientCoords.bind(this), 
				false
			)
		});
	}
	
	_render() {
		window.requestAnimationFrame(this._render.bind(this));
		this._sceneManager.update();
	}

	_resizeCanvas() {
		this._canvas.style.width = '100vw';
		this._canvas.style.height = '100vh';

		this._canvas.width = this._canvas.offsetWidth;
		this._canvas.height = this._canvas.offsetHeight;

		this._sceneManager.onWindowResize();
	}

	_updateClientCoords(e) {
		let eventInfo = e.touches
			? e.touches[0]
			: e;

		let clientInfo = {
			x: eventInfo.clientX / this._canvas.width,
			y: eventInfo.clientY / this._canvas.height,
		};

		this._sceneManager.updateClientCoords(clientInfo);
	}
}