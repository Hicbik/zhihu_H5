import React, {FC, useState, Fragment, useEffect} from 'react'
import {Wrapper} from './style'
import Header from './components/Header'
import HotSearch from './components/HotSearch'
import SearchHistory from './components/SearchHistory'
import Result from './components/Result'

const Search: FC = () => {

    const [value, setValue] = useState('')
    const [show, setShow] = useState(true)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!value.length) setShow(true)
        // eslint-disable-next-line
    }, [value])


    const _onTapHistory = (historyValue: string) => {
        setValue(historyValue)
        setShow(false)
        setCount(prevState => prevState + 1)
    }

    return (
        <Wrapper>
            <Header value={value} setValue={setValue} setShow={setShow} setCount={setCount} />
            {
                show && (
                    <Fragment>
                        <HotSearch />
                        <SearchHistory onTapHistory={_onTapHistory}/>
                    </Fragment>
                )
            }
            {!show && <Result value={value} count={count} />}
        </Wrapper>
    )
}

export default Search
