<template>
  looks deserted
</template>

<script setup>

import { ref }  from 'vue'

import { useArticleStore } from '@/stores/articles'
const articleStore = useArticleStore()
// import { useRouter } from 'vue-router'

const loading = ref(false)
const btnLoad = ref(false)

loading.value;
articleStore.adminGetArticles(3)
.finally(() => {
  loading.value = false
})

</script>
