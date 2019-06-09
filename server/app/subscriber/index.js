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
  const studentQuery = prisma
    .student({ assignedDeviceId: deviceId })
    .$fragment(`
      fragment StudentWithLocationInfo on Student {
        id
        name
        assignedDeviceId
        lastSeen
        location { id }
        tentativeLocation { id }
      }`);
  // Match location id to the location measured
  const locationQuery = prisma.location({ name: locationName });

  const [student, location] = await Promise.all([studentQuery, locationQuery]);
  if (student === null) return;
  if (!location) console.warn(`Warning: find3 location '${locationName}' didn't match any defined locations`);

  const locationUpdates = {};
  // Student isn't already in recorded location
  if (location && (student.location || {}).id !== location.id) {
    // Tentative location matches measured location. Location is confirmed
    if (student.tentativeLocation && student.tentativeLocation.id === location.id) {
      Object.assign(locationUpdates, {
        location: { connect: { id: location.id } },
        tentativeLocation: null,
      });
    }
    // Tentative location didn't match. Set new tentative location
    else Object.assign(locationUpdates, { tentativeLocation: { connect: { id: location.id } } });
  }

  // New location recorded; record an Event
  if (locationUpdates.location && (student.location || !location.external)) {
    await prisma.createEvent({
      timestamp: new Date(time),
      student: { connect: { id: student.id } },
      // If the new location is “external,” we're leaving; otherwise we're entering
      ...location && { location: { connect: { id: location.external ? student.location.id : location.id } } },
      type: location.external ? 'LEAVE' : 'ENTER',
    });
  }

  await prisma.updateStudent({
    where: { id: student.id },
    data: {
      lastSeen: new Date(time),
      ...locationUpdates,
    }
  })
});
