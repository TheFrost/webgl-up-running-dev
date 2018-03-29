// Helper for get text from url GLSL files as string -------------------
export function getGlslSource(vertexUrl, fragmentUrl) {
	var vertexFetch = fetch(vertexUrl)
		.then(response => response.text());

	var fragmentFetch = fetch(fragmentUrl)
		.then(response => response.text());

	return Promise.all([vertexFetch, fragmentFetch])
		.then(values => { 
			return {
				vertex: values[0], 
				fragment: values[1]
			}; 
		});
}