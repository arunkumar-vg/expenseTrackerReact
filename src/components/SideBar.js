/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SideBar = (props) => {

  const { currentYear, activeYear, activeMonth, onYearClick, onMonthClick, reset, updateYear } = props;
  const [yearList, setYearList] = useState([]);

  const Year = new Date().getFullYear();

  const yearChange = (direction) => {
    const newYear = direction === 'left' ? currentYear - 9 : currentYear + 9;
    updateYear(newYear);
    updateYears(newYear);
  };

  const arrayOfMonths = [
    { code: 'jan', monthId: 1, month: 'january' },
    { code: 'feb', monthId: 2, month: 'february' },
    { code: 'mar', monthId: 3, month: 'march' },
    { code: 'apr', monthId: 4, month: 'april' },
    { code: 'may', monthId: 5, month: 'may' },
    { code: 'jun', monthId: 6, month: 'june' },
    { code: 'jul', monthId: 7, month: 'july' },
    { code: 'aug', monthId: 8, month: 'augest' },
    { code: 'sep', monthId: 9, month: 'september' },
    { code: 'oct', monthId: 10, month: 'october' },
    { code: 'nov', monthId: 11, month: 'november' },
    { code: 'dec', monthId: 12, month: 'december' }
  ];

  const updateYears = (value) => {
    const temp = Array.from({ length: 8 + 1 }, (_, index) => ({
      value: index,
      year: value - (8 - index)
    }));
    setYearList(temp);
  };

  useEffect(() => {
    updateYears(Year);
  }, []);

  return (
    <div>
      <div className="arrow-bns">
        <span
          className={currentYear <= Year - 9 ? "cursor-disabled" : ""}
          onClick={() => {
            if (currentYear >= Year - 8) {
              yearChange('left');
            }
          }}
        >
          <FaArrowLeft fontSize={16} />
        </span>
        <span className="font-bold">Select Year</span>
        <span
          className={currentYear === Year ? "cursor-disabled" : ""}
          onClick={() => {
            if (currentYear !== Year) {
              yearChange('right');
            }
          }}
        >
          <FaArrowRight fontSize={16} />
        </span>
      </div>
      <div className="d-grid grid-cols-3">
        {yearList?.map((item) => {
          return (
            <div className="year-row" key={item.year}>
              <span
                className={activeYear.year === item.year ? 'year active' : 'year'}
                onClick={() => onYearClick(item)}
              >
                {item.year}
              </span>
            </div>
          );
        })}
      </div>
      <div className="month font-bold">Select Month</div>
      <div className="d-grid grid-cols-3">
        {arrayOfMonths?.map((item) => {
          return (
            <div className="year-row" key={item.monthId}>
              <span
                className={activeMonth.monthId === item.monthId ? 'year active' : 'year'}
                onClick={() => onMonthClick(item)}
              >
                {item.code.toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>
      <div className="item-center mt-4">
        <span
          className="btn-common"
          onClick={() => reset()}
        >
          Reset
        </span>
      </div>
    </div>
  );
};

export default SideBar;
