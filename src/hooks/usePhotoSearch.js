import React from 'react'
import Unsplash, { toJson } from "unsplash-js";
import debounce from "debounce";

const unsplash = new Unsplash({
  accessKey: "J0F99hx6CNc_CnUm08Dt5mfTVo6-8vwO5vdT1Ltkbng",
})

export default function usePhotoSearch({ query, pageNumber }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(false);
  const [photos, setPhotos] = React.useState([]);
  
  React.useEffect(() => {
    setPhotos([]);
  }, [query]);

  React.useEffect(() => {
    setLoading(true);
    setError(false);
    
    const debouncedQuery = debounce(() => {
      unsplash.search
      .photos(query, pageNumber)
      .then(toJson)
      .then((data) => {
        setPhotos(prevPhotos => {
          return [...prevPhotos, ...data.results]
        })
        setHasMore(data.results.length > 0)
        setLoading(false)
      })
    }, 2000)
    debouncedQuery()
  }, [query, pageNumber])

  return { photos, loading, error, hasMore}
}
