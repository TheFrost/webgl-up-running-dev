uniform vec2 mouse;

uniform float time;

uniform sampler2D texture1;
uniform sampler2D texture2;

varying vec2 texCoord;

void main( void ) {

	vec2 normMouse = (mouse + vec2(0.1));
	vec4 noise = texture2D( texture1, texCoord );
	
	vec2 T1 = texCoord + vec2( 1.5, -1.5 ) * sin(time) * 0.02;
	vec2 T2 = texCoord + vec2( -0.5, 2.0 ) * cos(time) * 0.02;

	T1.x -= noise.r * 2.0 * normMouse.y;
	T1.y += noise.g * 4.0 * normMouse.x;
	T2.x += noise.g * 0.2 * normMouse.y;
	T2.y += noise.b * 0.2 * normMouse.x;

	float p = texture2D( texture1, T1 * 2.0 ).a + 0.25;

	vec4 color = texture2D( texture2, T2 );
	vec4 temp = color * 2.0 * ( vec4( p ) ) + ( color * color );
	
	gl_FragColor = temp - vec4(normMouse, normMouse);

}