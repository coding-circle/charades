import React from "react";
import "./PointedAt.css";

function PointedAt({ color, pointer, pointee, username }) {
  const pointedAtYou = pointee === username;

  const pointedAtIcon = pointedAtYou ? "☚" : "☜";

  return (
    <div
      className="pointed-at"
      style={{
        backgroundColor: pointedAtYou ? "#2D9CDB" : color,
        color: pointedAtYou ? "#FFFFFF" : "#333333",
      }}
    >
      <div className="pointed-at__text">
        <h1>{pointer}</h1>
        <h1>is pointing</h1>
        {pointedAtYou ? (
          <>
            <h1>at you,</h1>
            <h1>{pointee}!</h1>
          </>
        ) : (
          <h1>at {pointee}!</h1>
        )}
      </div>
      <div className="pointed-at__icon">{pointedAtIcon}</div>
    </div>
  );
}

export default PointedAt;
