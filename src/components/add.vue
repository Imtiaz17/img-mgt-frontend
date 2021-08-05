<template>
  <b-modal v-model="isOpenModal">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Upload image</p>
        <button type="button" class="delete" @click="isOpenModal = false" />
      </header>
      <section class="modal-card-body">
        <b-field label="URL">
          <b-input v-model="form.url" type="text" placeholder="Image URL">
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="isOpenModal = false">
          Close
        </button>
        <b-button :loading="uploading" type="is-success" @click="submitForm"
          >Submit</b-button
        >
      </footer>
    </div>
  </b-modal>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      uploading: false,
      isOpenModal: false,
      form: {
        url: "",
      },
    };
  },
  mounted() {
    EventBus.$on("addImg", (data) => {
      this.isOpenModal = data;
    });
  },
  methods: {
    async submitForm() {
      await this.$axios
        .post("media", this.form)
        .then((res) => {
          Vue.$toast.open({
            message: "Product uploaded successfully",
            type: "success",
          });
          this.isOpenModal = !this.isOpenModal;
          EventBus.$emit("uploaded", true);
        })
        .catch((error) => {
          if (error.response.data.url) {
            Vue.$toast.open({
              message: error.response.data.url[0],
              type: "error",
            });
          }
        });
    },
  },
};
</script>

<style></style>
