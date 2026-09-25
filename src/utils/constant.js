export const NETFLIX_LOGO_SVG =
  "https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAdEhm1UzVexHjKqFOP9W6E2UVtkWFvL-vdxIEbTU81rsqNuPmDDy_dQvmQ85ath49JBruVV4aGQA3gY2Dl5SiqFf-AEwPAZBTNkW8FMxGXpDN2mHrf8KlRRiddj1P422ZW1eZkZNWLTd.svg";

export const PROFILE_URL =
  "https://i.pinimg.com/1200x/2f/3f/02/2f3f0210ddd06dcb863a689d93e99345.jpg";

export const NETFLIX_BG_IMG =
  "https://assets.nflxext.com/ffe/siteui/vlv3/4263c437-c678-4724-ad80-e3ba0dc8761e/web/IN-en-20260921-TRIFECTA-perspective_95810136-2c4a-4ab4-a323-50418521e261_large.jpg";

export const TMDB_BASE_URL = "https://api.themoviedb.org/3/movie/";

export const TMDB_IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";
export const TMDB_API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_ACCESS_TOKEN,
  },
};
