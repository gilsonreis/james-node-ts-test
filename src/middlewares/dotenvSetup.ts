import * as dotenv from 'dotenv';
import path from 'path';


export default function configureEnvironment() {
  dotenv.config();
  let _path;
  switch (process.env.NODE_ENV) {
    case 'production':
      _path = path.resolve(__dirname, '..', '..', '.env');
      break;
    case 'docker':
      _path = path.resolve(__dirname, '..', '..', '.env');
      break;
    default:
      _path = path.resolve(__dirname, '..', '..', '.env.dev');
  }

  return dotenv.config({ path: _path });
}
