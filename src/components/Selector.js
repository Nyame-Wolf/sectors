/* eslint-disable */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOptions } from '../redux/reducers/options';

export default function Selector({ value, onChange, sector_id }) {
  const dispatch = useDispatch();

  const options = useSelector((state) => {
    // transform list of sectors to object of sectors keyed by sector.id
    const { data } = state.options;
    return data.reduce((industries, sector) => {
      if (!industries[sector.id]) {
        industries[sector.id] = sector;
      }
      return industries;
    }, {});
  });

  useEffect(() => {
    dispatch(getOptions());
  }, []);

  // Render a number of spaces
  const renderSpaces = (depth) =>
    Array.from({ length: depth }).map(() => <>&nbsp;</>);

  const renderSector = (sectors, sector, depth) => {
    const child = (
      <option key={sector.id} value={sector.name} id={sector.id}>
        {renderSpaces(depth * 4)}
        {sector.name}
      </option>
    );

    // if sector does not have subsectors render the sector
    if (!sector.sub_sectors.length) {
      return child;
    }

    // else if it has subsectors recursively render the children(subsectors),
    // with an appropriate depth to indicate the subsector depth in the tree.
    const children = sector.sub_sectors.map((s) =>
      renderSector(sectors, sectors[s.id], depth + 1)
    );

    // flatten the parent sector and children subsector to the
    // same level since they are both options
    return [child, ...children];
  };
  return (
    <select value={value} onChange={onChange} size="5">
      {Object.keys(options).map((id) => {
        const sector = options[id];
        if (sector.sector_id) {
          return null;
        }
        return renderSector(options, options[id], 0);
      })}
    </select>
  );
}
