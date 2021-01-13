import loadModules from '@/utils/loadModules';

const modulesFiles = require.context('./modules', false, /\.ts$/);
const modules = loadModules(modulesFiles);
const api: TypeApi = {
  ...modules,
};

export default api;
