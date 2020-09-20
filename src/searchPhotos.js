import React from "react";
import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
})

export default function SearchPhotos() {
  const [query, setQuery] = React.useState("");
  const [pictures, setPictures] = React.useState([]);

  const searchPhotos = async (e) => {
    e.preventDefault()

    unsplash.search
      .photos(query)
      .then(toJson)
      .then((json) => {
        return setPictures(json.results)
      });
  }

  return (
    <div>
      <form
        className="form"
        onSubmit={searchPhotos}
      >
        <label className="label" htmlFor="query">
          {" "}
          📷
        </label>

        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "dog" or "apple"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
        {pictures.map((pic) => (
          <div className="card" key={pic.id}>
            <img
              className="card--image"
              alt={pic.alt_description}
              src={pic.urls.full}
              width="50%"
              height="50%"
            ></img>
          </div>
        ))}{" "}
      </div>
    </div>
  );
}
