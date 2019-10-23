import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';
import _ from 'lodash';

export default function CreatableSingle(props) {
  const categories = props.categories.map((c) => {
    return { value: `${c.name}`, label: `${c.name}` };
  });

  const handleChange = function(newValue, actionMeta) {
    if (`${actionMeta.action}` === 'select-option') {
      props.setCategoryName(newValue.value);
    } else if (`${actionMeta.action}` === 'create-option') {
      props.setCategoryName(newValue.value);
    }
  };
  const handleInputChange = function(inputValue, actionMeta) {
    // console.group('Input Changed');
    // console.log(inputValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };

  return (
    <CreatableSelect
      isClearable
      closeMenuOnSelect={true}
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={categories}
    />
  );
}
