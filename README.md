![vue-rewards logo](assets/logo.png?raw=true "vue-rewards")
[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&ts=1683906897&type=6e&v=1.0.0&x2=0)](https://badge.fury.io/js/vue-rewards)
<!-- [![npm version](https://badge.fury.io/js/react-rewards.svg)](https://badge.fury.io/js/react-rewards) [![forthebadge](https://forthebadge.com/images/badges/makes-people-smile.svg)](https://forthebadge.com) -->

<!-- :evergreen_tree: **Tree-shakeable**
:female_detective: **Built with TypeScript**
:package: **3.6kB gzipped** -->

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/hamadafm)

**Vue 3 only. Not compatible with Vue 2**

This package is a port of [react-rewards](https://github.com/thedevelobear/react-rewards).

## Demo

Here is a [simple demo](https://vuerewards.netlify.app) and here's the [code for the demo](https://github.com/HamadaFMahdi/vue-rewards-demo).

## About

**vue-rewards** lets you add micro-interactions to your app, and rewards users with the rain of confetti, emoji or balloons in seconds.
Firing confetti all over the page may seem like a questionable idea, but keep in mind that rewarding users for their actions is not.
If a huge cloud of smiling emoji doesn't fit your application well, try changing the physics config to make it more subtle.

You can read more on the subject of micro-interactions in this blog post – https://www.thedevelobear.com/post/microinteractions/

## Installation

```
pnpm install vue-rewards
```

or

```
yarn add vue-rewards
```

or

```
npm install vue-rewards
```

If you plan to use this with the **Options API** then you will need to add the following code to your `main.js` (or you may find the plugin registration in `plugins/index.js`):

```js
import { createApp } from "vue";
import App from "./App.vue";
import VueRewards from "vue-rewards";
// your other plugins will be imported here

const app = createApp(App);

// This is the main part
app.use(VueRewards);

app.mount("#app");
```

## Usage

In order to use the rewards, you'll need to provide an element that will become the origin of the animation. This element needs to have an ID that matches the one used - it can be anywhere in the DOM as long as the IDs match.

You can place the element inside a button, center it and shoot up from the button.
You can place it on top of the viewport with position: "fixed" and change the angle to 270, to shoot downwards.
Try, experiment, **have fun!**

Animation particles are set to position: 'fixed' by default, but this can be changed through a config object.

You can use this package in both the composition API and the options API.

### Using the Composition API

```vue
<script setup>
  import { useReward } from 'vue-rewards'
  import { onMounted } from 'vue'

  const config = {
    startVelocity:10,
    spread:180,
    elementCount:100
    // etc...
    // you can make this reactive instead etc.
  }

  // has to be in onMounted, otherwise the element won't be found.
  // This will trigger the animation immediately.
  onMounted(() => {
    // useReward has the following arguments:
    // userReward(id, type, config)
    // type can be one of 'confetti', 'balloons' or 'emoji'
    // no need to add # before the id
    // see below for all of the config options
    const { reward, isAnimating } = useReward('some-id', 'confetti', config);

    // to trigger the animation, call the reward function
    reward();

    // isAnimating is a boolean that is true when the animation is running
  })

  // or you can trigger the animation onclick
  // I have renamed reward to balloonsReward etc.

  const { reward: balloonsReward, isAnimating: isBalloonsAnimating } = useReward('some-id', 'balloons');
</script>

<template>
  <span id="some-id"> Let's celebrate! </span>
  <button @click="balloonsReward">
    Click me!
  </button>
</template>
```

### Using the Options API

Since we registered the plugin earlier we now have access to the `$reward` method in our components. `$reward` is the same as `useReward`. To get the same as above we do:

```vue
<template>
  <span id="some-id"> Let's celebrate! <span/>
  <button @click="balloonsReward">
    Click me!
  </button>
</template>

<script>
  export default {
    mounted() {
      const config = {
        startVelocity: 10,
        spread: 180,
        elementCount: 100
      }
      const { reward, isAnimating } = this.$reward('some-id', 'confetti', config);
      reward();
    },
    methods: {
      balloonsReward(id) {
        const { reward, isAnimating } = this.$reward(id, 'balloons');
        reward();
        return isAnimating
      }

    }
  }
</script>
```

### Props & config

useReward/$reward params:

| name            | type   | description                                            | required   |default      |
|-----------------|--------|--------------------------------------------------------|------------|-------------|
| id              | string | A unique id of the element you want to shoot from      | yes        |             |
| type            | string | 'confetti' | 'balloons' | 'emoji'                      | yes        |'confetti'   |
| config          | object | a configuration object described below                 | no         |see below    |

Confetti config object: 

| name                | type       | description                                        | default                                                 |
| ------------------- | ---------- | -------------------------------------------------- | ------------------------------------------------------- |
| lifetime            | number     | time of life                                       | 200                                                     |
| angle               | number     | initial direction of particles in degrees          | 90                                                      |
| decay               | number     | how much the velocity decreases with each frame    | 0.94                                                    |
| spread              | number     | spread of particles in degrees                     | 45                                                      |
| startVelocity       | number     | initial velocity of particles                      | 35                                                      |
| elementCount        | number     | particles quantity                                 | 50                                                      |
| elementSize         | number     | particle size in px                                | 8                                                       |
| zIndex              | number     | z-index of particles                               | 0                                                       |
| position            | string     | one of CSSProperties['position'] - e.g. "absolute" | "fixed"                                                 |
| colors              | string[]   | An array of colors used when generating confetti   | ['#A45BF1', '#25C6F6', '#72F753', '#F76C88', '#F5F770'] |
| onAnimationComplete | () => void | A function that runs when animation completes      | undefined                                               |

Balloons config object:

| name                | type       | description                                        | default                                                 |
| ------------------- | ---------- | -------------------------------------------------- | ------------------------------------------------------- |
| lifetime            | number     | time of life                                       | 600                                                     |
| angle               | number     | initial direction of balloons in degrees           | 90                                                      |
| decay               | number     | how much the velocity decreases with each frame    | 0.999                                                   |
| spread              | number     | spread of balloons in degrees                      | 50                                                      |
| startVelocity       | number     | initial velocity of the balloons                   | 3                                                       |
| elementCount        | number     | balloons quantity                                  | 10                                                      |
| elementSize         | number     | balloons size in px                                | 20                                                      |
| zIndex              | number     | z-index of balloons                                | 0                                                       |
| position            | string     | one of CSSProperties['position'] - e.g. "absolute" | "fixed"                                                 |
| colors              | string[]   | An array of colors used when generating balloons   | ['#A45BF1', '#25C6F6', '#72F753', '#F76C88', '#F5F770'] |
| onAnimationComplete | () => void | A function that runs when animation completes      | undefined                                               |

Emoji config object:

| name                | type       | description                                        | default            |
| ------------------- | ---------- | -------------------------------------------------- | ------------------ |
| lifetime            | number     | time of life                                       | 200                |
| angle               | number     | initial direction of emoji in degrees              | 90                 |
| decay               | number     | how much the velocity decreases with each frame    | 0.94               |
| spread              | number     | spread of emoji in degrees                         | 45                 |
| startVelocity       | number     | initial velocity of emoji                          | 35                 |
| elementCount        | number     | emoji quantity                                     | 20                 |
| elementSize         | number     | emoji size in px                                   | 25                 |
| zIndex              | number     | z-index of emoji                                   | 0                  |
| position            | string     | one of CSSProperties['position'] - e.g. "absolute" | "fixed"            |
| emoji               | string[]   | An array of emoji to shoot                         | ['🤓', '😊', '🥳'] |
| onAnimationComplete | () => void | A function that runs when animation completes      | undefined          |
