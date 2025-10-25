import { ref, Ref, MaybeRefOrGetter, toValue } from "vue";
import { confetti } from "../components/Confetti/Confetti";
import { emoji } from "../components/Emoji/Emoji";
import { balloons } from "../components/Balloons/Balloons";
import { getContainerById } from "../functions/helpers";
import { ConfettiConfig } from "../components/Confetti/Confetti.types";
import { EmojiConfig } from "../components/Emoji/Emoji.types";
import { BalloonsConfig } from "../components/Balloons/Balloons.types";

type RewardType = 'confetti' | 'emoji' | 'balloons';
type RewardConfig = ConfettiConfig | EmojiConfig | BalloonsConfig;

export function useReward(
  id: MaybeRefOrGetter<string | HTMLElement>,
  type?: RewardType,
  config?: RewardConfig
) {
  const isAnimating = ref(false);

  const internalAnimatingCallback = () => {
    isAnimating.value = false;
  };

  const reward = () => {
    const idValue = toValue(id);
    const foundContainer = getContainerById(idValue);
    if (!foundContainer) return;
    isAnimating.value = true;
    switch (type) {
      case 'confetti':
        confetti(foundContainer, internalAnimatingCallback, config as ConfettiConfig);
        break;
      case 'emoji':
        emoji(foundContainer, internalAnimatingCallback, config as EmojiConfig);
        break;
      case 'balloons':
        balloons(foundContainer, internalAnimatingCallback, config as BalloonsConfig);
        break;
      default:
        console.error(`${type} is not a valid react-rewards type.`);
    }
  };

  return { isAnimating, reward };
}
