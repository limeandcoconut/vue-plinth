<template>
  <div class="layout">
    404
  </div>
</template>

<script>
export default {
  name: 'fourohfour',
  meta() {
    return {
      title: 'Error 404 - Page not found',
    }
  },
}
</script>
<style lang="less" scoped>
@import '../styles/mixins.less';

.layout {
  background-color: @teal;
  .oxanium();
  font-size: .basis(10)[];
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.2;

  .above(440px; {
    font-size: .basis(20)[];
  });

  .above(sm; {
    font-size: .basis(30)[];
  });

  .above(md; {
    font-size: .basis(40)[];
  });
}
</style>
