import { Mesh, MeshStandardMaterial, SphereBufferGeometry, TextureLoader } from "three";

export class Earth extends Mesh {
  constructor(radius:number) {
    super(
      new SphereBufferGeometry(radius, 32, 32),
      new MeshStandardMaterial({
        map: new TextureLoader().load('textures/earth-night.jpg')
      })
    )
  }
}