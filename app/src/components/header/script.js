import { mapState } from 'vuex';

export default {
  data: () => ({
    currentBlock: '1B',
  }),

  computed: {
    ...mapState(['user', 'school']),
  },
};
