/* eslint-disable  jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import './SectorForm.css';
import Selector from './Selector';

export default function SectorFrom() {
  const [name, setName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTermsChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name,
      option: selectedOption,
      terms: terms_agreement,
    };
    setName('');
    setSelectedOption('Manufacturing');
    setIsChecked(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </label>
      <label htmlFor="selectors">
        Sectors:
        <Selector
          value={selectedOption}
          onChange={handleSelectChange}
          id="sectors"
        />
      </label>
      <label htmlFor="terms">
        Agree to terms
        <input
          type="checkbox"
          id="terms"
          checked={isChecked}
          onChange={handleTermsChange}
        />
      </label>

      <label htmlFor="save">
        Save
        <input type="submit" id="save" />
      </label>
    </form>
  );
}
