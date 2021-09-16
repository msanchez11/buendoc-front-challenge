import Header from './components/Header';
import Content from './components/Content';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <Content />
      </div>
    </QueryClientProvider>
  );
}

export default App;
