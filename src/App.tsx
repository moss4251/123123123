import React, { useState } from 'react';
import { Page1Forest } from './components/Page1Forest';
import { Page2Explore } from './components/Page2Explore';
import { Page3Division } from './components/Page3Division';
import { Page4Summary } from './components/Page4Summary';
import { playPageTurn } from './utils/sound';

export default function App() {
  const [page, setPage] = useState<number>(1);

  const goToPage = (target: number) => {
    playPageTurn();
    setPage(target);
  };

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#f6f1e4]">
      {page === 1 && <Page1Forest onNext={() => goToPage(2)} />}
      {page === 2 && (
        <Page2Explore onPrev={() => goToPage(1)} onNext={() => goToPage(3)} />
      )}
      {page === 3 && (
        <Page3Division onPrev={() => goToPage(2)} onNext={() => goToPage(4)} />
      )}
      {page === 4 && (
        <Page4Summary onPrev={() => goToPage(3)} onRestart={() => goToPage(1)} />
      )}
    </main>
  );
}
