import { useEffect, useState } from "react";
import { UseProjectContext } from "../ProjectContext";

export default function TaskItem({ tasks }) {
  const projectContext = UseProjectContext();
  return (
    <>
      <div className="task">
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>ID</p>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Title</p>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Status</p>
      </div>

      {tasks && (
        <>
          {tasks.map((element) => {
            return (
              <div className="task">
                <p>{element.id}</p>
                <p>{element.title}</p>
                <p>{element.status}</p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
