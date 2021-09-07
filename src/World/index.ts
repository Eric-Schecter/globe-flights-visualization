import { Cache, Object3D, Scene, WebGLRenderer } from 'three';
import { AirPorts } from './airports';
import { Earth } from './earth';
import { Loop, MyRenderer, MyScene, MyCamera, Resizer, Lights, MyControl } from './system';

export class World {
  private scene: Scene;
  private camera: MyCamera;
  private renderer: WebGLRenderer;
  private loop: Loop;
  private resizer: Resizer;
  private lights: Lights;
  private control: MyControl;
  private pre = false;
  private getProgress = () => '0/0';

  constructor(container: HTMLElement) {
    Cache.enabled = true;
    this.renderer = new MyRenderer(container);
    const canvas = this.renderer.domElement;
    const { clientWidth, clientHeight } = canvas;
    this.scene = new MyScene();
    const assets = this.createAssets();
    this.camera = new MyCamera(45, clientWidth / clientHeight, 0.1, 10000);
    this.resizer = new Resizer(this.renderer, this.camera, container);
    this.lights = new Lights();
    this.scene.add(...assets, ...this.lights.instance, this.camera);
    this.loop = new Loop(this.renderer, this.scene, this.camera, this);
    this.loop.start();
    this.control = new MyControl(this.camera, canvas);
  }
  public changeRenderMode = (onDemand: boolean) => {
    if (onDemand === this.pre) { return }
    this.pre = onDemand;
    if (onDemand) {
      this.control.addEventListener('change', this.render);
    } else {
      this.control.removeEventListener('change', this.render);
    }
  }
  private render = () => {
    this.renderer.render(this.scene, this.camera);
  }
  private createAssets = () => {
    const radius = 300;
    const earth = new Earth(radius)
    const airports = new AirPorts(radius);
    this.getProgress = airports.getProgress;
    return [earth, airports];
  }
  public dispose = () => {
    Object.values(this).forEach(component => {
      if (component.hasOwnProperty('dispose')) {
        component.dispose();
      }
      if (component instanceof Object3D && component.type === 'Scene') {
        component.traverse(com => com.dispatchEvent({ type: 'dispose' }));
      }
    })
  }
  public get progress() {
    return this.getProgress
  }
}