<script setup>
import AppLayout from "../layouts/AppLayout.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store";

const auth = useAuthStore();
const router = useRouter();

const form = reactive({ email: "", password: "" });

const onSubmit = async () => {
  const user = await auth.login(form.email, form.password);
  if (user) {
    router.push("/");
  }
};
</script>

<template>
  <AppLayout>
    <div>
      <form class="flex flex-col py-4 px-8" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-4">
          <label class="flex flex-col gap-1">
            Email
            <input name="email" type="email" v-model="form.email" />
          </label>
          <label class="flex flex-col gap-1">
            Password
            <input name="password" type="password" v-model="form.password" />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  </AppLayout>
</template>
