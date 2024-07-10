export function formatDistance(distance: number) {
  if (distance < 1000) return distance + " м";
  else return (distance / 1000).toFixed(2) + " км";
}
