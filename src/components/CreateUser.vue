<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="text-center">
        <span class="headline">Create User</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <!-- Name Field -->
          <v-text-field
            v-model="user.name"
            :rules="[rules.required, rules.maxLength(255)]"
            label="Name"
            required
          />
          <!-- Email Field -->
          <v-text-field
            v-model="user.email"
            :rules="[rules.required, rules.email]"
            label="Email"
            required
            type="email"
          />
          <!-- Password Field -->
          <v-text-field
            v-model="user.password"
            :rules="[rules.required, rules.minLength(8)]"
            label="Password"
            required
            type="password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="green darken-1" text @click="createUser"
          >Create User</v-btn
        >
        <v-btn color="grey" text @click="$emit('update:dialog', false)"
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from "vue";

export default {
  // Props to control dialog visibility
  props: {
    createUserDialog: {
      type: Boolean,
      required: true,
    },
    createUserCallback: {
      type: Function,
      required: true,
    },
  },
  setup(props, { emit }) {
    // Emit event to close the dialog

    // Data and form validity
    const valid = ref(false);
    const user = ref({
      name: "",
      email: "",
      password: "",
    });

    // Validation rules
    const rules = {
      required: (v) => !!v || "This field is required",
      email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      maxLength: (max) => (v) => v.length <= max || `Max ${max} characters`,
      minLength: (min) => (v) => v.length >= min || `Min ${min} characters`,
    };

    // Create user function
    const createUser = async () => {
      if (valid.value && (await validateForm())) {
        props.createUserCallback(user.value);
        closeDialog();
      }
    };

    // Form validation
    const validateForm = () => {
      return new Promise((resolve) => {
        resolve(valid.value);
      });
    };

    // Close dialog function
    const closeDialog = () => {
      emit("update:dialog", false);
    };

    // Expose variables and functions
    return {
      valid,
      user,
      createUser,
      closeDialog,
      rules,
    };
  },
};
</script>
