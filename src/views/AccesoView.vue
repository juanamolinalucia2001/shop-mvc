<template>

    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <div>
        <v-tabs v-model="tab" show-arrows background-color="yellow accent-4" icons-and-text dark grow>
          <v-tabs-slider color="yellow "></v-tabs-slider>
          <v-tab v-for="i in tabs" :key="i.id">
            <v-icon large>{{ i.icon }}</v-icon>
            <div class="caption py-1">{{ i.name }}</div>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <login />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <register />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-dialog>

</template>

<script>
import Login from "@/components/user/Login.vue";
import Register from "@/components/user/Register.vue";

export default {
  name: "MyView",
  components: {
    Login,
    Register,
  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { id:1,icon: "mdi-account", name: "Login" },
      { id:2,icon: "mdi-account-plus", name: "Register" },
    ],
  }),
};
</script>
