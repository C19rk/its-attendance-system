export const getTodaySchedule = async (userId, prisma) => {
  const now = new Date();
  // PH is UTC+8
  const phTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);

  const y = phTime.getUTCFullYear();
  const m = String(phTime.getUTCMonth() + 1).padStart(2, "0");
  const d = String(phTime.getUTCDate()).padStart(2, "0");

  const phDateStr = `${y}-${m}-${d}`;

  // Use raw SQL because @db.Date doesn't work well with DateTime comparisons
  const customSchedule = await prisma.$queryRaw`
    SELECT * FROM "UserSchedule"
    WHERE "userId" = ${userId}
    AND "scheduleDate"::date = ${phDateStr}::date
    ORDER BY "id" DESC
    LIMIT 1
  `;

  if (customSchedule && customSchedule.length > 0) {
    return customSchedule[0];
  }

  const dayOfWeek = phTime.getUTCDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return null; // Weekend

  // Wednesday special fallback
  if (dayOfWeek === 3) {
    return { startTime: "10:00", endTime: "19:00" };
  }

  // General weekday fallback from DB
  return await prisma.userSchedule.findFirst({
    where: {
      userId,
      weekday: dayOfWeek,
      scheduleDate: null,
    },
  });
};
