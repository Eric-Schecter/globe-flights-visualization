uniform vec3 uColor;

void main()
{
    float dist=length(2.*gl_PointCoord-1.);
    float alpha = dist > 1. ? 0. : 1.;
    gl_FragColor=vec4(uColor,alpha);
}