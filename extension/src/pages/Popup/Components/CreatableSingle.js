import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';
import _ from 'lodash';

export default function CreatableSingle(props) {
  console.log(props.categories);
  const categories = _.valuesIn(props.categories);

  console.log(categories);
  const handleChange = function(newValue, actionMeta) {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  const handleInputChange = function(inputValue, actionMeta) {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  console.log(props.categories);
  return (
    <CreatableSelect
      isClearable
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={props.categories}
    />
  );
}
