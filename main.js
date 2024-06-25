#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.yellowBright("\n>>>>>>>>>>>>.. WELCOME TO MY BANK ..<<<<<<<<<<<<\n"));
// Bank Account Class...
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Dabit money...
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        }
        else {
            console.log("Insufficient balance...!");
        }
    }
    // Credit money...
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee charged if more then $100 is deposited...
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }
    // Check balance...
    checkBalance() {
        console.log(`Current balance: $${this.balance}`);
    }
}
// Customer class...
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank account...
const accounts = [
    new BankAccount(1111, 500),
    new BankAccount(2222, 1000),
    new BankAccount(3333, 2000)
];
// Create customers...
const customers = [
    new Customer("noor", "sehar", "feMale", 19, 53153945414, accounts[0]),
    new Customer("", "Abubakar", "male", 22, 84579237858, accounts[1]),
    new Customer("Saad", "Shaikh", "Male", 18, 3984384998, accounts[2])
];
// Function to interact with back account...
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: (chalk.bold.magenta("Enter your account number:"))
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.bold.italic.greenBright(`\tWelcome, ${customer.firstName} ${customer.lastName}...\n`));
            const ans = await inquirer.prompt([{
                    name: "Select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.Select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: (chalk.bold.magentaBright("Enter the amount to deposit:"))
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const Withdraw = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: (chalk.bold.magentaBright("Enter the amount to deposit:"))
                    });
                    customer.account.withdraw(Withdraw.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.bold.magenta("\nExiting bank program..."));
                    console.log(chalk.bold.magenta("\n\t Thank you for using our bank services. \nHave a great day...!"));
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again...");
        }
    } while (true);
}
service();
