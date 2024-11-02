
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataContainer from './DataContainer.js';
import SideBar from './SideBar.js';

const LandingPage = () => {

  const date = new Date();
  const Month = date.getMonth() + 1;
  const Year = date.getFullYear();

  const [currentYear, setCurrentYear] = useState(Year);
  const [activeYear, setActiveYear] = useState({ year: Year });
  const [activeMonth, setActiveMonth] = useState({ value: Month });
  const [data, setData] = useState();

  const onYearClick = (year) => {
    setActiveYear(year);
  };

  const onMonthClick = (month) => {
    setActiveMonth(month);
  };

  const reset = () => {
    setActiveYear({ year: Year });
    setActiveMonth({ value: Month });
  };

  const updateYear = (value) => {
    setCurrentYear(value);
  };

  const reload = () => {
    const yy = activeYear.year;
    const mm = activeMonth.value;
    axios.get(`http://localhost:8246/api/getData/${yy}/${mm}`).then((response) => {
      setData(response.data);
    }).catch((err) => { console.error(err);});
  };

  useEffect(() => {
    reload();
  }, [activeYear, activeMonth]);

  return (
    <div className="container-main">
      <div className="sidebar">
        <SideBar
          currentYear={currentYear}
          activeYear={activeYear}
          activeMonth={activeMonth}
          onYearClick={onYearClick}
          onMonthClick={onMonthClick}
          reset={reset}
          updateYear={updateYear}
        />
      </div>
      <div className="data-container me-2">
        <DataContainer
          activeYear={activeYear}
          activeMonth={activeMonth}
          data={data}
        />
      </div>
    </div>
  );
};

export default LandingPage;
