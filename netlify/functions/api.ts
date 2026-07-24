import serverless from 'serverless-http';
import { handler as app } from '../../server/index';

export const handler = serverless(app);
