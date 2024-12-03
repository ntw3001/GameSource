import * as yup from 'yup';
import { ref } from 'vue';

import { useUserStore } from '@/stores/user';
import { connectFirestoreEmulator } from 'firebase/firestore';

export const updateProfile = () => {
  const userStore = useUserStore();
  const firstname = ref(userStore.user.firstname);
  const lastname = ref(userStore.user.lastname);

  const loading = ref(false);
  const formSchema = yup.object().shape({
    firstname: yup.string()
      .required('No profile until you tell me your name')
      .max(50, 'No that\'s too much'),
    lastname: yup.string()
      .required('NO PROFILE UNTIL YOU TELL ME YOUR NAME')
      .max(50, 'No that\'s too much')
  });

  function onSubmit(values, {resetForm}) {
    loading.value = true;
    userStore.updateProfile(values)
    .finally(() => {
      loading.value = false;
    }).catch(() => {
      loading.value = false;
    });
  }

  return {
    firstname,
    lastname,
    loading,
    formSchema,
    onSubmit
  }
}
