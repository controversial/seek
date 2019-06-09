import { mapState } from 'vuex';
import gql from 'graphql-tag';

export default {
  data: () => ({
    data: {},
  }),

  computed: {
    ...mapState(['user']),
    classData() { return this.data.class; },
    students() { return this.data.students; },
  },

  apollo: {
    class: {
      query: gql`
        query FetchQuery($teacher: String!, $period: String!) {
          class(teacher: $teacher, period: $period) {
            class { name }
            students { name }
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
