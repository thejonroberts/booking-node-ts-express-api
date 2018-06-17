import app from './app';

const server = app.listen(app.get('port'), () => {
  /* tslint:disable-next-line */
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
});

export default server;

// NOTE: check if we are not running this from test/setup.js / dev-test script!
// if (!module.parent) {
//   app.listen(port, () => {
//     if (process.env.NODE_ENV === 'development') {
//       /* tslint:disable-next-line */
//       console.log(`${process.env.NODE_ENV} mode on http://${host}:${port}`);
//     }
//   });
// }
