import { LngLat, YMapLocationRequest } from "@yandex/ymaps3-types";

export class GeoService {
  static getCurrentLocation() {
    return new Promise<{ latitude: number; longitude: number }>(
      (resolve, reject) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              resolve({ latitude, longitude });
            },
            function (error) {
              reject(`Ошибка при получении местоположения: ${error.message}`);
            }
          );
        } else {
          reject("Geolocation не поддерживается вашим браузером");
        }
      }
    );
  }

  static getDefaultLocation(): YMapLocationRequest {
    return {
      center: [37.95, 55.65],
      zoom: 10,
    };
  }

  static fromLngLatToCoords(coords: LngLat): [number, number] {
    const [lon, lat] = coords;
    return [lon, lat];
  }
}
