import { Vue } from 'vue-property-decorator';
import Preview from './Preview.vue';

const instanceList: Vue[] = [];

export default (url: string) => {
  if (instanceList.length) {
    for (const ins of instanceList) {
      for (const child of ins.$children) {
        const contentRef = child.$refs.content as HTMLElement;
        if (contentRef) {
          contentRef.remove();
        }
      }
    }
    instanceList.length = 0;
  }
  const PreviewComponenet = Vue.extend(Preview);
  const instance = new PreviewComponenet({
    propsData: {url},
  });
  // @ts-ignore
  instance.id = 'preview_modal';
  // @ts-ignore
  instance.$mount();
  instanceList.push(instance);
};
