import { MathUtils, Spherical, Vector3 } from "three";
import { Link, MyLink, MyNode } from "./type";

// eslint-disable-next-line no-restricted-globals
const ctx = self as any;

const spherical = new Spherical();
const getPos = (data: MyNode, radius: number) => {
  const { lat, lng } = data;
  spherical.set(
    radius,
    MathUtils.degToRad(90 - parseFloat(lat)),
    MathUtils.degToRad(90 + parseFloat(lng))
  );
  data.pos = new Vector3().setFromSpherical(spherical).toArray();
  return data;
}

const fetchData = (path: string) => fetch(path)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('get data failed');
  })
  .catch(error => console.log(error));

ctx.addEventListener('message', async (e: { data: { radius: number } }) => {
  const { radius } = e.data;
  const data = await Promise.all([
    fetchData('/data/airports.json'),
    fetchData('/data/routes.json')
  ]).then(([nodes, links]: [MyNode[], Link[]]) => {
    const nodesWithPos = nodes.map(node => getPos(node, radius));
    const filteredLinks = links.filter(link => link.stops === '0');
    const linksWithNodes = filteredLinks
      .map(link => {
        (link as MyLink).srcAirport = nodesWithPos[parseInt(link.srcAirportId) - 1];
        (link as MyLink).dstAirport = nodesWithPos[parseInt(link.dstAirportId) - 1];
        return link;
      })
      .filter(link => {
        const srcResult = (link as MyLink).srcAirport;
        const dstResult = (link as MyLink).dstAirport;
        return srcResult && dstResult;
      });
    return [nodesWithPos, linksWithNodes];
  })
  ctx.postMessage(data);
})

export { };