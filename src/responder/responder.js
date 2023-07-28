const JSONResponse = (res, data, status = 200) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(status);
    res.end(JSON.stringify(data));
  };
  
  module.exports = JSONResponse;
  