import React from "react";
import usePhotoSearch from "./hooks/usePhotoSearch";

export default function SearchPhotos() {
  const [query, setQuery] = React.useState("");
  const [pageNumber, setPageNumber] = React.useState(1);

  const {
    photos,
    loading,
    error,
    hasMore,
  } = usePhotoSearch({ query, pageNumber })

  const observer = React.useRef()
  const lastPhotoElementRef = React.useCallback(node => {
    if (loading) return // we dont need to keep requesting to the api if loading
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])


  const searchPhotos = async (e) => {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <div>
      <form
        className="form"
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
          onChange={searchPhotos}
        />
        {/* <button type="submit" className="button">
          Search
        </button> */}
      </form>
      <div className="card-list">
        {photos.map((photo, index) => {
          if (photos.length === index + 1) {
            return (
              <div ref={lastPhotoElementRef} className="card" key={photo.id + index}>
                <img
                  className="card--image"
                  alt={photo.alt_description}
                  src={photo.urls.full}
                  width="50%"
                  height="50%"
                ></img>
              </div>
            )
          }
          return (
            <div className="card" key={photo.id + index}>
              <img
                className="card--image"
                alt={photo.alt_description}
                src={photo.urls.full}
                width="50%"
                height="50%"
              ></img>
            </div>
          )
        })}{" "}
        <div>{ loading ? 'Loading...' : null }</div>
        <div>{ error ? 'Error...' : null }</div>
      </div>
    </div>
  );
}
