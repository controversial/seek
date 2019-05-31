module.exports = {
  Query: {
    student(root, args, context) {
      return context.prisma.student({ username: args.username });
    },

    async students(root, args, context) {
      const teacherClasses = await context.prisma
        .user({ username: args.teacher })
        .classes();
      const teacherScheduleIds = teacherClasses.map(c => c.id);

      return context.prisma.students({
        where: {
          schedule_some: { id_in: teacherScheduleIds },
        },
      });
    },
  },

  Student: {
    schedule(root, args, context) { return context.prisma.student({ id: root.id }).schedule(); }
  },

  MasterScheduleEntry: {
    class(root, args, context) { return context.prisma.masterScheduleEntry({ id: root.id }).class(); },
    teacher(root, args, context) { return context.prisma.masterScheduleEntry({ id: root.id }).teacher(); },
  },
};
