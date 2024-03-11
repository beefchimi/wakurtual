'use client';

import {useState} from 'react';
import {Button} from '../Button/index.js';

export function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount((current) => current + 1);
  }

  return <Button label={count} onClick={handleIncrement} />;
}
