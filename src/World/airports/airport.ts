import { Mesh, MeshBasicMaterial, SphereBufferGeometry, Vector3 } from "three";

export class Airport extends Mesh {
  constructor(pos: Vector3) {
    super(new SphereBufferGeometry(1, 32, 32), new MeshBasicMaterial({ color: 'red' }));
    this.position.copy(pos);
  }
}