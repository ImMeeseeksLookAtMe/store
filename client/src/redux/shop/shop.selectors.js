import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = memoize(collectionUrlParam => 
    createSelector(
    [selectCollections],    
    collections => (collections ? collections[collectionUrlParam] : null)
  )
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections // !!{} = true, !!null || !!'' || !!0 = false
)
/* MEMOIZE
If using npm:

npm install lodash.memoize


And to use it, we import our newly installed memoize helper function at the top of shop.selectors.jsx 
like so:

import memoize from 'lodash.memoize';
And just wrap our selectCollection function with memoize like so:

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  )
);
Memoize does the same idea of memoization as reselect does for our selectors, 
except this time we're memoizing the return of our function which returns our selector:

(collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
 )
By wrapping this function is memoize, we're saying that whenever this 
function gets called and receives collectionUrlParam, I want to memoize the 
return of this function (in this case we return a selector). If this function gets 
called again with the same collectionUrlParam, don't rerun this function because we'll return 
the same value as last time, which we've memoized so just return the selector that's been stored.
*/