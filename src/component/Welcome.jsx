import React from 'react';

export const Welcome = (props) => {
  const user = localStorage.getItem('userName');
  // let details=localStorage.getItem("op1");
  // details+=localStorage.getItem("op2");
  // console.log(details);
  return (
    <>
      <div id="welcome">Welcome {user}</div>
      <p>This is home page</p>
      {/* <p>{details}</p> */}
    </>
  );
};
