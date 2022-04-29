import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box, Slider, Alert, AlertTitle } from '@mui/material';
import { observer, useObserver } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/Product';
import { useRootStore } from '../../store/RootStateContext';
import { getWatchList } from '../../utils/watch-manager';
import FilterBar from '../FilterBar/FilterBar';
import ListGrid from '../ListGrid/ListGrid';
import Product from '../Product/Product';
import Related from '../Related/Related';
import './Main.css';

const Main = observer(() => {

    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const { productsStore } = useRootStore();
    const watchList = getWatchList();

    const handleChangeSortBy = (event: SelectChangeEvent) => {
        setSortBy(event.target.value as string);
        productsStore.setSortBy(event.target.value)
    };

    const checkWatchStatus = (product: IProduct): boolean => {
        if (watchList.find((e: IProduct) => e.id == product.id)) {
            return true;
        }
        return false;
    }

    useEffect((): any => {
        let mounted = true;
        productsStore.getProducts().then((res) => {
            setProducts(productsStore.filteredProducts);
        });
        return () => mounted = false;
    }, [])

    return useObserver(() => (
        <main>
            <div className="filter-bar">
                <FilterBar />
            </div>
            <div className="products-list">
                <div className="filters">
                    <div className="_r">
                        <FormControl size="small" style={{ width: '126px' }}>
                            <InputLabel>Sort By</InputLabel>
                            <Select value={sortBy} label="Sort By" onChange={handleChangeSortBy}>
                                <MenuItem value={'low'}>Low Price</MenuItem>
                                <MenuItem value={'high'}>High Price</MenuItem>
                                <MenuItem value={'rate'}>Rating</MenuItem>
                            </Select>
                        </FormControl>
                        <ListGrid />
                    </div>

                    <Related />
                </div>
                <div className={productsStore.viewType === 0 ? 'view' : 'view list'}>
                    {
                        productsStore.filteredProducts.length ?
                            productsStore.filteredProducts.map((product: IProduct) => {
                                let isWatch = checkWatchStatus(product);
                                return (
                                    <Product key={product.id} product={product} isWatch={isWatch} />
                                )
                            })
                            :
                            <Alert variant="outlined" severity="info" style={{width: '100%'}}>
                                <AlertTitle>No Results..</AlertTitle>
                                Please try different filters... 
                            </Alert>
                    }
                </div>
            </div>
        </main>
    ));
})

export default Main;