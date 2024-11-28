import * as yup from 'yup';
import { ref } from 'vue';

import { useUserStore } from '@/stores/user';
import { connectFirestoreEmulator } from 'firebase/firestore';

export const updateProfile = () => {
  const userStore = useUserStore();
  const firstName = ref(userStore.user.firstname);
  const lastName = ref(userStore.user.lastname);

  const loading = ref(false);
  const formSchema = yup.object().shape({
    firstName: yup.string()
      .required('No profile until you tell me your name')
      .max(50, 'No that\'s too much'),
    lastName: yup.string()
      .required('NO PROFILE UNTIL YOU TELL ME YOUR NAME')
      .max(50, 'No that\'s too much')
  });

  function onSubmit(value, {resetForm}) {
    console.log(value);
    // loading.value = true;
    // userStore.updateProfile({
    //   firstName: firstName.value,
    //   lastName: lastName.value
    // }).then(() => {
    //   loading.value = false;
    // }).catch(() => {
    //   loading.value = false;
    // });
  }

  return {
    firstName,
    lastName,
    loading,
    formSchema,
    onSubmit
  }
}
