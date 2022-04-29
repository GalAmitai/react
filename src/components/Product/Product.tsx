import { observer, useObserver } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/Product';
import { useRootStore } from '../../store/RootStateContext';
import { addToWatch } from '../../utils/watch-manager';
import Rating from '../Rating/Rating';
import './Product.css';

interface IProductProps {
    product: IProduct;
    isWatch: boolean;
}
const Product = (props: IProductProps) => {
    const { product, isWatch } = props;
    const { productsStore } = useRootStore();
    const [watchActive, setWatchActive] = useState(isWatch);

    const handlaWatch = (product: IProduct) => {
        if (watchActive) {
            setWatchActive(false);
        } else {
            setWatchActive(true);
        }
        addToWatch(product);
        productsStore.updateWatchList()
    }

    return useObserver(() => (
        <div className="product">
            <div className="product-image">
                <img src={product.image} alt="product1" />
            </div>
            <div className="description">
                {product.description}
            </div>
            <div className="price">
                ${product.price}
            </div>
            <div className="sub-desc">
                Eligible for nothing :(
            </div>
            <div className="actions">
                <Rating rate={product.rate} />
                <button className={watchActive ? "watch-btn watch" : "watch-btn"} onClick={() => handlaWatch(product)}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.07 11.585L7 11.655L6.923 11.585C3.598 8.56801 1.4 6.57301 1.4 4.55001C1.4 3.15001 2.45 2.10001 3.85 2.10001C4.928 2.10001 5.978 2.80001 6.349 3.75201H7.651C8.022 2.80001 9.072 2.10001 10.15 2.10001C11.55 2.10001 12.6 3.15001 12.6 4.55001C12.6 6.57301 10.402 8.56801 7.07 11.585ZM10.15 0.700012C8.932 0.700012 7.763 1.26701 7 2.15601C6.237 1.26701 5.068 0.700012 3.85 0.700012C1.694 0.700012 0 2.38701 0 4.55001C0 7.18901 2.38 9.35201 5.985 12.621L7 13.545L8.015 12.621C11.62 9.35201 14 7.18901 14 4.55001C14 2.38701 12.306 0.700012 10.15 0.700012Z" fill="#2979FF" />
                    </svg>
                    Watch
                </button>
            </div>
        </div>
    ))
}

export default Product;