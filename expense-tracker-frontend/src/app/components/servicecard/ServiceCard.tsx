import { CustomComponentProps } from "../services/Service";
import "./serviceCard.css";

const ServiceCard : React.FC<CustomComponentProps> = ({...customProps}) => {
  const Icon = customProps.icon;
  return (
    <div className={`bg-white w-[30rem] h-[20rem] flex flex-col items-center justify-center space-y-[2rem] rounded-md border-b-[0.5rem] hover:bg-[#001732] hover-text card-cont`} style={{borderColor: customProps.colorDark}}>
        <div className={`text-[5rem] w-[7rem] h-[7rem] rounded-md flex flex-col justify-center items-center card-icon`} style={{color:customProps.colorDark, background:customProps.colorLight}} id="icon_bg">
        {Icon && <Icon />}
        </div>
        <p className="text-[#001732] text-[2rem] card-title">{customProps.title}</p>
    </div>
  )
}

export default ServiceCard