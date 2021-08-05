<template>
  <div>
    <b-modal v-model="isOpen">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">View product</p>
          <button type="button" class="delete" @click="isOpen = false" />
        </header>
        <section class="modal-card-body">
          <b-field horizontal label="Title">
            <p>{{ data.title }}</p>
          </b-field>
          <b-field horizontal label="Price">
            <p>{{ data.price }}</p>
          </b-field>
          <b-field horizontal label="Description">
            <p>{{ data.description }}</p>
          </b-field>
          <b-field horizontal label="Image">
            <p><img :src="data.image" width="400" height="400" alt="" /></p>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="isOpen = false">
            Close
          </button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      isOpen: false,
    };
  },
  mounted() {
    EventBus.$on("open", (data) => {
      this.isOpen = data;
    });
  },
};
</script>

<style></style>
