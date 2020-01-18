import React, { useCallback, useEffect, useRef, useState } from "react";

export function VisibleTrigger({ children }) {
  return <>{children}</>;
}

export function VisibleContent({ children }) {
  return <>{children}</>;
}

export default function VisibleContentWrapper({ children }) {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = useRef();

  const handleClick = useCallback(
    e => {
      const refCheck = toggleVisibility.current;
      if (refCheck && !refCheck.contains(e.target)) setVisible(!visible);
    },
    [visible]
  );

  useEffect(() => {
    if (toggleVisibility.current)
      document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  let count = 0;
  return (
    <>
      {children.map(index => {
        return index.type.name === "VisibleTrigger" ? (
          <div key={count++} type="button" onClick={() => setVisible(!visible)}>
            {index}
          </div>
        ) : index.type.name === "VisibleContent" ? (
          <div key={count++} ref={visible ? toggleVisibility : null}>
            {visible ? index : null}
          </div>
        ) : (
          index
        );
      })}
    </>
  );
}
