<template>

  <h1>Add Article</h1>
  <hr/>

  <div class="text-center m-3" v-show="loading">
    <v-progress-circular
      indeterminate
      color="primary"
    />
  </div>

  <Form class="mb-5" @submit="onSubmit" :validation-schema="ArticleSchema" v-show="!loading">
    <div class="mb-4">
      <Field name="game" v-slot="{field, errors, errorMessage}">
        <input
          type="text"
          class="form-control"
          placeholder="What's the name of the game buddy"
          v-bind="field"
          :class="{'is-invalid':errors.length !== 0}"
        />
        <div class="Input_alert" v-if="errors.length !== 0">
            {{ errorMessage }}
        </div>
      </Field>
    </div>

    <div class="mb-4">
      <Field name="title" v-slot="{field, errors, errorMessage}">
        <input
          type="text"
          class="form-control"
          placeholder="Sum it up, make it pithy pal"
          v-bind="field"
          :class="{'is-invalid':errors.length !== 0}"
        />
        <div class="Input_alert" v-if="errors.length !== 0">
            {{ errorMessage }}
        </div>
      </Field>
    </div>



    <div class="mb-4">
      <WYSIWYG @update="updateEditor"/>
      <Field name="Editor" v-model="veditor" v-slot="{field, errors, errorMessage}">
        <input
          type="hidden"
          id="veditor"
          v-bind="field"
        />
          <div class="input-alert" v-if="errors.length !== 0">
            {{ errorMessage }}
          </div>
      </Field>
    </div>

    <div class="mb-4">
      <Field name="excerpt" v-slot="{field, errors, errorMessage}">
        <textarea
          rows="1"
          class="form-control"
          placeholder="That's crazy! Could you give me the elevator pitch friend?"
          v-bind="field"
          :class="{'is-invalid':errors.length !== 0}"
        ></textarea>
        <div class="Input_alert" v-if="errors.length !== 0">
            {{ errorMessage }}
        </div>
      </Field>
    </div>

    <div class="mb-4">
      <Field name="rating" value="Select a rating" v-slot="{field, errors, errorMessage}">
        <select
          v-bind="field"
          class="form-select"
          :class="{'is-invalid':errors.length !== 0}"
        >
          <option value="Select a rating">How do you rate it chum</option>
          <option v-for="rating in ratingArray" :key="rating" :value="rating">
            {{ rating }}
          </option>
        </select>
        <div class="Input_alert" v-if="errors.length !== 0">
            {{ errorMessage }}
        </div>
      </Field>
    </div>



    <div class="mb-4">
      <Field name="img" v-slot="{field, errors, errorMessage}">
        <input
          type="text"
          class="form-control"
          placeholder="https://i.ytimg.com/vi/zMEN5oVib2Y/maxresdefault.jpg"
          v-bind="field"
          :class="{'is-invalid':errors.length !== 0}"
        />
        <div class="Input_alert" v-if="errors.length !== 0">
            {{ errorMessage }}
        </div>
      </Field>
    </div>

    <v-btn
      type="submit"
      variant="tonal"
    >
      Throw it on the pile amigo
    </v-btn>

  </Form>
</template>

<script setup>
  import { ref } from 'vue';
  import { Field, Form } from 'vee-validate';
  import ArticleSchema from './schema.js';

  import WYSIWYG from '@/utils/wysiwyg.vue';

  import { useArticleStore } from '@/stores/articles.js';
  const articleStore = useArticleStore()

  import { useToast } from 'vue-toast-notification';
  const $toast = useToast();

  const loading = ref(false)
  const ratingArray = [0, 1, 2, 3, 4, 5]
  const veditor = ref('')

  function onSubmit(values, { resetForm }) {
    loading.value = true;
    articleStore.addArticle(values)
    .then(()=>{
      $toast.success('Shine Get!')
    })
    .catch((error)=>{
      $toast.error(error.message)
    })
    .finally(()=>{
      loading.value = false;
    })
  }

  function updateEditor(value) {
    veditor.value = value
  }

</script>

<style>
.ProseMirror {
  min-height: 120px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
}
</style>
