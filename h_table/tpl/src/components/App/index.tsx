import Table from '../UI/Table';
//
import { useAppState } from '../../hooks/useAppState';

const App = () => {
    const state = useAppState();

    return <Table state={state} />;
};

export default App;
