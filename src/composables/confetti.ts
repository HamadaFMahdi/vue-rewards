import { ref } from "vue";
import { confetti } from "../components/Confetti/Confetti";
import { emoji } from "../components/Emoji/Emoji";
import { balloons } from "../components/Balloons/Balloons";
import { getContainerById } from "../functions/helpers";

export function useReward(id, type, config) {
  const isAnimating = ref(false);

  const internalAnimatingCallback = () => {
    isAnimating.value = false;
  };

  const reward = () => {
    const foundContainer = getContainerById(id);
    if (!foundContainer) return;
    isAnimating.value = true;
    switch (type) {
      case 'confetti':
        confetti(foundContainer, internalAnimatingCallback, config);
        break;
      case 'emoji':
        emoji(foundContainer, internalAnimatingCallback, config);
        break;
      case 'balloons':
        balloons(foundContainer, internalAnimatingCallback, config);
        break;
      default:
        console.error(`${type} is not a valid react-rewards type.`);
    }
  };

  return { isAnimating, reward };
}
