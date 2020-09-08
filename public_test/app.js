const vm = new Vue({
  el: '#vue-instance',
  data() {
    return {
      baseUrl: 'http://localhost:3000/api',
      searchTerm: 'Hello World',
      searchDebounce: null,
      searchResults: [],
      numHits: null,
      searchOffset: 0,

      selectedParagraph: null,
      bookOffset: 0,
      paragraphs: []
    }
  },
  async created() {
    this.searchResults = await this.search()
  },
  methods: {
    onSearchInput() {
      clearTimeout(this.searchDebounce);

      this.searchDebounce = setTimeout(async () => {
        this.searchOffset = 0;
        this.searchResults = await this.search();
      }, 100);
    },
    async search() {
      const url = `${this.baseUrl}/search`;
      const body = { params: { term: this.searchTerm, offset: this.searchOffset }};
      const response = await axios.get(url, body);

      this.numHits = response.data.hits.total;
      return response.data.hits.hits;
    },
    async nextResultsPage() {
      if (this.numHits > 10) {
        this.searchOffset += 10;

        if (this.searchOffset + 10 > this.numHits) {
          this.searchOffset = this.numHits - 10;
        }

        this.searchResults = await this.search();
        document.documentElement.scrollTop = 0;
      }
    },
    async prevResultsPage() {
      this.searchOffset -= 10;

      if (this.searchOffset < 0) { this.searchOffset = 0; }

      this.searchResults = await this.search();
      document.documentElement.scrollTop = 0;
    },
    async getParagraphs(bookTitle, offset) {
      try {
        this.bookOffset = offset;
        const start = this.bookOffset;
        const end = this.bookOffset + 10;
        const response = await axios.get(`${this.baseUrl}/paragraphs`, { params: { bookTitle, start, end } });
        return response.data.hits.hits;
      } catch (err) {
        console.error(err);
      }
    },
    /** Get next page (next 10 paragraphs) of selected book */
    async nextBookPage () {
      this.$refs.bookModal.scrollTop = 0
      this.paragraphs = await this.getParagraphs(this.selectedParagraph._source.title, this.bookOffset + 10)
    },
    /** Get previous page (previous 10 paragraphs) of selected book */
    async prevBookPage () {
      this.$refs.bookModal.scrollTop = 0
      this.paragraphs = await this.getParagraphs(this.selectedParagraph._source.title, this.bookOffset - 10)
    },
    /** Display paragraphs from selected book in modal window */
    async showBookModal (searchHit) {
      try {
        document.body.style.overflow = 'hidden'
        this.selectedParagraph = searchHit
        this.paragraphs = await this.getParagraphs(searchHit._source.title, searchHit._source.location - 5)
      } catch (err) {
        console.error(err)
      }
    },
    /** Close the book detail modal */
    closeBookModal () {
      document.body.style.overflow = 'auto'
      this.selectedParagraph = null
    }
  }
});