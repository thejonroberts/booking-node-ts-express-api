import app from './app';

const server = app.listen(app.get('port'), () => {
  /* tslint:disable-next-line */
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
});

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
  /* tslint:disable-next-line */
    console.log('Address in use, closing...');
    setTimeout(() => {
      // HACK: keeps watch-test script running instead of crashing.
      server.close();
    }, 1000);
  } else {
    /* tslint:disable-next-line */
    console.log(err.code, err);
  }
});

export default server;
