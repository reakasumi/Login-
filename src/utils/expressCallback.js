export default function makeExpressCallback(controller) {
  return async (req, res, next) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userId: req.userId,
      method: req.method,
      path: req.path,
      files: req.files,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    };
    try {
      const httpResponse = await controller(httpRequest);//i dorzohet parametri controllerit psh te answers
      if (httpResponse.headers) {
        res.set(httpResponse.headers);
      }

      let { body } = httpResponse;
      if (body === 'null') {
        body = {
          statusCode: 404,
          errorMessage: 'Item not found',
        };
      }

      res.type('json');
      return res.status(httpResponse.statusCode).send(body);
    } catch (ex) {
      return next(ex);
    }
  };
}
