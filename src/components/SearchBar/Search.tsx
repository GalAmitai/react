import { useObserver } from "mobx-react-lite";
import { useState } from "react";
import { useRootStore } from "../../store/RootStateContext";
import './Search.css';

const SearchBar = () => {

    const { productsStore } = useRootStore();
    const [text, setText] = useState('');

    const clearInput = () => {
        setText('');
        productsStore.setSearch('');
    }

    const handleChange = (text: any) => {
        setText(text);
        productsStore.setSearch(text);
    }

    return useObserver(() => (
        <div className="search-bar">
            <img src="/img/icons/search.svg" className="search-icon" alt="search" />
            <input type="text" id="search" placeholder="Search..." value={text} onChange={(e) => handleChange(e.target.value)}/>
            { text ? <img src="img/icons/x.svg" className="search-clear" alt="search" onClick={() => clearInput()}/> : '' }
        </div>
    ))
}

export default SearchBar;