import { mapState } from 'vuex';
import gql from 'graphql-tag';
import { ordinal } from '../../../utils';

export default {
  data: () => ({
    data: {},
  }),

  computed: {
    ...mapState(['user']),
    classData() { return this.data.class; },
    students() { return this.data.students; },
  },

  methods: {
    ordinal,
  },

  apollo: {
    class: {
      query: gql`
        query FetchQuery($teacher: String!, $period: String!) {
          class(teacher: $teacher, period: $period) {
            class { name }
            students { name username gradeLevel location { name } }
          }
        }
      `,
      variables() {
        return {
          teacher: this.user.username,
          period: this.$route.params.period,
        };
      },
      update(data) { this.data = data.class; },
    },
  },
};
