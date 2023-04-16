import React, { useState } from "react";

export default function MainLayout() {
  //   const count = 1;
  let [count, setCount] = useState(0);
  const onclicks = () => {
    count += 1
    setCount(count);
    console.log("test", count += 1);
  };

  return (
    <>
      <h1>Hello Lee!</h1>
      <br />
      <h5>{count}</h5>
      <button onClick={onclicks}>Increment</button>
    </>
  );
}
