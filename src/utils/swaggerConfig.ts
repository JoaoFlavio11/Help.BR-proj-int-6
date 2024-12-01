/* eslint-disable @typescript-eslint/no-explicit-any */
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

export const setupSwagger = (app: any) => {
  const swaggerDocument = YAML.load(path.join(__dirname, '../', 'swagger.yaml'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
