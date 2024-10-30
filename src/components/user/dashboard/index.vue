<template>
  <div class="container-fluid">
    <div class="row">
      <nav
        id="sidebarMenu"
        class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link :to="{name:'dashboard'}" class="nav-link">
                <v-icon icon="mdi-view-dashboard-outline"/>
                Dashboard
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name:'user_profile'}" class="nav-link">
                <v-icon icon="mdi-account-outline"/>
                Profile
              </router-link>
            </li>
            <li class="nav-item" v-if="userStore.user.isAdmin">
              <router-link :to="{name:'admin_articles'}" class="nav-link">
                <v-icon icon="mdi-text-box-multiple-outline"/>
                Articles
              </router-link>
            </li>
            <li class="nav-item" v-if="userStore.user.isAdmin">
              <router-link :to="{name:'admin_add'}" class="nav-link">
                <v-icon icon="mdi-text-box-edit-outline"/>
                Add Articles
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <main
        id = "admin_body"
        class="col-md-9 col-lg-10 ms-sm-auto px-md-4"
      >
        <div>
          <router-view/>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
  import { useUserStore } from '@/stores/user'
  const userStore = useUserStore()

</script>
