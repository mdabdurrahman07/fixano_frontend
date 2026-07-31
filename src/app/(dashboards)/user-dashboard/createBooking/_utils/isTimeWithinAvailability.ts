import { TechnicianAvailability } from "../_types/types";

export function isTimeWithinAvailability(
  scheduledAtStr: string,
  availabilities: TechnicianAvailability[],
): boolean {
  if (!availabilities || availabilities.length === 0) return false;

  const date = new Date(scheduledAtStr);
  if (isNaN(date.getTime())) return false;

  const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon ...
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const selectedTime = `${hours}:${minutes}`;

  return availabilities.some((a) => {
    return (
      a.dayOfWeek === dayOfWeek &&
      selectedTime >= a.startTime &&
      selectedTime <= a.endTime
    );
  });
}
