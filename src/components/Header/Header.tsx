import { useState } from 'react';
import WatchListDialog from '../common/Watchlist-Dialog';
import Logo from '../Logo/Logo';
import SearchBar from '../SearchBar/Search';
import WatchBtn from '../WatchBtn/WatchBtn';
import './Header.css';

const Header = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <header>
                <div className="left_panel">
                    <Logo />
                    <SearchBar />
                </div>
                <div className="right_panel">
                    <div className="watch-btn" onClick={() => handleClickOpen()}>
                        <WatchBtn />
                    </div>
                    <div className="user-avatar">
                        <img src="img/user.png" alt="user-avatar" />
                    </div>
                </div>
            </header>
            <SearchBar />
            <WatchListDialog open={open} onClose={handleClose} />
        </>
    )
}

export default Header;