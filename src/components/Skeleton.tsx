// I recc using the above as a good baseline, if you want to extend it you can via props + custom CSS overrides
// Could also just do a div with animate-pulse bg-gray-500 but sheen looks better imo

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Skeleton.css' // optionally override provided styles

/**
 * @see https://www.npmjs.com/package/react-loading-skeleton
 */
const SkeletonSheen = () => (
  <SkeletonTheme
    baseColor='#202020'
    highlightColor='#444'
    duration={1.25}
  >
    <Skeleton />
  </SkeletonTheme>
)

export default SkeletonSheen
