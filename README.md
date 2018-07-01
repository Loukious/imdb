IMDb [![CircleCI](https://circleci.com/gh/mhsjlw/imdb.svg?style=svg)](https://circleci.com/gh/mhsjlw/imdb)
====

An IMDb interface for Node

```typescript
import { IMDb, Movie } from '../src'

async function example(): Promise<Movie> {
  let i = new IMDb()
  let movie = await i.getMovie('tt3501632') // Thor: Ragnarok
  return movie
}

example()
  .then((movie) => console.log(movie.getTitle()))
  .catch((e) => console.error(e))
```
