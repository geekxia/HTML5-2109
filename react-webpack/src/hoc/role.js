import React from 'react'

export default function role(WrappedComponent) {
  return props => (
    <WrappedComponent {...props} role='ceo' />
  )
}

// export default W => (props => {
//   // do something
//   return (
//     <>
//       <W {...props} role='admin' />
//     </>
//   )
// })
