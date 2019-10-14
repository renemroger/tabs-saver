import React from 'react';
import './DropdownList.css';

export default function DropdownList(props) {
  const user_setting = [
    'Waiting for Payment',
    'Paid',
    'Shipping',
    'Delivering',
    'Done',
  ];

  return (
    <div className="dropdown">
      <div className="dropdown-content">
        {user_setting.map((status, index) => {
          return (
            <React.Fragment key={index}>
              <span></span>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
