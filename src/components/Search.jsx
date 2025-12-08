import React from "react";

export default function Search({ handleSearch }) {
  const [search, setSearch] = React.useState("");

  const handleChange = (e) => setSearch(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search.toLowerCase());
  };

  return (
    <form className="pt3 pb2 black-80" onSubmit={handleSubmit}>
      <fieldset className="cf bn ma0 pa0">
        <div className="cf measure mb2">
          <input
            className="f6 input-reset fl black-80 ba b--black-20 bg-white pa2 lh-solid w-70 br2 br--left"
            placeholder="Tag Search"
            value={search}
            onChange={handleChange}
            type="text"
          />
          <input
            className="f6 button-reset fl pv2 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-30 br2 br--right"
            type="submit"
            value="Search"
          />
        </div>
        <small className="f6 black-60 db">Enter a keyword to filter by tags</small>
      </fieldset>
    </form>
  );
}
