import { MathUtils, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class MyControl extends OrbitControls {
  constructor(camera: PerspectiveCamera, private canvas: HTMLCanvasElement) {
    super(camera, canvas);
    this.enablePan = false;
    this.zoomSpeed = 0.5;
    this.maxDistance = 3100;
    this.minDistance = 400;
    // this.iniEvents();
  }
  private wheel = ({ deltaY }: WheelEvent) => {
    if (deltaY === 0) { return }
    const camera = (this.object as PerspectiveCamera);
    const dis = new Vector3().copy(camera.position).distanceTo(new Vector3());
    camera.fov = (dis - 400) / 30;
    camera.fov = MathUtils.clamp(camera.fov, 1, 90);
    camera.updateProjectionMatrix();
    console.log(camera.fov, camera.zoom)
  }
  private iniEvents = () => {
    this.canvas.addEventListener('wheel', this.wheel);
  }
  public dispose = () => {
    this.dispose()
    this.canvas.removeEventListener('wheel', this.wheel);
  }
}