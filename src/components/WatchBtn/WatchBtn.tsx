import { useObserver } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useRootStore } from "../../store/RootStateContext";

const WatchBtn = () => {
    const { productsStore } = useRootStore();
    
    return useObserver(() => (
        <>
            <div className="watch-btn">
                <button>Watch</button>
                {productsStore.watchCount ? <span className="count-label">{productsStore.watchCount}</span> : ''}
            </div>
        </>
    ))
}

export default WatchBtn;