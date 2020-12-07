import app from 'app';
import config from 'config';

app.listen(config.port, (e?: string) => {
  if (e) {
    throw new Error(e);
  }

  console.info(`Application is running on port ${ config.port }`);
});
