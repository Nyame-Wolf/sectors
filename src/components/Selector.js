// /* eslint-disable */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOptions } from '../redux/reducers/options';

import './SectorForm.css';

export default function Selector() {
  const dispatch = useDispatch();
  const options = useSelector((state) => state.options.data);

  useEffect(() => {
    dispatch(getOptions());
  }, []);
  console.log(options);
  return (
    <label htmlFor="selectors">
      Sectors:
      <select>
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}
