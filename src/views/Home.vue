<template>
  <div class="columns is-centered mt-5">
    <div class="column is-10">
      <div class="box">
        <b>My Images</b>
        <b-button type="is-info" style="float:right" @click="addImage"
          >Add Image</b-button
        >
        <br />
        <br />
        <div class="columns is-multiline">
          <div class="column is-3" v-for="(img, key) in images" :key="key">
            <b-image :src="img.img_name"></b-image>
          </div>
        </div>
      </div>
      <add-product />
    </div>
  </div>
</template>

<script>
import addProduct from "@/components/add";
export default {
  components: {
    addProduct,
  },
  name: "home",
  data() {
    return {
      singleProduct: {},
      images: [],
    };
  },
  computed: {
    user() {
      return localStorage.getItem("user");
    },
  },
  created() {
    this.getPictures();
    this.listen();
    if (!localStorage.getItem("token")) {
      this.$router.push("/");
    }
  },
  mounted() {},
  methods: {
    async getPictures() {
      this.isLoading = true;
      await this.$axios.get("/media").then((res) => {
        this.isLoading = false;
        this.images = res.data;
      });
    },
    listen() {
      window.Echo.private("App.Models.User." + this.user.id).notification(
        (notification) => {
          console.log(notification);
          Vue.$toast.open({
            message: "Image Uploaded successfully",
            type: "success",
          });
          this.images.unshift(notification.image);
        }
      );
    },
    addImage() {
      EventBus.$emit("addImg", true);
    },
  },
};
</script>

<style scoped>
.button {
  margin-right: 5px;
}
</style>
