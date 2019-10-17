/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

const showModal = () => {
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible(!visible);
  }

  return {
    visible,
    toggle,
  }
};

export default showModal;
