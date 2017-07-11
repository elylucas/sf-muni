import xml2js from 'xml2js';

export const toRoutes = (response) => {
  return new Promise<Array<Route>>((resolve, reject) => {
    const parser = new xml2js.Parser();
    parser.parseString(response.text(), (err, data) => {
      if (err) { reject(err); return; }
      const routes = data.body.route.map(x => {
        return {
          tag: x.$.tag,
          title: x.$.title
        };
      });
      resolve(routes);
    });
  });
};
