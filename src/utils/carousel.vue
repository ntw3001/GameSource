<template>
  <div v-if="articleStore.getFeaturedSlides">
    <carousel
      :items-to-show="1"
      :wrap-around="true"
      :height="600"d
      class="p_top"
    >
      <slide v-for="slide in articleStore.getFeaturedSlides" :key="slide.id">
        <div class="slider_bck" :style="{background:`url(${slide.img})`}">
          <div class="slide_content">
            <div class="item">
              <div>{{ slide.title }}</div>
              <div>{{ slide.excerpt }}</div>
            </div>
          </div>
        </div>
      </slide>
      <template #addons>
        <pagination/>
      </template>
    </carousel>



  </div>
</template>

<script setup>

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'

import { useArticleStore } from '@/stores/articles.js'

const articleStore = useArticleStore()
</script>
