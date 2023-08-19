import { useReward } from "./composables/confetti.ts";

export default {
  install: (app, options) => {
    // app.directive("reward", (el, binding) => {
    //   // get id from el      
    //   let options = binding.value;
    //   if(!options) {
    //     options = {}
    //   }

    //   let type = binding.arg;
    //   if(!type) {
    //     type = "confetti"
    //   }

    //   const { reward } = useReward(el, type, options);
    //   reward();
    // });
    app.config.globalProperties.$reward = useReward;
  },
};


export { useReward };
