// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./data.worker';
import { Group } from "three";
import { Airport } from './airport';
import { MyLink, MyNode } from './type';
import { AirLine } from './airline';

type Data = [MyNode[], MyLink[]];

export class AirPorts extends Group {
  private i = 0;
  constructor(private radius: number) {
    super();
    this.getData()
      .then((res): Promise<MyLink[]> => new Promise((resolve) => requestIdleCallback(deadline => this.createAirport(deadline, res, resolve))))
      .then(res => requestIdleCallback(deadline => this.createAirLines(deadline, res)))
      .catch(error => console.log(error));
  }
  private getData = (): Promise<Data> => {
    return new Promise((resolve) => {
      const worker = new Worker();
      worker.postMessage({ radius: this.radius });
      worker.addEventListener('message', ({ data }: { data: Data }) => {
        resolve(data);
        worker.terminate();
      })
    })
  }
  private createAirLines = (deadline:IdleDeadline,links: MyLink[]) => {
    while (deadline.timeRemaining() > 0 && this.i < links.length) {
      const {srcAirport,dstAirport} = links[this.i];
      this.add(new AirLine(srcAirport.pos,dstAirport.pos));
      this.i++;
    }
    if (this.i < links.length) {
      requestIdleCallback((deadline) => this.createAirLines(deadline, links));
    } 
  }
  private createAirport = (deadline: IdleDeadline, data: Data, resolve: (value: MyLink[]) => void) => {
    const [nodes] = data;
    while (deadline.timeRemaining() > 0 && this.i < nodes.length) {
      this.add(new Airport(nodes[this.i].pos));
      this.i++;
    }
    if (this.i < nodes.length) {
      requestIdleCallback((deadline) => this.createAirport(deadline, data, resolve));
    } else {
      this.i = 0;
      resolve(data[1]);
    }
  }
}