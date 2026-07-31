import { TechnicianAvailability } from "../_types/types";

export function isTimeWithinAvailability(
  scheduledAt: string,
  availabilities: TechnicianAvailability[],
): boolean {
  if (!scheduledAt || availabilities.length === 0) return false;

  // scheduledAt is "2026-07-09T21:35:00" — local time, no Z suffix.
  // Parse the day-of-week and time directly from the string to avoid UTC conversion.
  const localDate = new Date(scheduledAt);
  const dayOfWeek = localDate.getDay(); // 0=Sun ... 6=Sat (local)

  // Extract HH:MM directly from the string — no timezone math.
  const timePart = scheduledAt.slice(11, 16); // "21:35"

  return availabilities.some((a) => {
    if (a.dayOfWeek !== dayOfWeek) return false;
    return (
      timePart >= a.startTime.slice(0, 5) && timePart <= a.endTime.slice(0, 5)
    );
  });
}
