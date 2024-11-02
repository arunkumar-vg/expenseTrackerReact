import React from "react";
import { HiMiniPencil } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";

const DataContainer = (props) => {

  const { activeYear, activeMonth, data } = props;
  console.log('hello', data);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function formatCurrency(amount, currency = 'INR', locale = 'en-IN') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  return (
    <>
      <div className="text-small font-bold">
        EXPENSE REPORT
      </div>
      <>
        <div className="p-2 font-bold">
          <span className="p-1">{activeYear.year}</span>
          <span className="p-1">{monthNames[activeMonth.value - 1]}</span>
        </div>
        {data && data.expenses.length > 0 ?
          <ul className="d-grid grid-cols-2">
            {data.expenses.map((item) => {
              return (
                <li className="data-card gap-2" key={item}>
                  <span>{item.date} - </span>
                  <span>{formatCurrency(item.amount)} : </span>
                  <span>{item.paidFor}</span>
                  <span class="d-flex ms-auto cursor-pointer gap-1">
                    <HiMiniPencil fontSize={14} color="#000000" />
                    <FaTrashAlt fontSize={14} color="#000000" />
                  </span>
                </li>
              );
            })}
          </ul>
          :
          <div className="items-center font-bold text-large font-gray mt-4 p-4">
            No Records Found
          </div>
        }
      </>
    </>
  );
};

export default DataContainer;
