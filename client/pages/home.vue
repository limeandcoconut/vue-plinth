<template>
  <div class="layout">
    <div/>
    <div class="banner">Homepage</div>
    <div/>
  </div>
</template>

<script>
import {
  title,
  author,
  description,
  host,
  color,
  og,
  twitter,
  ms,
  manifest,
  favicons,

} from '../../config/meta.config'

export default {
  name: 'home',

  metaInfo: {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'author', content: author },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: og.image.src },
      { property: 'og:image:width', content: og.image.width },
      { property: 'og:image:height', content: og.image.height },
      { property: 'og:type', content: og.type },
      { property: 'og:url', content: host },
      { property: 'twitter:image', content: twitter.image.src },
      { property: 'twitter:image:alt', content: twitter.image.alt },
      { property: 'twitter:card', content: twitter.card },
      { name: 'twitter:creator', content: twitter.creator },
      { name: 'theme-color', content: color },
      { name: 'msapplication-TileImage', content: favicons.ms },
      { name: 'msapplication-TileColor', content: ms.color },
    ],
    link: [
      { rel: 'canonical', href: 'https://jacobsmith.tech' },
      { rel: 'shortcut icon', href: favicons.default },
      { rel: 'icon', href: favicons.x32, sizes: '32x32', type: 'image/png' },
      { rel: 'icon', href: favicons.x16, sizes: '16x16', type: 'image/png' },
      { rel: 'apple-touch-icon', href: favicons.apple, sizes: '180x180' },
      { rel: 'mask-icon', href: favicons.safariMask, color: color },
      { rel: 'icon', href: favicons.ms },
      { rel: 'manifest', href: manifest },
      // noindex, nofollow can go here too
    ],
  },
}
</script>
<style lang="less" scoped>
@import '../styles/mixins.less';

.layout {
  background-color: white;
  display: grid;
  grid-template: auto / 1fr 10fr 1fr;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  height: 100vh;
  perspective: 60em;
  font-size: .fz(venti)[];
  .oxanium(500);

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .basis(5)[];
    border: 2px solid @teal;
  }

  .above(md; {
    grid-template: auto / 1fr .basis(80)[] 1fr;
  });

  .above(lg; {
    grid-template: auto / 1fr .basis(70)[] 1fr;
  });
}

</style>
