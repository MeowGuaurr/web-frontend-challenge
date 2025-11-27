import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type IconProps = {
  name: IconDefinition;
  className?: string;
};

const Icon: React.FC<IconProps> = ({ name, className }) => {
  return <FontAwesomeIcon icon={name} className={className} />;
};

export default Icon;
