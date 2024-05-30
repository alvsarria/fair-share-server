const fs = require('fs');

// Generate random date within a range
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate random email
function randomEmail(firstName, lastName) {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomDomain}`;
}

// Generate random phone number
function randomPhoneNumber() {
    const digits = '1234567890';
    let phoneNumber = '+';
    for (let i = 0; i < 10; i++) {
        phoneNumber += digits[Math.floor(Math.random() * 10)];
    }
    return phoneNumber;
}

// Generate random hex string ID
function generateId() {
    return Math.floor(Math.random() * 0xffffffffffffffff).toString(16).padStart(24, '0');
}

// Generate random user data
function generateUser() {
    const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Helen', 'Ian', 'Julia'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const dateOfBirth = randomDate(new Date(1960, 0, 1), new Date(2005, 0, 1));
    const email = randomEmail(firstName, lastName);
    const phoneNumber = randomPhoneNumber();
    const password = 'password123';
    return {
        _id: { $oid: generateId() },
        name: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth.toISOString(),
        phoneNumber: phoneNumber,
        email: email,
        password: password
    };
}

// Generate random group data
function generateGroup(users) {
    const groupNames = ['Family Vacation', 'Roommates Expenses', 'Project Expenses', 'Travel Club'];
    const groupName = groupNames[Math.floor(Math.random() * groupNames.length)];
    const numUsers = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
    const groupUsers = [];
    for (let i = 0; i < numUsers; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        groupUsers.push(randomUser._id);
    }
    return {
        _id: { $oid: generateId() },
        name: groupName,
        expenses: [],
        users: groupUsers,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
}

// Generate random expense data
function generateExpense(group, users) {
    const expenseNames = ['Hotel', 'Food', 'Transportation', 'Entertainment'];
    const expenseConcepts = ['Accommodation', 'Meals', 'Tickets', 'Activities'];
    const expenseName = expenseNames[Math.floor(Math.random() * expenseNames.length)];
    const expenseConcept = expenseConcepts[Math.floor(Math.random() * expenseConcepts.length)];
    const amount = Math.floor(Math.random() * 500) + 50;
    const expensePayers = [];
    for (const userId of group.users) {
        const user = users.find(user => user._id === userId);
        if (user) {
            expensePayers.push(user._id);
        }
    }
    return {
        _id: { $oid: generateId() },
        name: expenseName,
        concept: expenseConcept,
        amount: amount,
        group: group._id,
        expenseAuthor: group.users[Math.floor(Math.random() * group.users.length)],
        expensePayers: expensePayers,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
}

// Generate users
const users = [];
for (let i = 0; i < 50; i++) {
    const user = generateUser();
    users.push(user);
}

// Generate groups
const groups = [];
for (let i = 0; i < 150; i++) {
    const group = generateGroup(users);
    groups.push(group);
}

// Generate expenses
const expenses = [];
for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    const numExpenses = Math.floor(Math.random() * 20) + 1;
    for (let j = 0; j < numExpenses; j++) {
        const expense = generateExpense(group, users);
        expenses.push(expense);
        group.expenses.push(expense._id);
    }
}

// Write to JSON files
fs.writeFileSync('./dummy_data/dummy_users.json', JSON.stringify(users, null, 2));
fs.writeFileSync('./dummy_data/dummy_groups.json', JSON.stringify(groups, null, 2));
fs.writeFileSync('./dummy_data/dummy_expenses.json', JSON.stringify(expenses, null, 2));

console.log('JSON files generated successfully.');
