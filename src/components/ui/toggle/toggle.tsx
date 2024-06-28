import { observer } from "mobx-react-lite";
import ThemeStore from "../../../stores/theme.store";
import "./toggle.scss";

export const ToggleComponent: React.FC = observer(() => {
  const { lightMode, changeTheme } = ThemeStore;

  return (
    <div
      className={`toggle__wrapper ${lightMode ? "toggle__wrapper_light" : ""}`}
    >
      <div className={`toggle__back ${lightMode ? "toggle__back_light" : ""}`}>
        <div className="star star1"></div>
        <div className="star star2"></div>
        <div className="star star3"></div>
        <div className="star star4"></div>
        <div className="star star5"></div>
      </div>
      <input
        type="checkbox"
        id="dark-mode-toggle"
        className="toggle-checkbox"
        defaultChecked={!lightMode}
        onChange={() => changeTheme(!lightMode)}
      />
      <label htmlFor="dark-mode-toggle" className="toggle-label"></label>
    </div>
  );
});
