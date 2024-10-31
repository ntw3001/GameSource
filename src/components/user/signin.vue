<template>
  <div class="signin_container">

    <div class="text-center" v-show="userStore.loading">
      <v-progress-circular indeterminate color="primary"/>
    </div>

    <Form @submit="onSubmit" :validation-schema="formSchema">
      <h1 v-text="!type ? 'Sign in' : 'Register'"></h1>

      <div class="form-group">
        <Field
          name="email"
          :value="'framcos@gmail.com'"
          v-slot="{field, errors, errorMessage}"
          ><input
            type="text"
            class="form-control"
            placeholder="Throw that email in here buddy"
            v-bind="field"
            :class="{'is-invalid':errors.length !== 0}"
          />
          <div
            class="Input_alert"
            v-if="errors.length !== 0"
            >
              {{ errorMessage }}
          </div>
        </Field>
      </div>

      <div class="form-group">
        <Field
          name="password"
          :value="'pasword123'"
          v-slot="{field, errors, errorMessage}"
          ><input
            type="text"
            class="form-control"
            placeholder="And give us a password too"
            v-bind="field"
            :class="{'is-invalid':errors.length !== 0}"
          />
          <div
            class="Input_alert"
            v-if="errors.length !== 0"
            >
              {{ errorMessage }}
            </div>
        </Field>
      </div>

      <button
        type="submit"
        class="btn btn-block"
        v-text="!type ? 'Finish the job' : 'Become one of us'"
      ></button>

      <hr/>
      <div class="form_swap" @click="type = !type">
        <span v-if="type">Already a member? Proceed to sign in</span>
        <span v-else>Not a member yet? Useless, come here</span>
      </div>
    </Form>

  </div>

</template>

<script setup>

import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';

import { useToast } from 'vue-toast-notification';
const $toast = useToast();

import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

const type = ref(false);
const formSchema = yup.object({
  email: yup.string().email("Obviously that's not an email").required("Gotta give us an email friend"),
  password: yup.string().required("We need a password :/")
});

function onSubmit(values, { resetForm }) {
 if (type.value) {
    userStore.register(values);
    resetForm();
 } else {
    userStore.signIn(values);
    resetForm();
 }
}

userStore.$onAction(({name, after, onError}) => {
  if(name === 'register' || name === 'signIn') {
    after(() => {
      $toast.success("You'll like it here friend");
    });
    onError((error) => {
      $toast.error(error.message);
    });
  }
})

</script>
