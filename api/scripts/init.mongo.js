db.customers.remove({});
db.transfers.remove({});
const customersDb = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    birthdate: "2002-02-08T00:00:00.000Z",
    account_balance: 64420,
    account_number: "12345678901",
    created_on: "2024-05-03T22:22:43.444Z",
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    birthdate: "2002-01-08T00:00:00.000Z",
    account_balance: 123580,
    account_number: "12345678902",
    created_on: "2024-05-03T22:22:43.444Z",
  },
  {
    name: "Alice Smith",
    email: "alicesmith@example.com",
    birthdate: "1998-05-15T00:00:00.000Z",
    account_balance: 98765,
    account_number: "12345678903",
    created_on: "2024-05-03T22:22:43.444Z",
  },
  {
    name: "Bob Johnson",
    email: "bjohnson@example.com",
    birthdate: "2000-09-25T00:00:00.000Z",
    account_balance: 30000,
    account_number: "12345678904",
    created_on: "2024-05-03T22:22:43.444Z",
  },
  {
    name: "Ella Williams",
    email: "ellaw@example.com",
    birthdate: "2001-11-18T00:00:00.000Z",
    account_balance: 55000,
    account_number: "12345678905",
    created_on: "2024-05-03T22:22:43.444Z",
  },
  {
    name: "David Brown",
    email: "dbrown@example.com",
    birthdate: "1999-03-03T00:00:00.000Z",
    account_balance: 75000,
    account_number: "12345678906",
    created_on: "2024-05-03T22:22:43.444Z",
  },
  {
    name: "Sophia Wilson",
    email: "sophiaw@example.com",
    birthdate: "2003-08-10T00:00:00.000Z",
    account_balance: 45000,
    account_number: "12345678907",
    created_on: "2024-05-03T22:22:43.444Z",
  },
  {
    name: "Oliver Miller",
    email: "oliverm@example.com",
    birthdate: "1997-12-28T00:00:00.000Z",
    account_balance: 82000,
    account_number: "12345678908",
    created_on: "2024-05-03T22:22:43.444Z",
  },
  {
    name: "Liam Taylor",
    email: "liamt@example.com",
    birthdate: "2000-07-05T00:00:00.000Z",
    account_balance: 98000,
    account_number: "12345678909",
    created_on: "2024-05-03T22:22:43.444Z",
  },
  {
    name: "Emma Lee",
    email: "emmal@example.com",
    birthdate: "1995-09-20T00:00:00.000Z",
    account_balance: 60000,
    account_number: "12345678910",
    created_on: "2024-05-03T22:22:43.444Z",
  },
];
transfersDb = [
  {
    from_account: "12345678901",
    to_account: "12345678902",
    amount: 24000,
    timestamp: new Date(),
    status: "COMPLETED",
  },
  {
    from_account: "12345678902",
    to_account: "12345678901",
    amount: 12000,
    timestamp: new Date(),
    status: "COMPLETED",
  },
];
db.customers.insertMany(customersDb);
db.transfers.insertMany(transfersDb);
const count = db.customers.count();
print("Inserted ", count, "Customers.");

db.counters.remove({ _id: "customers" });
db.counters.insert({ _id: "customers", current: count });

db.customers.createIndex({ account_number: 1 }, { unique: true });
