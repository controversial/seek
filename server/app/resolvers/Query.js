module.exports = {
  Query: {
    student(root, args, context) {
      return context.prisma.student({ username: args.username });
    },

    async students(root, args, context) {
      const filterByTeacher = !!args.teacher;
      const filterByIds = !!args.ids;
      let teacherScheduleIds;
      if (filterByTeacher) {
        const teacherClasses = await context.prisma
          .user({ username: args.teacher })
          .classes();
        teacherScheduleIds = teacherClasses.map(c => c.id);
      }

      let query;
      if (filterByTeacher) query = { where: { schedule_some: { id_in: teacherScheduleIds } } };
      else if (filterByIds) query = { where: { id_in: args.ids } };

      return context.prisma.students(query);
    },

    async class(root, args, context) {
      const classes = await context.prisma.user({ username: args.teacher }).classes();
      const periodNum = args.period[0];
      const letterDay = args.period[1];
      return classes.find(c => parseInt(c.periodNum) === parseInt(periodNum)
        && c.letterDay.toLowerCase() === letterDay.toLowerCase());
    }
  },

  Student: {
    schedule(root, args, context) { return context.prisma.student({ id: root.id }).schedule(); },
    location(root, args, context) { return context.prisma.student({ id: root.id }).location(); },
    events(root, args, context) {
      return context.prisma.student({ id: root.id }).events({
        ...(args.from && args.to) && {
          where: {
            timestamp_gt: args.from,
            timestamp_lt: args.to,
          },
        },
      });
    }
  },

  MasterScheduleEntry: {
    class(root, args, context) { return context.prisma.masterScheduleEntry({ id: root.id }).class(); },
    teacher(root, args, context) { return context.prisma.masterScheduleEntry({ id: root.id }).teacher(); },
    students(root, args, context) { return context.prisma.students({ where: { schedule_some: { id: root.id } } }); },
  },

  Event: {
    location(root, args, context) { return context.prisma.event({ id: root.id }).location(); },
  },
};
