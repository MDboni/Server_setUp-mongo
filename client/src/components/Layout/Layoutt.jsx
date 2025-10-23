import React from 'react'
import AppNavbar from './AppNavbar'
import AppFooter from './AppFooter'

const Layoutt = (pros) => {
  return (
    <>
        <AppNavbar></AppNavbar> 

          {pros.children}

        <AppFooter></AppFooter>
    </>
  )
}

export default Layoutt