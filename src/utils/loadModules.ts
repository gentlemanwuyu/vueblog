export default (modulesFiles: any, flag: boolean = false): any => {
  return modulesFiles.keys().reduce((moduleList: any, modulePath: string) => {
    const moduleName: string = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const obj: any = modulesFiles(modulePath);
    if (flag === true) {
      const moduleNames = moduleName.split('/');
      let data = moduleList;
      moduleNames.forEach((key, index) => {
        if (moduleNames.length - 1 === index) {
          data[key] = obj.default;
        } else if (data[key]) {
          data = data[key];
        } else {
          data[key] = {};
          data = data[key];
        }
      });
    } else {
      moduleList[moduleName] = obj.default;
    }
    return moduleList;
  }, {});
};
