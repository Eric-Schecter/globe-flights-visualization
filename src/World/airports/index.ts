// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./data.worker';
import { Group, MathUtils, Spherical, Vector3 } from "three";
import { Airport } from './airport';

type Data = {
  lat: string,
  lng: string,
}

export class AirPorts extends Group {
  private spherical = new Spherical();
  private pos = new Vector3();
  private i = 0;
  constructor(private radius: number) {
    super();
    this.getData()
      .then(res => requestIdleCallback(deadline => this.createAirport(deadline, res)));
  }
  private getData = (): Promise<Data[]> => {
    return new Promise((resolve) => {
      const worker = new Worker();
      worker.postMessage('message');
      worker.addEventListener('message', ({ data }: { data: Data[] }) => {
        resolve(data);
        worker.terminate();
      })
    })
  }
  private create = (data: Data) => {
    const { lat, lng } = data;
    this.spherical.set(
      this.radius,
      MathUtils.degToRad(90 - parseFloat(lat)),
      MathUtils.degToRad(90 + parseFloat(lng))
    );
    this.pos.setFromSpherical(this.spherical);
    this.add(new Airport(this.pos));
  }
  private createAirport = (deadline: IdleDeadline, data: Data[]) => {
    while (deadline.timeRemaining() > 0 && this.i < data.length) {
      this.create(data[this.i]);
      this.i++;
    }
    if (this.i < data.length) {
      requestIdleCallback((deadline) => this.createAirport(deadline, data));
    }
  }
}