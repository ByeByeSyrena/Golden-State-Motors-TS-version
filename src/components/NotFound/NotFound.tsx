import React from "react";

const NotFound: React.FC = () => {
  return (
    <div style={{ width: "600px", height: "400px", margin: "0 auto" }}>
      <img
        src={require("../../images/resultsnotfound.png")}
        alt="Results weren't found, please try later"
      />
    </div>
  );
};

export default NotFound;
