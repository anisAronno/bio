<template>
  <div class="grid place-content-center h-screen dark:bg-gray-900 dark:text-gray-100 text-4xl">
    <h1>You are unautherized!</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const emit = defineEmits(['loaded'])

onMounted(() => {
  emit('loaded')
})
</script>

<style scoped>
.unauthorized {
  background-color: #5b3482;
  height: 100vh !important;
}
svg {
  transform: scale(0.3, 0.3);
  margin-top: -45%;
}
.st0 {
  display: none;
}
.st1 {
  display: inline;
  fill: #e2e4fa;
}
.st2 {
  display: none;
  opacity: 0.5;
}
.st3 {
  display: inline;
  fill-rule: evenodd;
  clip-rule: evenodd;
  fill: #a8aaba;
}
.st4 {
  display: inline;
}
.st5 {
  fill: #a8aaba;
}
.st6 {
  opacity: 0.1;
}
.st7 {
  fill: #2d1c2d;
}
.st8 {
  fill-rule: evenodd;
  clip-rule: evenodd;
  fill: #2d1c2d;
}
.st9 {
  fill: #ffffff;
}
.st10 {
  fill: #bf3e73;
}
.st11 {
  fill: #8f3157;
}

@keyframes TongueAnim {
  0% {
    transform: skewY(0deg);
  }
  50% {
    transform: skewY(10deg);
  }
  100% {
    transform: skewY(-10deg);
  }
}

.tongue {
  animation: TongueAnim 0.2s ease infinite;
  transform-origin: top right;
  transform-box: fill-box;
}

.st12 {
  fill-rule: evenodd;
  clip-rule: evenodd;
  fill: #7ebe9b;
}
.st13 {
  opacity: 0.3;
  fill-rule: evenodd;
  clip-rule: evenodd;
  fill: #5f8d75;
}
.st14 {
  opacity: 0.6;
}
.st15 {
  fill: #5f8d75;
}
.st16 {
  opacity: 0.6;
  fill: none;
  stroke: #7ebe9b;
  stroke-miterlimit: 10;
}
.st17 {
  fill: #e7b84d;
}
.st18 {
  fill: none;
  stroke: #ffffff;
  stroke-width: 1.098;
  stroke-miterlimit: 10;
}
.st19 {
  fill: none;
}
.st20 {
  font-family: 'Asap-Medium';
}
.st21 {
  font-size: 28.6973px;
}
.st22 {
  display: inline;
  fill: none;
}
.st23 {
  fill: #7091a4;
}
.st24 {
  font-family: 'BloggerSans';
}
.st25 {
  font-size: 9.72px;
}
.st26 {
  font-family: 'Asap-Regular';
}
.st27 {
  font-size: 16.524px;
}
.st28 {
  display: inline;
  fill: #7ebe9b;
}
.st29 {
  font-family: 'Asap-Bold';
}
.st30 {
  font-size: 10.692px;
}
.st31 {
  fill: #9799a2;
}
</style>
