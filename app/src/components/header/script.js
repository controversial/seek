import { mapState } from 'vuex';

export default {
  data: () => ({
    currentBlock: '1B',
  }),

  computed: {
    ...mapState(['user', 'school']),
  },

  methods: {
    scrolled() {
      const scroll = window.scrollY;
      const opacity = ((-scroll + 10) / 30) + 1;
      this.$refs.name.style.opacity = Math.min(Math.max(opacity, 0), 1);
    },
  },

  mounted() { window.addEventListener('scroll', this.scrolled); },
  destroyed() { window.removeEventListener('scroll', this.scrolled); },
};
