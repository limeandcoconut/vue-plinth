<template>
  <div v-if="showErrorMessage" class="error-box">
    <div class="error-title">ERROR</div>
    <div class="error-message">
      {{ errorMessage }}
    </div>

    <button class="dismiss-button" @click.prevent="dismissError" type="button">DISMISS</button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'errorBox',
  computed: {
    ...mapState(['showErrorMessage', 'errorMessage']),
  },
  methods: {
    ...mapActions(['dismissError']),
  },
}
</script>

<style lang="less">
@import '../styles/mixins.less';

.error-box {
  text-align: center;
  position: fixed;
  top: .basis(1)[];
  right: .basis(2)[];
  width: .basis(30)[];
  height: auto;
  padding-top: 1em;
  background-color: white;
  box-shadow: @teal 25px 25px 1px 8px;
  z-index: 200;
  overflow: hidden;
  line-height: 1.2;
  font-weight: 500;
}

.error-title {
  font-size: .basis(2)[];
  padding-bottom: 0.5em;
  .oxanium();
}

.error-message {
  font-size: .basis(2)[];
  padding-bottom: 1em;
}

.dismiss-button {
  display: block;
  background-color: @teal;
  color: white;
  width: 100%;
  padding: 1em 0;
  margin: 0;
  font-weight: inherit;
  cursor: pointer;
}
</style>
