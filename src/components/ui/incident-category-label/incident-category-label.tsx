import { colors } from "../../../utils/incidents-colors";
import "./incident-category-label.scss";

interface Props {
  id: number;
  name: string;
}

export const IncidentCategoryLabel: React.FC<Props> = (props: Props) => {
  
  return (
    <span className={`incident-category color-${colors[props.id]}`}>
      {props.name}
    </span>
  );
};
