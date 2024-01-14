import { IconType } from "react-icons";
import { AiOutlineFall } from "react-icons/ai";
import { AiOutlineRise } from "react-icons/ai";
import { TbCategoryPlus } from "react-icons/tb";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import { FaReceipt } from "react-icons/fa";
import ServiceCard from "../servicecard/ServiceCard";
import "./service.css";

export interface CustomComponentProps {
    title: string;
    colorDark: string;
    colorLight: string;
    icon: IconType;
}

const Service :React.FC = () => {

    const serviceList: CustomComponentProps[]=[
        {
            title: "Track Incomes",
            colorDark: "#09DA4D",
            colorLight: "#CEFDDF",
            icon: AiOutlineRise
        },
        {
            title: "Track Expenses",
            colorDark: "#f7020f",
            colorLight: "#f5c1c4",
            icon: AiOutlineFall
        },
        {
            title: "Transaction Categorization",
            colorDark: "#F68B08",
            colorLight: "#FDE3C4",
            icon: TbCategoryPlus
        },
        {
            title: "Budget Management",
            colorDark: "#2DB5FA",
            colorLight: "#DBF3FE",
            icon: BsFileEarmarkBarGraph
        },
        {
            title: "Financial Insights",
            colorDark: "#B50DDF",
            colorLight: "#F8E4FD",
            icon: VscGraphLine
        },
        {
            title: "Receipt Capture",
            colorDark: "#F51F9C",
            colorLight: "#FEECF7",
            icon: FaReceipt
        }
    ];

  return (
    <div className="service-bg p-[4rem] service-cont">
        <p className="text-[#768999] text-center service-ask">WHY CHOOSE IT?</p>
        <p className="text-white text-center text-[3rem] service-title">Why Expense Tracker is More Preferable !</p>
        <div className="flex flex-row flex-wrap items-center justify-center gap-x-[2rem] gap-y-[2rem] mt-[5rem] service-cards">
            {
                serviceList.map((service, index)=>{
                    return <ServiceCard key={index} {...service} />
                })
            }
        </div>
    </div>
  )
}

export default Service