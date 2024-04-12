import { Outlet } from 'react-router-dom'

import React from 'react'

const Layout = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default Layout