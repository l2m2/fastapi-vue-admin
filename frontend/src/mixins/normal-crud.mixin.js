export default {
  computed: {
    columns() {
      return this.config.columns(this);
    },
    formConfig() {
      return this.uiloader(this);
    }
  },
  watch: {
    modalVisible(val) {
      val || this.closeModal();
    }
  },
  async mounted() {
    this.sorter = Object.assign({}, this.config.defaultSorter);
    await this.getDataFromApi();
  },
  methods: {
    editItem(item = this.config.defaultItem) {
      this.editedItem = Object.assign({}, item);
      this.modalVisible = true;
      this.$nextTick(() => {
        this.updateFormValues(this.editedItem);
      });
    },
    deleteItem(item) {
      let self = this;
      this.editedItem = Object.assign({}, item);
      this.$confirm({
        title: this.$t("_.dialog.delete.title"),
        content: this.$t("_.dialog.delete.content"),
        okType: "danger",
        okText: this.$t("_.dialog.delete.ok"),
        cancelText: this.$t("_.dialog.delete.cancel"),
        async onOk() {
          await self.deleteApi(self.editedItem.id);
          await self.getDataFromApi();
        }
      });
    },
    closeModal() {
      this.modalVisible = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.config.defaultItem);
      });
    },
    async save() {
      const valid = await this.$refs.observer.validate();
      if (!valid) {
        return;
      }
      if (this.editedItem.id) {
        await this.updateApi(this.editedItem.id, this.editedItem);
      } else {
        await this.createApi(this.editedItem);
      }
      await this.getDataFromApi();
      this.closeModal();
    }
  }
};
