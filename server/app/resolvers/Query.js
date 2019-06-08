module.exports = {
  Query: {
    student(root, args, context) {
      return context.prisma.student({ username: args.username });
    },

    async students(root, args, context) {
      const filterByTeacher = !!args.teacher;
      let teacherScheduleIds;
      if (filterByTeacher) {
        const teacherClasses = await context.prisma
          .user({ username: args.teacher })
          .classes();
        teacherScheduleIds = teacherClasses.map(c => c.id);
      }

      const query = filterByTeacher
        ? { where: { schedule_some: { id_in: teacherScheduleIds } } }
        : undefined;
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
    schedule(root, args, context) { return context.prisma.student({ id: root.id }).schedule(); }
  },

  MasterScheduleEntry: {
    class(root, args, context) { return context.prisma.masterScheduleEntry({ id: root.id }).class(); },
    teacher(root, args, context) { return context.prisma.masterScheduleEntry({ id: root.id }).teacher(); },
  },
};
