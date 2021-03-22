export default {
  data() {
    return {
      loading: false,
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0,
        showSizeChanger: true
      },
      filters: null,
      sorter: null,
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
      if (this.sorter) {
        params.order = `${this.sorter.field} ${this.sorter.order === "ascend" ? "ASC" : "DESC"}`;
      }
      try {
        const data = await this.listApi(params);
        this.pagination.total = data.total;
        this.items = data.items;
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    }
  }
};
