let expenses = [
  {
    id: 0,
    userId: 2,
    spentAt: '2020-07-20T15:49:04-07:00',
    title: 'string',
    amount: 0,
    category: 'string',
    note: 'string',
  },
  {
    id: 1,
    userId: 2,
    spentAt: '2020-07-20T15:49:04-07:00',
    title: 'string',
    amount: 0,
    category: 'string',
    note: 'string',
  },
  {
    id: 2,
    userId: 1,
    spentAt: '2015-07-20T15:49:04-07:00',
    title: 'string',
    amount: 0,
    category: 'go',
    note: 'string',
  },
];
// let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find((exp) => exp.id === id) || null;
};

const getByParams = (userId, category, from, to) => {
  let exps = [...expenses];

  if (userId || userId === 0) {
    exps = exps.filter((exp) => exp.userId === userId);
  }

  if (category?.trim()) {
    exps = exps.filter((exp) => exp.category === category);
  }

  if (from && to) {
    exps = exps.filter((exp) => {
      return (
        new Date(from).getTime() < new Date(exp.spentAt).getTime() &&
        new Date(exp.spentAt).getTime() < new Date(to).getTime()
      );
    });
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
