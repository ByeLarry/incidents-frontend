import { makeAutoObservable } from "mobx";
import { FULL_BLACK_COLOR, FULL_WHITE_COLOR } from "../utils";

class ThemeStore {
  lightMode = false;
  color = FULL_WHITE_COLOR;

  constructor() {
    makeAutoObservable(this);
    const savedLightMode = localStorage.getItem("lightMode");
    if (savedLightMode === "true") {
      this.lightMode = true;
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      this.color = FULL_BLACK_COLOR;
    } else if (savedLightMode === "false") {
      this.lightMode = false;
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      this.color = FULL_WHITE_COLOR
    }
  }

  changeTheme = (lightMode: boolean) => {
    if (!lightMode) {
      localStorage.setItem("lightMode", "false");
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      this.color = FULL_WHITE_COLOR;
    } else {
      localStorage.setItem("lightMode", "true");
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      this.color = FULL_BLACK_COLOR;
    }
    this.lightMode = lightMode;
  };
}

export default new ThemeStore();
