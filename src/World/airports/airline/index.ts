import { CatmullRomCurve3, Mesh, ShaderMaterial, TubeBufferGeometry, Vector3 } from "three";
import * as vertexShader from './vertexShader.vert';
import * as fragmentShader from './fragmentShader.frag';
import { vec3 } from "../type";
import { Tickable } from "../../../shared";

export class AirLine extends Mesh implements Tickable {
  private static createCurve = (src: vec3, dst: vec3) => {
    const srcVec = new Vector3(...src);
    const dstVec = new Vector3(...dst);
    const points: Vector3[] = [];
    const length = 20;
    for (let i = 0; i <= length; i++) {
      const p = new Vector3().lerpVectors(srcVec, dstVec, i / length)
        .multiplyScalar(1 + 0.1 * Math.sin(i / length * Math.PI));
      points.push(p);
    }
    return new CatmullRomCurve3(points);
  }
  constructor(src: vec3, dst: vec3) {
    super(
      new TubeBufferGeometry(AirLine.createCurve(src, dst), 20, 0.1),
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
        },
      }));
  }
  public tick = (delta: number) => {
    (this.material as ShaderMaterial).uniforms.uTime.value += delta;
  }
}