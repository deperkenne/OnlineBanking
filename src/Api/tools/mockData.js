const { date } = require("yup");

const users = [
  {
    id: 1,
    name: "Tchofo",
    email: "tchofo@gmail.com",
    userpwd: "kenne1989",
    usernummer: "303186712",
  },
  {
    id: 2,
    name: "herve",
    email: "Kenne@gmail.com",
    userpwd: "kenne1988",
    usernummer: "303186713",
  },

  {
    id: 3,
    name: "herve",
    email: "Kenne@gmail.com",
    userpwd: "kenne1988",
    usernummer: "303186714",
  },
];

// ici la realtion est oneTomany
const accounts = [
  { id: 0, name: "epargne713", userId: 1, solde: 10000, accountnumber: "0712" },
  { id: 1, name: "check712", userId: 2, solde: 10000, accountnumber: "0713" },
  { id: 2, name: "credit714", userId: 1, solde: 0, accountnumber: "0714" },
];

const transactions = [
  {
    id: 1,
    name: "virementemis",
    userId: 1,
    montant: 20000,
    accountIDE: "0712",
    accountIDB: "0713",
    date: new Date(2020, 4, 24, 14, 39, 7),
    accountId: 0,
  },
  {
    id: 2,
    name: "retrait",
    userId: 2,
    montant: 20000,
    accountIDE: "0713",
    accountIDB: "0712",
    date: new Date(2020, 4, 24, 14, 39, 7),
    accountId: 1,
  },

  {
    id: 3,
    name: "versementemis",
    userId: 1,
    montant: 20000,
    accountIDE: "0714",
    accountIDB: "0714",
    date: new Date(2020, 4, 24, 14, 39, 7),
    accountId: 0,
  },
  {
    id: 4,
    name: "retrait",
    userId: 1,
    montant: 20000,
    accountIDE: "0714",
    accountIDB: "0713",
    date: new Date(2020, 4, 24, 14, 39, 7),
    accountId: 2,
  },
  {
    id: 5,
    name: "virementemis",
    userId: 2,
    montant: 20000,
    accountIDE: "0714",
    accountIDB: "0713",
    date: new Date(2020, 4, 24, 14, 39, 7),
    accountId: 2,
  },
  {
    id: 6,
    name: "retrait",
    userId: 1,
    montant: 20000,
    accountIDE: "0712",
    accountIDB: "0713",
    date: new Date(2020, 4, 24, 14, 39, 7),
    accountId: 1,
  },
];


// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  users,
  accounts,
  transactions,
};
