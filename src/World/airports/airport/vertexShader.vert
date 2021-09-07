attribute float scale;

void main(){
  vec4 mvPos=modelViewMatrix*vec4(position,1.);
  gl_Position=projectionMatrix*mvPos;
  gl_PointSize=10.*(scale/-mvPos.z);
}
