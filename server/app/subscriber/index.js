// The subscriber listens to the find3 feed of events, and adds them to the database

const { prisma } = require('~prisma');

const WebSocket = require('ws');
const ws = new WebSocket(`ws://${process.env.FIND3_ADDRESS}/ws?device=all&family=nphs`); // TODO: figure out how to rename family to seek

ws.on('open', () => console.log('Connected to find3'));
ws.on('message', async (message) => {
  // Deconstruct received signal
  const { sensors, location: locationName, time } = JSON.parse(message);
  const { d: deviceId } = sensors;
  // Match a student to this event
  const student = await prisma.student({ assignedDeviceId: deviceId });
  if (student === null) return;
  // Match location id to the location measured
  const location = await prisma.location({ name: locationName });
  // Record event
  await prisma.createEvent({
    timestamp: new Date(time),
    student: { connect: { id: student.id } },
    location: { connect: { id: location.id } },
  });
});
