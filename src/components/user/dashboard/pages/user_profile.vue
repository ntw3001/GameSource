<template>
  User Profile
</template>

<script setup>
  import { Field, Form } from 'vee-validate'
  import { updateProfile } from '@/conmposables/user'

  const { loading, formSchema, firstname, lastname, onSubmit } = updateProfile()

</script>
