<template>
  <div class="loader">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.15em;

  > span {
    background-color: currentColor;
    height: 0.5em;
    width: 0.1em;
    border-radius: 100px;
    animation: move 1s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.33s;
    }

    &:nth-child(3) {
      animation-delay: 0.66s;
    }
  }
}

@keyframes move {
  0% {
    transform: translateY(-25%);
  }
  50% {
    transform: translateY(25%);
  }
  100% {
    transform: translateY(-25%);
  }
}
</style>
