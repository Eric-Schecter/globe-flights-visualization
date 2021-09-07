import { BufferGeometry, Float32BufferAttribute, Points, ShaderMaterial, Vector3 } from "three";
import * as vertexShader from './vertexShader.vert';
import * as fragmentShader from './fragmentShader.frag';
import { vec3 } from "../type";

export class Airport extends Points {
  constructor(pos: vec3) {
    super(
      new BufferGeometry(),
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uColor: { value: new Vector3(1, 165 / 255, 0) },
        },
        transparent: true,
      }));
    const scale = 250;
    this.geometry.setAttribute('position', new Float32BufferAttribute(pos, 3));
    this.geometry.setAttribute('scale', new Float32BufferAttribute([scale], 1));
  }
}