import { Vue } from 'vue-property-decorator';
import Comment from './Comment.vue';

const commentInstanceList: {[key: number]: Vue} = {};

const comment: TypeComponentComment.Comment = {
  show: (id: number, submitCallback: TypeComponentComment.SubmitCallback) => {
    const CommentComponenet = Vue.extend(Comment);
    const instance = new CommentComponenet({
      propsData: {},
    });
    // @ts-ignore
    instance.id = `comment-${id}`;
    // @ts-ignore
    instance.$mount();
    const parentComment = document.getElementById(`comment-reply-${id}`);
    parentComment?.after(instance.$el);
    commentInstanceList[id] = instance;
    instance.$on('submit', submitCallback);
  },
  destroy: (id: number) => {
    const instance = commentInstanceList[id];
    instance.$el.remove();
    // TODO: 这样是否能销毁对象？
    instance.$destroy();
  },
};

export default comment;
