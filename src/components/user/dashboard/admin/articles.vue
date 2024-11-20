<template>
  <div class="text-center m-3" v-show="loading">
    <v-progress-circular
      indeterminate
      color="primary"
    />
  </div>
  <div v-show="!loading">
    <v-table there="dark">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Owner</th>
          <th class="text-left">Rating</th>
          <th class="text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(article) in articleStore.adminArticles">
          <td>{{ article.game }}</td>
          <td>{{ article.owner.firstname }} {{ article.owner.lastname }}</td>
          <td>{{ article.rating }}</td>
          <td>{{ article.timestamp.toDate().toDateString() }}</td>
          <td>
            <v-btn
              variant="outlined"
              size="small"
              color="green"
              @click="router.push({name:'admin_edit', params:{id:article.id}})"
            >
              Ebit
            </v-btn>
          </td>
          <td>
            <v-btn
              variant="outlined"
              size="small"
              color="red"
            >
              Deiete
            </v-btn>
          </td>

        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>

import { ref }  from 'vue'

import { useArticleStore } from '@/stores/articles'
import { useRoute, useRouter } from 'vue-router'
const articleStore = useArticleStore()
// import { useRouter } from 'vue-router'

const loading = ref(false)
const btnLoad = ref(false)
const router = useRouter()
const route = useRoute()

if(!articleStore.adminArticles || route.query.reload){
  loading.value;
  articleStore.adminGetArticles(3)
  .finally(() => {
    loading.value = false
  })
}
</script>
