import { API_URL } from '../config';

// Selectors
export const getAllTables = (state) => state.tables;
export const getTableById = ({ tables }, tableId) => tables.find((table) => table.id === tableId);

// Action type definitions
const createActionName = (actionName) => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const UPDATE_TABLE_STATUS = createActionName('UPDATE_TABLE_STATUS');
const UPDATE_PEOPLE_AMOUNT = createActionName('UPDATE_PEOPLE_AMOUNT');
const UPDATE_BILL_AMOUNT = createActionName('UPDATE_BILL_AMOUNT');

// Action creators
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });

// Fetches the list of tables from the API
export const fetchTables = () => (dispatch) => {
  fetch(`${API_URL}/tables`)
    .then((res) => res.json())
    .then((tables) => dispatch(updateTables(tables)))
    .catch((error) => console.error('Failed to fetch tables:', error));
};

// Updates the status of a table
export const updateTableStatus = (tableId, status) => (dispatch) => {
  fetch(`${API_URL}/tables/${tableId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
    .then((res) => res.json())
    .then((updatedTable) => dispatch({ type: UPDATE_TABLE_STATUS, payload: { tableId, status: updatedTable.status } }))
    .catch((error) => console.error(`Failed to update table status for tableId ${tableId}:`, error));
};

// Updates the amount of people at a table
export const updatePeopleAmount = (tableId, peopleAmount, maxPeopleAmount) => (dispatch) => {
  fetch(`${API_URL}/tables/${tableId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ peopleAmount, maxPeopleAmount }),
  })
    .then((res) => res.json())
    .then((updatedTable) => {
      dispatch({
        type: UPDATE_PEOPLE_AMOUNT,
        payload: {
          tableId,
          peopleAmount: updatedTable.peopleAmount,
          maxPeopleAmount: updatedTable.maxPeopleAmount,
        },
      });
      localStorage.setItem('peopleAmountData', JSON.stringify({ peopleAmount, maxPeopleAmount }));
    })
    .catch((error) => console.error(`Failed to update people amount for tableId ${tableId}:`, error));
};

// Updates the bill amount for a table
export const updateBillAmount = (tableId, billAmount) => (dispatch) => {
  fetch(`${API_URL}/tables/${tableId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bill: billAmount }),
  })
    .then((res) => res.json())
    .then((updatedTable) => dispatch({ type: UPDATE_BILL_AMOUNT, payload: { tableId, bill: updatedTable.bill } }))
    .catch((error) => console.error(`Failed to update bill amount for tableId ${tableId}:`, error));
};

// Tables reducer
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case UPDATE_TABLE_STATUS:
    case UPDATE_PEOPLE_AMOUNT:
    case UPDATE_BILL_AMOUNT:
      return statePart.map((table) =>
        table.id === action.payload.tableId ? { ...table, ...action.payload } : table);
    default:
      return statePart;
  }
};

export default tablesReducer;