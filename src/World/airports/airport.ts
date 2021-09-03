import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial, Vector3 } from "three";

export class Airport extends Points {
  constructor(pos: Vector3) {
    super(new BufferGeometry(), new PointsMaterial({ color: 'orange', size: 5 }));
    this.geometry.setAttribute('position', new Float32BufferAttribute(pos.toArray(), 3));
  }
}