import React from "react";
import { HiMiniPencil } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";

const DataContainer = (props) => {

  const { activeYear, activeMonth, data, setModalBox, setExpenseObj } = props;

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
          <span className="p-1">{monthNames[activeMonth.monthId - 1]}</span>
        </div>
        {data && data.length > 0 ?
          <ul className="d-grid grid-cols-2">
            {data.map((item, index) => {
              return (
                <li className="data-card gap-2" key={index}>
                  <span>{item.date} - </span>
                  <span>{formatCurrency(item.amount)} : </span>
                  <span>{item.paidFor}</span>
                  <span className="d-flex ms-auto cursor-pointer gap-2">
                    <span
                      onClick={() => {
                        setExpenseObj(item);
                        setModalBox(true);
                      }}
                    >
                      <HiMiniPencil fontSize={14} color="#000000" />
                    </span>
                    <span>
                      <FaTrashAlt fontSize={14} color="#000000" />
                    </span>
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
