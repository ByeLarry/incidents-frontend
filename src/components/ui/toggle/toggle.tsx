import { observer } from "mobx-react-lite";
import ThemeStore from "../../../stores/theme-store";
import "./toggle.scss";

export const ToggleComponent: React.FC = observer(() => {
  const { lightMode, changeTheme } = ThemeStore;

  return (
    <>
      <input
        type="checkbox"
        id="dark-mode-toggle"
        className="toggle-checkbox"
        defaultChecked={!lightMode}
        onChange={() => changeTheme(!lightMode)}
      />
      <label htmlFor="dark-mode-toggle" className="toggle-label"></label>
    </>
  );
});
