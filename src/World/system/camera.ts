import { PerspectiveCamera } from "three";

export class MyCamera extends PerspectiveCamera {
  constructor(fov: number, ratio: number, near: number, far: number) {
    super(fov, ratio, near, far);
    this.position.set(0, 0, 1000);
    this.lookAt(0, 0, 0);
  }
}