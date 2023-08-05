import React, { useState } from 'react';
import Button from './components/Button';
import UnoGame from './components/UnoGame';

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div>
      <UnoGame></UnoGame>
    </div>
  );
};

export default App;
