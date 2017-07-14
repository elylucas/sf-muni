

interface RouteConfig {
  tag: string;
  title: string;
  color: string;
  oppositeColor: string;
  latMin: number;
  latMax: number;
  lonMin: number;
  lonMax: number;
  stops: Stop[];
  directions: Direction[];
  paths: Path[];
}

interface Stop {
  stopId: string;
  tag: string;
  title: string;
  lat: number;
  lon: number;
}

interface Direction {
  tag: string;
  title: string;
  name: string;
  useForUI: boolean;
  stops: string[];
}

interface Path {
  points: Point[];
}

interface Point {
  lat: number;
  lon: number;
}
