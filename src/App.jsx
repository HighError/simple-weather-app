import React from 'react';

function App() {
  return (
    <>
      <div className="rain absolute top-0 left-0 right-0 bottom-0" />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-3">
        <div className="text-[24px] font-medium">Ukraine, Ternopil</div>
        <div className="text-[96px] font-bold">13°C</div>
        <div className="flex flex-col items-center">
          <div className="">31.03.2023</div>
          <div className="">Сонячно</div>
        </div>
      </div>
    </>
  );
}

export default App;
