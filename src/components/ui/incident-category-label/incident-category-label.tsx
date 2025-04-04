import "./incident-category-label.scss";

interface Props {
  id: number;
  name: string;
  color: string;
}

export const IncidentCategoryLabel: React.FC<Props> = (props: Props) => {
  return (
    <span
      className={`incident-category`}
      style={{ backgroundColor: props.color }}
    >
      {props.name}
    </span>
  );
};
