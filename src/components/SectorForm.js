/* eslint-disable  */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postformData, postFormUpdate } from '../redux/reducers/formPost';

import { getuserPreference } from '../redux/reducers/formPost';

import Selector from './Selector';

export default function SectorFrom() {
  const preference = useSelector((state) => state.formPost);
  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Manufacturing');
  // const [selectedOptionId, setSelectedOptionId] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getuserPreference());
  }, []);

  useEffect(() => {
    setName(preference.name);
    setSelectedOption(preference.sector);
    setIsChecked(preference.terms);
  }, [preference]);

  const nameIsValid = name.trim() !== '';
  const nameInputIsInvalid = !nameIsValid && nameTouched;

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setNameTouched(true);
  };

  const handleSelectChange = (event) => {
    // setSelectedOptionId(event.target.selectedOptions[0].id);
    setSelectedOption(event.target.value);
  };

  const handleTermsChange = (event) => {
    setIsChecked(event.target.checked);

    if (isChecked) {
      setError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setNameTouched(true);
    if (!nameIsValid || !isChecked) {
      setError('Please agree to the terms to continue');
      return;
    }
    const formData = {
      name,
      sector: selectedOption,
      terms: isChecked,
    };

    if (preference.id) {
      dispatch(postFormUpdate(formData));
    } else {
      dispatch(postformData(formData));
    }

    setSuccess(true);

    setName('');
    setNameTouched(false);
    setSelectedOption('Manufacturing');
    setIsChecked(false);
  };

  const nameInputClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={handleSubmit}>
      <h3>
        Please enter your name and pick the Sectors you are currently involved
        in.
      </h3>
      <div className={nameInputClasses}>
        <div>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              value={name || preference.name}
              onChange={handleNameChange}
              onBlur={nameInputBlurHandler}
            />
          </label>
          {nameInputIsInvalid && (
            <p className="error-text">Name can't be blank.</p>
          )}
        </div>
        <label htmlFor="selectors">
          Sectors:
          <Selector
            value={selectedOption || preference.sector}
            onChange={handleSelectChange}
            // sector_id={id}
            id="sectors"
          />
        </label>

        <div>
          <label htmlFor="terms">
            Agree to terms
            <input
              type="checkbox"
              id="terms"
              checked={isChecked}
              onChange={handleTermsChange}
            />
          </label>
          {error && <p className="error-text">{error}</p>}
        </div>
      </div>
      <div className="form-submit">
        <button type="submit" id="save">
          Save
        </button>
      </div>
      {success && (
        <p className="success">Your input has been successfully submitted</p>
      )}
    </form>
  );
}
