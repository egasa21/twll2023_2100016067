import React from "react";
import "./card.css";
import "react-circular-progressbar/dist/styles.css";
import { motion, LayoutGroup } from "framer-motion";


const Card = (props) => {
  return (
    <LayoutGroup>

      <CompactCard param={props}/>

    </LayoutGroup>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
  const Png = param.png;
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        <Png />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <span>Total</span>
        <span>{param.value}</span>

      </div>
    </motion.div>
  );
}

export default Card;
