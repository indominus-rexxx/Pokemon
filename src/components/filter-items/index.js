import React, { useEffect, useState } from "react";

import './style.scss';

export const FilterItems = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        onSearch(keyword)
    }, [onSearch, keyword]);

    return (
        <div className={'fixed-panel'}>
            <input className='filter-items'
                   type='text'
                   placeholder='search...'
                   onChange={e => setKeyword(e.target.value)}
                   value={keyword}/>
        </div>
    )
}