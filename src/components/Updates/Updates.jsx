import React from "react";
import { UpdatesData } from "../data/Data";
import "./Updates.css";
export const Updates = () => {
  return (
    <div className="Updates">
      {UpdatesData.map((update) => {
        return (
          <div className="update">
            <img src={update.img} alt="" />
            <div className="noti">
              <div style={{marginBottom:'0.5rem'}}>
                <span>{update.name}</span>
                <span>{update.noti}</span>
              </div>
            </div>
            <div>
              <span>{update.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
