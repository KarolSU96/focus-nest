import { useEffect, useState, useRef } from "react";

function useClickOutsideToggle() {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  // Hook checks if referenced item has been assigned to ref var current att, then if user clicked outside of referenced button, setExpand to false which closes dropdown menu.
  // After that add the event listener and set handleClickOutside as it's callback. After that it run cleanup function.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);
  return { expanded, setExpanded, ref };
}

export default useClickOutsideToggle;
