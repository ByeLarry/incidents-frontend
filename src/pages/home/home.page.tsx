import { Header } from "../../components/header/header";
import { MapComponent } from "../../components/map/map";
import { observer } from "mobx-react-lite";
import ThemeStore from "../../stores/theme.store";
import userStore from "../../stores/user.store";
import "../../index.scss";

export const Home: React.FC = observer(() => {
  const { lightMode } = ThemeStore;
  const { isEmptyUser } = userStore;

  return (
    <>
      <Header />
      <MapComponent lightMode={lightMode} isEmptyUser={isEmptyUser()} />
      <span className="backlight-white"></span>
    </>
  );
});
