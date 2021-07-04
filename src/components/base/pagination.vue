<template>
    <div class="paging">
                    <button id="backward" 
                    @click="onClickFirstPage()"
                    :disabled="isInFirstPage"
                    >
                    </button>
                    <button id="previous"
                    @click="onClickPreviousPage()"
                    :disabled="isInFirstPage"
                    ></button>
                    
                    <div id="paging_bar">
                        <ul style="list-style-type: none; margin: 0; padding: 0;" 
                        v-for="page in pages" :key="page.name"
                        >
                            <li style="display: inline-block;">
                                <button class="button_page" 
                                @click="onClickPage(page.name)"
                                :disabled="page.isDisabled"
                                :class="{ selected: isPageActive(page.name) }"
                                
                                >{{ page.name }}</button>
                            </li>
                        </ul>
                    </div>
                    <button id="next" 
                    @click="onClickNextPage()"
                    :disabled="isInLastPage"
                    >
                    </button>
                    <button id="forward"
                    @click="onClickLastPage()"
                    :disabled="isInLastPage"
                    >
                    </button>
    </div>
</template>

<script>

export default({
    props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 4
    },
    totalPages: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) { 
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;

    },
    endPage() {
      
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
      
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i+= 1 ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage 
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);    
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  }
})
</script>


<style scoped>
.paging {
    
    width: 400px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: calc(50% - 200px);
    
}
#paging_bar{
    display: flex;
}
.paging #backward {
    height: 30px;
    width: 30px;
    background-image: url('../../assets/icon/btn-firstpage.svg');
    background-repeat: no-repeat;
    background-position: center;
    border:none;
    outline: none;
}

#backward:hover {
    cursor: pointer;
    background-color: #e5e5e5;
}

.paging #previous {
    height: 30px;
    width: 30px;
    background-image: url('../../assets/icon/btn-prev-page.svg');
    background-repeat: no-repeat;
    background-position: center;
    border:none;
    outline: none;
}

#previous:hover {
    cursor: pointer;
    background-color: #e5e5e5;
}

.paging #next {
    height: 30px;
    width: 30px;
    background-image: url('../../assets/icon/btn-next-page.svg');
    background-repeat: no-repeat;
    background-position: center;
    border:none;
    outline: none;
}

#next:hover {
    cursor: pointer;
    background-color: #e5e5e5;
}

.paging #forward {
    height: 30px;
    width: 30px;
    background-image: url('../../assets/icon/btn-lastpage.svg');
    background-repeat: no-repeat;
    background-position: center;
    border:none;
    outline: none;
}

#forward:hover {
    cursor: pointer;
    background-color: #e5e5e5;
}

#backward:active #previous:active #next:active #forward:active{
    cursor: pointer;
    background-color: #e5e5e5;
}
.selected, .selected:hover {
    background-color: #019160;
    color: #ffffff;
}
</style>