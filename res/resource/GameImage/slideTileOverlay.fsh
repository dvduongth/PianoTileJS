varying vec2 v_texCoord;

uniform float u_slideT;
uniform float u_heightRatio;
uniform float u_alpha;

const vec4 pressCol = vec4(0.988235, 0.831372, 0.207843, 1.);

void main()
{
    vec2 tc = v_texCoord;
    tc.y = tc.y - 1. + u_slideT;
    tc.y *= u_heightRatio;
    
//    vec4 baseCol = texture2D(CC_Texture1, v_texCoord);
//    float overlayCol = texture2D(CC_Texture0, tc).a;
//    vec4 outCol = mix(baseCol, pressCol, overlayCol);
    
    vec4 overlayCol = texture2D(CC_Texture0, tc) * u_alpha;
    gl_FragColor = overlayCol;
}