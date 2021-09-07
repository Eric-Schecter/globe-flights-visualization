export type vec3 = [number, number, number];

export type Link = {
  srcAirportId: string,
  dstAirportId: string,
  stops: string,
}

export type MyNode = {
  lat: string,
  lng: string,
  pos: vec3,
  country: string,
}

export type MyLink = Link & {
  srcAirport: MyNode,
  dstAirport: MyNode,
}