#ifdef GL_ES
precision lowp float;
#endif

varying vec2 v_texCoord;
uniform sampler2D u_texture;
varying vec4 v_fragmentColor;
uniform float CC_alpha_value;

void main()
{
	vec4 texColor = texture2D(CC_Texture0, v_texCoord);

    if ( texColor.a <= CC_alpha_value )
        discard;

	float gray= 0.299*texColor.r+0.587*texColor.g+0.114*texColor.b;

	gl_FragColor=vec4(gray,gray,gray,texColor.a)  * v_fragmentColor;
}