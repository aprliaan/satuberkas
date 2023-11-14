import { useState } from 'react';

function useSelectChange(initialSelection) {
  const [selectedValue, setSelectedValue] = useState(initialSelection);

  function handleSelectChange(newValue) {
    setSelectedValue(newValue.value);
  }

  return [selectedValue, handleSelectChange];
}

export default useSelectChange;