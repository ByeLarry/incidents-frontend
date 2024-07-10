import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function timeAgo(date: Date | undefined) {
  if (!date) return "";
  return formatDistanceToNow(date, { addSuffix: true, locale: ru });
}
