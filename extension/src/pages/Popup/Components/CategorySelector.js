import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';
import _ from 'lodash';
import { fontSize } from '@material-ui/system';

export default function CategorySelector(props) {
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

  const customStyles = {
    container: (styles) => ({
      ...styles,
      padding: '8px 24px',
      fontSize: '16px',
    }),
    menu: (styles) => ({ ...styles, maxWidth: '440px' }),
    control: (styles, state) => ({
      ...styles,
      borderRadius: '0px',
      borderTopWidth: '0px',
      borderLeftWidth: '0px',
      borderRightWidth: '0px',
      ':active': {
        borderTopWidth: state.isFocused ? 0 : 0,
        borderLeftWidth: state.isFocused ? 0 : 0,
        borderRightWidth: state.isFocused ? 0 : 0,
        borderBottomWidth: state.isFocused ? 2 : 2,
        borderBottomColor: state.isFocused ? 'black' : 'black',
      },
      '&:hover': {
        borderTopWidth: state.isFocused ? 0 : 0,
        borderLeftWidth: state.isFocused ? 0 : 0,
        borderRightWidth: state.isFocused ? 0 : 0,
        borderBottomWidth: state.isFocused ? 2 : 2,
        borderBottomColor: state.isFocused ? '0' : 'black',
      },
      ':focus': {
        borderTopWidth: state.isFocused ? 0 : 0,
        borderLeftWidth: state.isFocused ? 0 : 0,
        borderRightWidth: state.isFocused ? 0 : 0,
        borderBottomWidth: state.isFocused ? 2 : 2,
        borderBottomColor: state.isFocused ? 'black' : 'black',
      },
    }),
  };

  const handleInputChange = function(inputValue, actionMeta) {
    // console.group('Input Changed');
    // console.log(inputValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  };

  return (
    <CreatableSelect
      styles={customStyles}
      isClearable
      placeholder="Select/Create Category"
      closeMenuOnSelect={true}
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={categories}
    />
  );
}
