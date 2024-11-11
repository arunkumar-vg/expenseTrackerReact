/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setYear, setMonth, resetDate } from '../states/dateSlice';
import DataContainer from './DataContainer.js';
import SideBar from './SideBar.js';
import ModalBox from "../common/ModalBox";
import InputCommon from '../common/InputField';

const LandingPage = () => {
  const date = new Date();
  const Year = date.getFullYear();
  const initialData = {
    id: '',
    year: '',
    month: '',
    date: '',
    amount: '',
    paidFor: ''
  }
  const dispatch = useDispatch();
  const [currentYear, setCurrentYear] = useState(Year);
  const activeYear = useSelector((state) => state.date.activeYear);
  const activeMonth = useSelector((state) => state.date.activeMonth);
  const [data, setData] = useState([]);
  const [modalBox, setModalBox] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [objId, setObjId] = useState('');
  const [expenseObj, setExpenseObj] = useState(initialData);

  const onYearClick = (year) => dispatch(setYear(year));
  const onMonthClick = (month) => dispatch(setMonth(month));
  const reset = () => {
    dispatch(resetDate());
  };
  const updateYear = (value) => setCurrentYear(value);

  const handleChange = (e, field) => {
    const { value } = e.target;
    setExpenseObj((prev) => ({ ...prev, [field]: value }));
  };

  const addData = () => {
    const payload = {
      year: activeYear.year,
      month: activeMonth.monthId,
      date: expenseObj.date,
      amount: Number(expenseObj.amount),
      paidFor: expenseObj.paidFor
    };
  
    axios.post('http://localhost:8246/expenses', payload)
      .then((response) => {
        if (response.status === 201) {
          setModalBox(false);
          setExpenseObj(initialData);
          reload();
        }
      })
      .catch((err) => console.error("Error adding data:", err));
  };  

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
          setModalBox(false);
          setExpenseObj(initialData);
          reload();
        }
      })
      .catch((err) => console.error("Error updating data:", err));
  };

  const deleteData = () => {
    axios.delete(`http://localhost:8246/expenses/${objId}`)
      .then((response) => {
        if (response.status === 200) {
          setDeleteModal(false);
          setObjId('');
          reload();
        }
      })
      .catch((err) => console.error("Error deleting data:", err));
  };

  const reload = () => {
    const { year } = activeYear;
    const { monthId } = activeMonth;

    axios.get(`http://localhost:8246/expenses?year=${year}&month=${monthId}`)
      .then((response) => {
        const sortedExpenses = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setData(sortedExpenses);
      })
      .catch((err) => console.error("Error getting data:", err));
  };

  useEffect(() => {
    reload();
  }, [activeYear, activeMonth]);

  return (
    <>
      {modalBox && (
        <ModalBox
          heading={expenseObj.id ? "Edit Expense" : "Add Expense"}
          buttonName="Save"
          closeModal={() => {
            setModalBox(false);
            setExpenseObj(initialData);
          }}
          onSave={() => {
            if (expenseObj.id) {
              updateData();
            } else {
              addData();
            }
          }}
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
      {deleteModal &&
        <ModalBox
          heading="Delete Expense"
          buttonName="Yes"
          closeButton
          closeModal={() => {
            setDeleteModal(false);
            setObjId('');
          }}
          onSave={() => deleteData()}
        >
          <div className="d-flex me-auto">
            Are you sure you want to delete the expense?
          </div>
        </ModalBox>
      }
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
            setDeleteModal={setDeleteModal}
            setObjId={setObjId}
          />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
