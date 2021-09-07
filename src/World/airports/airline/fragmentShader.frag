uniform float uTime;

in vec2 vUv;

const vec3 red = vec3(1.,0.,0.);
const vec3 green = vec3(0.,1.,0.);

void main()
{
    vec3 color = mix(green,red,vUv.x);
    gl_FragColor=vec4(color,1.);
}