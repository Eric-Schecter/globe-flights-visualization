import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class MyControl extends OrbitControls {
  constructor(camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
    super(camera, canvas);
    this.enablePan = false;
    this.zoomSpeed = 0.5;
    this.maxDistance = 3100;
    this.minDistance = 400;
  }
}