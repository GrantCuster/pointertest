import "./App.css";
import { useEffect, useState } from "react";

function App() {
  let [pointer, setPointer] = useState({
    touches: [],
  });

  function getPosition(e) {
    var x = e.clientX;
    var y = e.clientY;
    return [x, y];
  }

  function handleSet(key, value) {
    let p = Object.assign({}, pointer);
    p[key] = value;
    setPointer(p);
  }

  useEffect(() => {
    function pointerDown(e) {
      let touches = pointer.touches.slice();
      if (!touches.includes(e.pointerId))
        touches.push({
          id: e.pointerId,
          x: Math.round(e.clientX),
          y: Math.round(e.clientY),
        });
      handleSet("touches", touches);
    }
    function pointerMove(e) {
      let touches = pointer.touches.slice();
      let idx = touches.map((o) => o.id).indexOf(e.pointerId);
      if (idx >= 0) {
        touches[idx].x = Math.round(e.clientX);
        touches[idx].y = Math.round(e.clientY);
      }
      handleSet("touches", touches);
    }
    function pointerUp(e) {
      let touches = pointer.touches.slice();
      let idx = touches.map((o) => o.id).indexOf(e.pointerId);
      touches.splice(idx, 1);
      handleSet("touches", touches);
    }

    document.addEventListener("pointermove", pointerMove);
    document.addEventListener("pointerdown", pointerDown);
    document.addEventListener("pointerup", pointerUp);
    return () => {
      document.removeEventListener("pointermove", pointerMove);
      document.removeEventListener("pointerdown", pointerDown);
      document.removeEventListener("pointerup", pointerUp);
    };
  }, [pointer]);

  return (
    <div id="App" style={{ userSelect: "none" }}>
      {Object.keys(pointer).map((key) => (
        <div>
          {key} {JSON.stringify(pointer[key])}
        </div>
      ))}
    </div>
  );
}

export default App;
