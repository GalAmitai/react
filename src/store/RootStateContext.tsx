import React from 'react';
import { ProductsStore } from './ProductsStore';

type RootStateContxetValue = {
    productsStore: ProductsStore
}

const RootStateContext = React.createContext<RootStateContxetValue>({} as RootStateContxetValue);
const productsStore = new ProductsStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return <RootStateContext.Provider value={{ productsStore }}>{children}</RootStateContext.Provider>
}

export const useRootStore = () => React.useContext(RootStateContext)