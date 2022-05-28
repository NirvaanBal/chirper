import { useState } from 'react';

function Search() {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search-field">
      <form>
        <input
          type="text"
          id="search"
          placeholder="Search users..."
          onChange={handleChange}
          value={searchValue}
        />
      </form>
    </div>
  );
}

export default Search;
