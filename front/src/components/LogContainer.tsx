import React, { useEffect, useRef } from 'react';

const LogContainer = (data:{logs:string}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [data.logs]);

  return (
    <div
      ref={containerRef}
      style={{
        maxHeight: '300px',
        overflowY: 'scroll',
        border: '1px solid #ccc',
        padding: '10px',
      }}
    >
      <h4>{data.logs}</h4>
    </div>
  );
};

export default LogContainer;
