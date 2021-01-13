const VUE_META_ATTRIBUTE = 'data-vue-meta-info';
const headDom = document.getElementsByTagName('head')[0];
const removeVueMetaInfo = (): void => {
  const children = headDom.querySelectorAll(`[${VUE_META_ATTRIBUTE}]`);
  for (let i = children.length - 1; i > -1; i--) {
    if (children[i].getAttribute(VUE_META_ATTRIBUTE) === 'true') {
      headDom.removeChild(children[i]);
    }
  }
};
const renderMetaInfo = (metaOpts: {[key: string]: string}): void => {
  removeVueMetaInfo();
  for (const key of Object.keys(metaOpts)) {
    if ('title' === key) {
      document.title = metaOpts[key];
    } else {
      const metaNode = document.createElement('meta');
      metaNode.setAttribute(VUE_META_ATTRIBUTE, 'true');
      metaNode.setAttribute('name', key);
      metaNode.setAttribute('content', metaOpts[key]);
      headDom.appendChild(metaNode);
    }
  }
};

export default renderMetaInfo;
