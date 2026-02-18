// const { v4: uuidv4 } = require('uuid');

let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find((exp) => exp.id === id) || null;
};

const getByParams = (userId, category, from, to) => {
  let exps = [...expenses];

  if (typeof userId === 'number') {
    exps = expenses.filter((exp) => exp.userId === userId);
  }

  if (category) {
    exps = expenses.filter((exp) => exp.category === 'category');
  }

  if (from && to) {
    exps = expenses.filter((exp) => from < exp.spentAt < to);
  }

  return exps;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const id = expenses.length ? expenses.at(-1).id + 1 : 0;
  const expense = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
  };

  if (note) {
    Object.assign(expense, { note });
  }

  expenses.push(expense);

  return expense;
};

const deleteExpense = (id) => {
  const newExpenses = expenses.filter((expense) => expense.id !== id);

  if (newExpenses.length === expenses.length) {
    return false;
  }

  expenses = newExpenses;

  return true;
};

const update = (id, toUpdate) => {
  const expense = getById(id);

  if (!expense) {
    return false;
  }

  return Object.assign(expense, toUpdate);
};

module.exports = {
  getAll,
  getById,
  getByParams,
  create,
  deleteExpense,
  update,
};
