import xml2js from 'xml2js';

export const toRoutes = (response): Promise<Route[]> => {
  return new Promise((resolve, reject) => {
    const parser = new xml2js.Parser();
    parser.parseString(response.text(), (err, data) => {
      if (err) { reject(err); return; }
      let routes = [];
      if (data.body.route) {
        routes = data.body.route.map(x => {
          return {
            tag: x.$.tag,
            title: x.$.title
          };
        });
      }
      resolve(routes);
    });
  });
};

export const toRouteConfig = (response): Promise<RouteConfig[]> => {
  return new Promise((resolve, reject) => {
    const parser = new xml2js.Parser();
    parser.parseString(response.text(), (err, data) => {
      if (err) { reject(err); return; }
      const routeConfigs = data.body.route.map(x => {
        const routeConfig: RouteConfig = {
          tag: x.$.tag,
          title: x.$.title,
          color: x.$.color,
          oppositeColor: x.$.oppositeColor,
          latMin: parseFloat(x.$.latMin),
          latMax: parseFloat(x.$.latMax),
          lonMin: parseFloat(x.$.lonMin),
          lonMax: parseFloat(x.$.lonMax),
          stops: x.stop.map(s => {
            const stop: Stop = {
              tag: s.$.tag,
              title: s.$.title,
              lat: parseFloat(s.$.lat),
              lon: parseFloat(s.$.lon),
              stopId: s.$.stopId
            };
            return stop;
          }),
          directions: x.direction.map(d => {
            const direction: Direction = {
              tag: d.$.tag,
              title: d.$.title,
              name: d.$.name,
              useForUI: d.$.useForUI === 'true',
              stops: d.stop.map(s => {
                return s.$.tag;
              })
            };
            return direction;
          }),
          paths: x.path.map(p => {
            const path: Path = {
              points: p.point.map(point => {
                const pointObj: Point = {
                  lat: parseFloat(point.$.lat),
                  lon: parseFloat(point.$.lon)
                };
                return pointObj;
              })
            };
            return path;
          })
        };
        return routeConfig;
      });
      resolve(routeConfigs);
    });
  });
};

export const toVehicles = (response): Promise<Vehicle[]> => {
  return new Promise((resolve, reject) => {
    let parser = new xml2js.Parser();
    parser.parseString(response.text(), (err, data) => {
      if(err) { reject(err); return; }
      let vehicles = [];
      if (data.body.vehicle) {
        vehicles = data.body.vehicle
          .map(x => {
            const vehicle: Vehicle = {
              id: parseInt(x.$.id),
              lat: parseFloat(x.$.lat),
              lon: parseFloat(x.$.lon),
              heading: parseInt(x.$.heading),
              predictable: x.$.predictable === 'true'
            };
            return vehicle;
          })
          .filter(x => x.predictable);
      }
      resolve(vehicles);
    });
  });
};
