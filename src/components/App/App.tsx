import React from 'react';
import style from './App.module.scss';
import FilterList from '../FilterList';
import TicketList from '../TicketList';
import logo from '../../icon/Logo.png';
import Pagination from '../Pagination';
import TabList from '../TabList/TabList';

const App = () => {
    return (
        <section className={style.app}>
            <header>
                <img src={logo} alt="Logo" />
            </header>
            <main className={style.main}>
                <FilterList />
                <div className="app__tickets">
                    <TabList />
                    <TicketList />
                    <Pagination />
                </div>
            </main>
        </section>
    );
};

export default App;
