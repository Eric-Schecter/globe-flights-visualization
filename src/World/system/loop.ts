import { Camera, Clock, Scene, WebGLRenderer } from "three";
import { World } from "..";
import { Tickable } from "../../shared/types";

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
  private clock = new Clock();
  private minUpdateFreq = new MinUpdateFreq();
  constructor(private renderer: WebGLRenderer, private scene: Scene, private camera: Camera,private world:World) { }
  private tick = (delta: number) => {
    this.scene.traverse(obj => {
      const tickableObj = obj as Tickable;
      tickableObj.tick && tickableObj.tick(delta);
    })
  }
  public start = () => {
    this.renderer.setAnimationLoop(() => {
      const needsUpdate = this.minUpdateFreq.needsUpdate;
      this.world.changeRenderMode(needsUpdate);
      if(!needsUpdate){
        const delta = this.clock.getDelta();
        this.tick(delta);
        this.renderer.render(this.scene, this.camera);
      }
    });
  }
  public stop = () => {
    this.renderer.setAnimationLoop(null);
  }
}
