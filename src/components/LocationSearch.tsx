import { Fragment, useState } from 'react';
import type { Place } from '../api/Place';
import { search } from '../api/search';

interface Props {
  onPlaceClick: (place: Place) => void;
}

const LocationSearch = ({ onPlaceClick }: Props) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [term, setTerm] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const results = await search(term);
    setPlaces(results);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="term" className="font-bold"></label>
        <input
          type="text"
          className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 px-4 py-2 w-full outline-indigo-500"
          value={term}
          id="term"
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>

      <h1 className="font-bold mt-6">Found Locations</h1>
      <div className="grid grid-cols-[1fr_40px] gap-2 mt-2 items-center">
        {places.map((place) => {
          return (
            <Fragment key={place.id}>
              <p className="text-sm">{place.name}</p>
              <button
                onClick={() => onPlaceClick(place)}
                className="bg-blue-500 text-xs text-white font-bold py-1 px-1 rounded "
              >
                Go
              </button>
              <div className="border-b w-full col-span-2" />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LocationSearch;
