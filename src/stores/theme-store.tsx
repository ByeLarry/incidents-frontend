import { makeAutoObservable } from "mobx";

class ThemeStore {
  lightMode = false;

  constructor() {
    makeAutoObservable(this);
    const savedLightMode = localStorage.getItem("lightMode");
    if (savedLightMode === "true") {
      this.lightMode = true;
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    } else if (savedLightMode === "false") {
      this.lightMode = false;
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    }
  }

  changeTheme = (lightMode: boolean) => {
    // console.log("[changeTheme]: ", lightMode);
    if (!lightMode) {
      localStorage.setItem("lightMode", "false");
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      localStorage.setItem("lightMode", "true");
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
    this.lightMode = lightMode;
  };
}

export default new ThemeStore();
