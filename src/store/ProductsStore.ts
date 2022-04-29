import { observable, action, makeObservable } from "mobx";
import { IProduct } from "../interfaces/Product";
import { getProducts } from "../requests/api";

export class ProductsStore {
    @observable products: any = [];
    @observable filteredProducts: any = [];
    @observable search: string = '';
    @observable viewType: number = 0;
    @observable sortBy: any = 0;
    @observable priceRange: number | number[] = [0, 2000];
    @observable reviewFilter: number = 1.5;
    @observable watchCount: number = 0;

    constructor() {
        makeObservable(this);
    }

    filterResult = () => {
        this.filteredProducts = this.products;

        // Search Filter
        if (this.search !== '') {
            this.filteredProducts = this.filteredProducts.filter((product: IProduct) => {
                if (product.description.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) !== -1 || product.price.toString().indexOf(this.search) !== -1) {
                    return true;
                }
                return false;
            })
        } else {
            this.filteredProducts = this.products;
        }

        // Price Range
        this.filteredProducts = this.filteredProducts.filter((product: IProduct) => {
            let from = (this.priceRange as number[])[0];
            let to = (this.priceRange as number[])[1];
            if (product.price > from && product.price < to) {
                return true;
            }
            return false;
        })

        // Review Filter
        this.filteredProducts = this.filteredProducts.filter((product: IProduct) => {
            if (product.rate > this.reviewFilter) {
                return true;
            }
            return false;
        })

        // Sort By
        switch (this.sortBy) {
            case "low":
                this.filteredProducts.sort((a: IProduct,b: IProduct) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
                break;
            case "high":
                this.filteredProducts.sort((a: IProduct,b: IProduct) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0))
                break;
            case "rate":
                this.filteredProducts.sort((a: IProduct,b: IProduct) => (a.rate < b.rate) ? 1 : ((b.rate < a.rate) ? -1 : 0))
                break;
        }
    }

    @action
    getProducts = async () => {
        return getProducts().then((res: any) => {
            if (res.status === 200) {
                this.products = res.data;
                this.filteredProducts = res.data;
            } else {
                this.products = [];
            }
        }).catch(err => {
            this.products = [];
        })
    }

    @action
    setSearch = (text: string) => {
        this.search = text;
        this.filterResult();
    }

    @action
    setViewType = (type: number) => {
        this.viewType = type;
    }

    @action
    setSortBy = (type: string) => {
        this.sortBy = type;
        this.filterResult();
    }

    @action
    setPriceRange = (range: number | number[]) => {
        this.priceRange = range;
        this.filterResult();
    }

    @action
    setReviewFilter = (num: number | null) => {
        this.reviewFilter = num ?? 1.5;
        this.filterResult();
    }

    @action
    updateWatchList = () => {
        let count = 0
        let data = localStorage.getItem('a_watchlist');
        if (data) {
            count = JSON.parse(data).length
        }
        this.watchCount = count;
    }
}
