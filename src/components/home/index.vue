<template>
  <div class="container">
    <appCarousel :items="articleStore.articles" />
    <Featured />
  </div>
</template>

<script setup>
  import { useArticleStore } from '@/stores/articles.js'
  import { onMounted } from 'vue'
  import appCarousel from '@/utils/carousel.vue'
  import Featured from './featured.vue'

  const articleStore = useArticleStore()

  onMounted(() => {
    articleStore.getArticles(7)
  })

</script>
