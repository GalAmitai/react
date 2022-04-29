import { useObserver } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useRootStore } from '../../store/RootStateContext';
import './ListGrid.css';

const ListGrid = () => {
    // 0 = grid
    // 1 = list
    const { productsStore } = useRootStore();
    const [type, setType] = useState(0);

    useEffect(() => {
        productsStore.setViewType(type);
    },[type])

    return useObserver(() => (
        <>
            <div className="list-options">
                <button onClick={() => setType(0)} className={type === 0 ? 'active' : ''}><img src="/img/icons/view-grid.svg" /></button>
                <button onClick={() => setType(1)} className={type === 1 ? 'active' : ''}><img src="/img/icons/view-list.svg" /></button>
            </div>
        </>
    ))
}

export default ListGrid;