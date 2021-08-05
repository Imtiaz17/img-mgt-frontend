<template>
  <div>
    <b-modal v-model="isOpen">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Update product</p>
          <button type="button" class="delete" @click="isOpen = false" />
        </header>
        <section class="modal-card-body">
          <b-field label="Title">
            <b-input
              v-model="data.title"
              type="text"
              placeholder="Product title"
            >
            </b-input>
          </b-field>

          <b-field label="Description">
            <b-input
              v-model="data.description"
              type="textarea"
              placeholder="Description"
            >
            </b-input>
          </b-field>
          <b-field label="Price">
            <b-input
              v-model="data.price"
              type="number"
              placeholder="Product price"
            >
            </b-input>
          </b-field>
          <b-field label="Image">
            <p><img :src="data.image" width="200" height="200" alt="" /></p>
          </b-field>
          <b-field
            class="file is-primary"
            :class="{ 'has-name': !!data.image }"
          >
            <b-upload v-model="data.image" class="file-label">
              <span class="file-cta">
                <b-icon class="file-icon" icon="upload"></b-icon>
                <span class="file-label">Click to upload new photo</span>
              </span>
              <span class="file-name" v-if="data.image">
                {{ data.image.name }}
              </span>
            </b-upload>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="isOpen = false">
            Close
          </button>
          <b-button
            :loading="uploading"
            type="is-success"
            @click="updateProduct"
            >Update</b-button
          >
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: ["data"],
  data() {
    return {
      uploading: false,
      isOpen: false,
    };
  },
  mounted() {
    EventBus.$on("editPro", (data) => {
      this.isOpen = data;
    });
  },
  methods: {
    async updateProduct() {
      this.uploading = true;
      let formData = new FormData();
      formData.append("title", this.data.title);
      formData.append("description", this.data.description);
      formData.append("price", this.data.price);
      formData.append("image", this.data.image);
      formData.append("_method", "PATCH");
      await this.$axios
        .post(`product/${this.data.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.uploading = false;
          this.isModal = false;
          Vue.$toast.open({
            message: "Product updated successfully",
            type: "success",
          });
          this.isOpen = !this.isOpen;
        })
        .catch((error) => {
          this.isModal = false;
        });
    },
  },
};
</script>

<style></style>
