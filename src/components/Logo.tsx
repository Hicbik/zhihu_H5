import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import IconZhihu from './iconfont/IconZhihu'

const Logo: FC = () => {
    return (
        <Link to='/' className='logo'>
            <IconZhihu size={80} />
        </Link>
    )
}

export default Logo
