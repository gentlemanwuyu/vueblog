import { Vue } from 'vue-property-decorator';
import Confirm from './Confirm.vue';
import vuetify from '@/plugins/vuetify';

let id = 1;
export default (config: TypeComponentConfirm.Config) => {
  const confirmComponenet = Vue.extend(Confirm);
  const instance = new confirmComponenet({
    vuetify,
    propsData: config,
    methods: {
      onConfirm() {
        if (typeof config.onConfirm === 'function') {
          config.onConfirm();
        }
      },
    },
  });
  // @ts-ignore
  instance.id = 'confirm_modal_' + (id++);
  // @ts-ignore
  instance.config = config;
  instance.$mount();
  document.body.appendChild(instance.$el);
};
