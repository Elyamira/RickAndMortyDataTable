// import React from 'react';
import './App.css';
import Table from './components/Table';
import Header from './components/Header';
function App() {
  return (
    <div className="App bg-white w-11/12 mx-auto">
      <header className="App-header">
        <Header />
      </header>
      <Table />
    </div>
  );
}

export default App;
