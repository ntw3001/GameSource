<template>

  <h1>Add Article</h1>
  <hr/>
  <Form class="mb-5" @submit="onSubmit" :validation-schema="ArticleSchema">
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
      <Field name="article" v-slot="{field, errors, errorMessage}">
        <textarea
          rows="3"
          class="form-control"
          placeholder="Sounds swell, tell me about it compadre"
          v-bind="field"
          :class="{'is-invalid':errors.length !== 0}"
        ></textarea>
        <div class="Input_alert" v-if="errors.length !== 0">
            {{ errorMessage }}
        </div>
      </Field>
    </div>

    <!-- // part 4 -->

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

  const ratingArray = [0, 1, 2, 3, 4, 5]

  function onSubmit(values, { resetForm }) {
    console.log(values);
  }

</script>
