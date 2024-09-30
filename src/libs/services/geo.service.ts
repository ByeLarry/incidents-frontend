import { LngLat } from "@yandex/ymaps3-types";
import { CoordsDto } from "../dto/coords.dto";

export class GeoServiceFromBrowser {
  static getCurrentLocation(): Promise<CoordsDto> {
    return new Promise<CoordsDto>((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ lat: latitude, lng: longitude });
          },
          function (error) {
            reject(`Ошибка при получении местоположения: ${error.message}`);
          }
        );
      } else {
        reject("Geolocation не поддерживается вашим браузером");
      }
    });
  }

  static fromLngLatToCoords(coords: LngLat): [number, number] {
    const [lon, lat] = coords;
    return [lon, lat];
  }
}
