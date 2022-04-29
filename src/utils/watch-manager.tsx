import { IProduct } from "../interfaces/Product"

export const addToWatch = (product: IProduct) => {
    let a_watchlist = localStorage.getItem('a_watchlist');
    if (a_watchlist) {
        let obj = JSON.parse(a_watchlist);
        // if exist == do nothing.
        let index = obj.find((o: any) => o.id === product.id);
        if (!index) {
            obj.push(product);
            window.localStorage.setItem('a_watchlist', JSON.stringify(obj))
        } else {
            let newObj = obj = obj.filter((item: any) => {
                return item.id !== product.id;
            });
            window.localStorage.setItem('a_watchlist', JSON.stringify(newObj))
        }
    } else {
        window.localStorage.setItem('a_watchlist', JSON.stringify([product]))
    }
}

export const getWatchList = () => {
    const list = localStorage.getItem('a_watchlist');
    if(list) {
        return JSON.parse(list);
    }
    return [];
}