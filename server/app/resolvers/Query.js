module.exports = {
  Query: {
    student(root, args, context) {
      return context.prisma.student({ username: args.username });
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
