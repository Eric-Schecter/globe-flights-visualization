import { Camera, Clock, Scene, WebGLRenderer } from "three";
import { Tickable } from "../../shared/types";
import { MyControl } from "./control";

class MinUpdateFreq {
  private time = 0;
  constructor(private freq = 60) { }
  public get needsUpdate() {
    const now = performance.now();
    const res = (now - this.time) > 1000 / this.freq;
    if (res) {
      this.time = now;
    }
    return res;
  }
}

export class Loop {
  private pre = false;
  private clock = new Clock();
  private minUpdateFreq = new MinUpdateFreq();
  constructor(private renderer: WebGLRenderer, private scene: Scene, private camera: Camera, private control: MyControl) { }
  public start = () => {
    this.renderer.setAnimationLoop(() => {
      const needsUpdate = this.minUpdateFreq.needsUpdate;
      this.renderOndemand(needsUpdate);
      if (!needsUpdate) {
        this.renderContinuously();
      }
    });
  }
  private tick = (delta: number) => {
    this.scene.traverse(obj => {
      const tickableObj = obj as Tickable;
      tickableObj.tick && tickableObj.tick(delta);
    })
  }
  private render = () => {
    this.renderer.render(this.scene, this.camera);
  }
  public renderContinuously = () => {
    const delta = this.clock.getDelta();
    this.tick(delta);
    this.render();
  }
  private renderOndemand = (ondemand: boolean) => {
    if (ondemand === this.pre) { return }
    this.pre = ondemand;
    if (ondemand) {
      this.control.addEventListener('change', this.render);
    } else {
      this.control.removeEventListener('change', this.render);
    }
  }
  public stop = () => {
    this.renderer.setAnimationLoop(null);
  }
}
