import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

interface WidgetProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const Widgets = ({ heading, value, percent, color, amount }: WidgetProps) => {
  return <article className="widget">
    <div className="widgetInfo">
        <h5>{heading}</h5>
        <h3>{amount?`$${value}`:value}</h3>
        {percent>0?(
            <span className="green">
                <FaArrowTrendUp/>+{`${percent >10000 ? 9999: percent}%`}
            </span>
        ):(
            <span className="red">
                <FaArrowTrendDown/>{`${percent <-10000 ? -9999: percent}%`}
            </span>
        )}
    </div>
    <div className="widgetCircle"  style={{
        // backgroundColor: "pink",
          background: `conic-gradient(
       ${color} ${(Math.abs(percent) / 100) * 360}deg,
      yellow 0
    )`,
        }}>
        <span style={{color}}>
          {percent>0 && `${percent >10000 ? 9999: percent}%`}
          {percent<0 && `${percent <-10000 ? -9999: percent}%`}
          </span>
    </div>



  </article>;

};

export default Widgets;
