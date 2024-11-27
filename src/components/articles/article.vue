<template>
  <div class="container p_top">
    <div class="text-center m-3" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </div>
    <div class="article_page" v-else>
      <div class="game_tag">
        <h1>{{ article.game }}</h1>
      </div>
      <div
        class="article_featured"
        :style='{backgroundImage:`url(${article.img})`}'
      >
      </div>
      <div class="article_content">
        <div class="owner">
          Reviewed by <b>{{ article.owner.firstname }} {{ article.owner.lastname }}</b>
        </div>
        <hr/>
        <h3>{{ article.title }}</h3>
        <div class="editor" v-html="article.editor">
        </div>
        <hr/>
        <div class="article_rating">
          We give it a <b>{{ article.rating }}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useArticleStore } from '@/stores/articles.js'
const articleStore = useArticleStore()

import { useRoute, } from 'vue-router'
const route = useRoute()

const loading = ref(true)
const article = ref("")

articleStore.getArticleById(route.params.id).then((data) => {
  article.value = data
}).finally(() => {
  loading.value = false
})

</script>
