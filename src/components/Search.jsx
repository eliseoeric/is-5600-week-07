import React from 'react';

export default function Search({ handleSearch, placeholder }) {
  const [search, setSearch] = React.useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  return (
    <div className="w-100 flex justify-center mt3 mb3">
      <form
        className="black-80"
        onSubmit={handleSubmit}
        style={{ width: '40%' }}
      >
        <fieldset className="bn ma0 pa0">
          
          <small className="f6 black-60 db mb1 text-center">
            Enter a keyword to filter by tags
          </small>

          <div className="flex">
            <input
              type="text"
              value={search}
              onChange={handleChange}
              placeholder={placeholder || 'Tag Search'}
              className="f6 f5-l input-reset flex-auto black-80 ba b--black-20 bg-white pa3 lh-solid br2-ns br--left-ns text-center"
            />
            <input
              type="submit"
              value="Search"
              className="f6 f5-l button-reset pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer pa3 br2-ns br--right-ns"
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
