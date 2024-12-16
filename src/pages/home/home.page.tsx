import { Header } from "../../components/header/header";
import { observer } from "mobx-react-lite";
import ThemeStore from "../../stores/theme.store";
import userStore from "../../stores/user.store";
import "../../index.scss";
import { MapComponent } from "../../features/map/map";

export const Home: React.FC = observer(() => {
  const { lightMode } = ThemeStore;
  const { isEmptyUser } = userStore;

  return (
    <>
      <Header />
      <MapComponent lightMode={lightMode} isEmptyUser={isEmptyUser()} />
      {!lightMode && <span className="backlight-white"></span>}
    </>
  );
});

export default Home;
