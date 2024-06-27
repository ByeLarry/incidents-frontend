import { Header } from "../../components/ui/header/header";
import { MapComponent } from "../../components/map/map";
import { observer } from "mobx-react-lite";
import ThemeStore from "../../stores/theme-store";

export const Home: React.FC = observer(() => {
  const { lightMode } = ThemeStore;
  return (
    <>
      <Header />
      <MapComponent lightMode={lightMode} />
    </>
  );
});
