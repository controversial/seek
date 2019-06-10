import { mapState } from 'vuex';
import gql from 'graphql-tag';
import { ordinal } from '../../../utils';

const statuses = {};

function todayAtTime(time) { return new Date(`${new Date().toLocaleDateString()} ${time}`); }

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


  // DATA FETCHING


  apollo: {
    class: {
      query: gql`
        query FetchQuery($teacher: String!, $period: String!) {
          class(teacher: $teacher, period: $period) {
            class { name }
            startTime
            endTime
            students {
              id
              name
              username
              gradeLevel
              location { name }
            }
          }
        }
      `,
      variables() {
        return {
          teacher: this.user.username,
          period: this.$route.params.period,
        };
      },
      update(data) {
        this.data = data.class;
        this.data.startTime = todayAtTime(this.data.startTime);
        this.data.endTime = todayAtTime(this.data.endTime);
        this.$apollo.queries.attendance.skip = false;
      },
    },

    // Fetch relevant Events for each student once the first query reveals the relevant timeframe
    attendance: {
      skip: true,
      query: gql`
        query AttendanceQuery($students: [ID!]!, $from: String!, $to: String!) {
          students(ids: $students) {
            id
            events(from: $from, to: $to) {
              type
              timestamp
              location { name }
            }
          }
        },
      `,
      variables() {
        return {
          students: this.data.students.map(s => s.id),
          //                                             Ten minutes before
          from: new Date(this.data.startTime.getTime() - (10 * 60000)).toISOString(),
          to: this.data.endTime.toISOString(),
        };
      },
      update(data) {
        // Combine old students data with new students data
        this.data.students = this.data.students.map(s => (({
          ...s,
          ...data.students.find(s2 => s2.id === s.id),
        })));
      },
    },
  },
};
