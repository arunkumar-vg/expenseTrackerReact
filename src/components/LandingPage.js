/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataContainer from './DataContainer.js';
import SideBar from './SideBar.js';
import ModalBox from "../common/ModalBox";
import InputCommon from '../common/InputField';

const LandingPage = () => {
  const date = new Date();
  const Month = date.getMonth() + 1;
  const Year = date.getFullYear();

  const [currentYear, setCurrentYear] = useState(Year);
  const [activeYear, setActiveYear] = useState({ year: Year });
  const [activeMonth, setActiveMonth] = useState({ monthId: Month });
  const [data, setData] = useState([]);
  const [modalBox, setModalBox] = useState(false);
  const [expenseObj, setExpenseObj] = useState({});

  const onYearClick = (year) => setActiveYear(year);
  const onMonthClick = (month) => setActiveMonth(month);
  const reset = () => {
    setActiveYear({ year: Year });
    setActiveMonth({ monthId: Month });
  };
  const updateYear = (value) => setCurrentYear(value);

  const updateData = () => {
    const payload = {
      year: activeYear.year,
      month: activeMonth.monthId,
      date: expenseObj.date,
      amount: Number(expenseObj.amount),
      paidFor: expenseObj.paidFor,
    };

    const { id } = expenseObj;

    axios.put(`http://localhost:8246/expenses/${id}`, payload)
      .then((response) => {
        if (response.status === 200) {
          alert('Data Updated');
          setModalBox(false);
          reload();
        }
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setExpenseObj((prev) => ({ ...prev, [field]: value }));
  };

  const reload = () => {
    const { year } = activeYear;
    const { monthId } = activeMonth;

    axios.get(`http://localhost:8246/expenses?year=${year}&month=${monthId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    reload();
  }, [activeYear, activeMonth]);

  return (
    <>
      {modalBox && (
        <ModalBox
          heading="Edit Expense"
          buttonName="Save"
          closeModal={() => setModalBox(false)}
          onSave={() => updateData()}
        >
          <div className="d-grid grid-cols-2 gap-2">
            <InputCommon
              type="date"
              label="Date"
              value={expenseObj.date || ''}
              onChange={(e) => handleChange(e, 'date')}
            />
            <InputCommon
              label="Paid for"
              value={expenseObj.paidFor || ''}
              onChange={(e) => handleChange(e, 'paidFor')}
            />
            <InputCommon
              label="Amount"
              value={expenseObj.amount || ''}
              onChange={(e) => handleChange(e, 'amount')}
            />
          </div>
        </ModalBox>
      )}
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
            setModalBox={setModalBox}
            setExpenseObj={setExpenseObj}
          />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
