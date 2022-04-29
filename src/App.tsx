import './App.css';
import { useObserver } from 'mobx-react-lite';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { useRootStore } from './store/RootStateContext';
import { useEffect } from 'react';

const App = () => {
  const { productsStore } = useRootStore();

  useEffect(() => {
    productsStore.updateWatchList();
  }, []);

  return useObserver(() => (
    <div className="container">
      <Header />
      <Main />
    </div>
  ));
}

export default App;
