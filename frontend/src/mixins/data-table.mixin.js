export default {
  data() {
    return {
      loading: false,
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0,
        showSizeChanger: true,
        showTotal: (total, range) => this.$t("_.data-footer.page-text").format(range[0], range[1], total)
      },
      filters: null,
      sorter: {},
      items: []
    };
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.filters = filters;
      this.sorter = sorter;
      this.getDataFromApi();
    },
    async getDataFromApi() {
      this.loading = true;
      let params = {
        skip: (this.pagination.current - 1) * this.pagination.pageSize,
        limit: this.pagination.pageSize
      };
      if (this.sorter && this.sorter.field) {
        params.order = `${this.sorter.field} ${this.sorter.order === "descend" ? "DESC" : "ASC"}`;
      }
      try {
        const data = await this.listApi(params);
        this.pagination.total = data.total;
        if (typeof this.getDataFromApiHook === "function") {
          this.items = this.getDataFromApiHook(data.items);
        } else {
          this.items = data.items;
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    }
  }
};
