import { mapState } from 'vuex';
import gql from 'graphql-tag';
import { ordinal } from '../../../utils';

const statuses = {};

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

    randomStatus() {
      const absent = Math.random() > 0.85;
      const arrivalDelta = Math.floor((Math.random() * 20) - 15);
      if (absent) return { status: 'absent', text: 'Absent' };
      if (arrivalDelta > 0) return { status: 'late', text: `Late – 8:${arrivalDelta.toString().padStart(2, '0')}` };
      return { status: 'present', text: 'Present' };
    },

    getStatus(student) {
      if (!statuses[student.username]) statuses[student.username] = this.randomStatus();
      return statuses[student.username];
    },
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
