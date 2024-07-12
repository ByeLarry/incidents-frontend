export function formatDistance(distance: number) {
  if (distance < 1000) return distance.toFixed(0) + " м";
  else return (distance / 1000).toFixed(2) + " км";
}
