'use strict';
/* global store, Item, $ */

const store = (function () {
  let items = [
    { id: cuid(), name: 'apples', checked: false },
    { id: cuid(), name: 'oranges', checked: false },
    { id: cuid(), name: 'milk', checked: true },
    { id: cuid(), name: 'bread', checked: false }
  ];
  let hideCheckedItems = false;
  let searchTerm = '';

  const findById = function (id) {   
    return store.items.find(item => id === item.id);
  };

  const addItem = function (name) {
    try {
      Item.validateName(name); 
      store.items.push(Item.create(name));
    }
    catch(error) {
      console.log(`Cannot add item. ${error.message}`);
    }

  };

  const findAndToggleChecked = function (id) {
    const foundItem = store.findById(id);
    foundItem.checked = !foundItem.checked;
  };

  const findAndUpdateName = function (id, itemName) {
    try {
      Item.validateName(itemName);
      const foundItem = store.findById(id);
      foundItem.name = itemName;
    }
    catch (error) {
      console.log(`Cannot update name: ${error.message}`);

    }
  };

  const findAndDelete = function (id) {
    const index = store.items.findIndex(item => item.id === id);
    store.items.splice(index, 1);
  };

  const toggleCheckedFilter = function () {
    this.hideCheckedItems=!this.hideCheckedItems;
  };

  const setSearchTerm = function (input) {
    this.searchTerm = input;
  };

  const getItems = function () {
    let filteredItems = this.items;
    // Filter out checked items if hideCheckedItems is true
    if (this.hideCheckedItems) {
      filteredItems = filteredItems.filter(item => !item.checked);
    }
    // Filter out search items if searchTerm is not empty
    if (this.searchTerm) {
      filteredItems = filteredItems.filter(item => item.name.includes(this.searchTerm));
    }
    return filteredItems;

  };

  return {
    items,
    hideCheckedItems,
    searchTerm,
    findById,
    addItem,
    findAndToggleChecked,
    findAndUpdateName,
    findAndDelete,
    toggleCheckedFilter,
    setSearchTerm,
    getItems,
  };

}() );


  