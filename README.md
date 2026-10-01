# Outlay – Student Expense Tracker & Budget Planner

## Project Overview

**Outlay** is a web-based student expense tracking and budgeting application designed to help students understand, manage, and improve their personal finances.

The application provides tools for recording daily expenses, managing monthly budgets, setting savings goals, learning budgeting principles, and understanding common money-management mistakes.

The website combines an interactive expense tracker with educational content so that students can both **manage their current spending** and **learn better financial habits**.

---

## Project Title

**Outlay – Student Expense Tracker & Budget Planner**

---

## Project Type

- Web Application
- Student Financial Management Tool
- Personal Expense Tracker
- Budget Planning Application
- Financial Education Website

---

## Project Objectives

The main objectives of Outlay are:

1. To help students track their daily expenses.
2. To provide a simple monthly budgeting system.
3. To help users understand where their money is being spent.
4. To encourage regular saving habits.
5. To provide educational information about personal finance.
6. To explain the 50-30-20 budgeting rule.
7. To help users distinguish between needs and wants.
8. To highlight common money-management mistakes.
9. To provide visual financial information through infographics.
10. To provide a simple, responsive, and user-friendly interface.

---

# Main Features

## 1. Expense Tracking

Users can record individual expenses by entering:

- Expense title
- Amount
- Category
- Date

The application validates expense information before adding it to the expense list.

Users can also remove previously recorded expenses.

---

## 2. Monthly Budget Management

Users can set a monthly budget and monitor their spending.

The dashboard provides information such as:

- Monthly budget
- Total spending
- Remaining budget
- Budget status
- Expense categories
- Spending analytics

This allows users to quickly understand their current financial position.

---

## 3. Expense Categories

Expenses can be organized into categories such as:

- Food
- Transport
- Shopping
- Bills
- Custom expenses

Categorizing expenses makes it easier to identify spending patterns.

---

## 4. Savings Goals

The application includes a savings goal feature that allows users to think about and plan toward financial targets.

Savings planning encourages students to allocate part of their available money toward future goals.

---

## 5. 50-30-20 Budget Rule

Outlay includes an interactive calculator based on the popular **50-30-20 budgeting method**.

The calculator divides income into:

- 50% – Needs
- 30% – Wants
- 20% – Savings

Users can enter their income and instantly see the calculated amounts.

---

## 6. Budgeting Education

The website contains educational content explaining important budgeting concepts.

Topics include:

- Income
- Fixed expenses
- Variable expenses
- Needs
- Wants
- Savings
- Monthly budgeting

A sample student monthly budget is also provided.

---

## 7. Needs vs Wants Quiz

The website provides an interactive quiz designed to help students understand the difference between:

### Needs

Items and services that are important for everyday life.

Examples include:

- Food
- Housing
- Education
- Transportation

### Wants

Items or services that are desirable but generally not essential.

Examples include:

- Entertainment
- Luxury products
- Optional shopping

The quiz provides an interactive way for users to test their understanding.

---

## 8. Money Mistakes Education

The website provides information about common financial mistakes students may make.

Examples include:

- Impulse buying
- Ignoring small expenses
- Not creating a budget
- Forgetting recurring expenses
- Poor spending planning

Each topic provides an explanation and a suggested improvement.

---

## 9. Financial Infographics

The application contains an infographic gallery covering financial topics such as:

- Budgeting
- Savings
- Needs vs wants
- Monthly budgeting
- Saving challenges

The visual format helps users understand financial concepts more easily.

---

## 10. Financial Quotes

The project contains a collection of financial and budgeting quotes designed to encourage better money habits.

Examples of topics include:

- Saving money
- Avoiding unnecessary spending
- Creating budgets
- Financial discipline

---

## 11. Built-in Chatbot

Outlay includes a lightweight budgeting chatbot.

Users can ask questions related to:

- Budgeting
- Saving
- Overspending
- Financial habits
- The 50-30-20 rule

The chatbot uses predefined financial questions and answers stored locally in the application.

---

## 12. Search

The website includes a search page that allows users to find budgeting-related educational content.

Users can search for topics such as:

- Saving
- Needs
- Expenses
- Budgeting

---

## 13. Authentication

The application includes an authentication interface for users.

The authentication system is integrated into the application's route structure and provides access to the expense dashboard.

Protected routes are implemented for areas that require authentication.

---

## 14. Protected Dashboard

The expense dashboard is protected using a dedicated `ProtectedRoute` component.

The dashboard provides access to:

- Expense tracking
- Budget management
- Expense summaries
- Analytics
- Expense history

Unauthenticated users are prevented from directly accessing protected dashboard content.

---

# Website Pages

The application contains the following main routes:

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Introduces the application and its features |
| `/auth` | Authentication | Sign-in/account interface |
| `/dashboard` | Expense Dashboard | Track expenses and manage budgets |
| `/budgeting-basics` | Budgeting Basics | Learn fundamental budgeting concepts |
| `/needs-vs-wants` | Needs vs Wants | Interactive financial quiz |
| `/50-30-20-rule` | 50-30-20 Calculator | Calculate budget allocations |
| `/savings-goals` | Savings Goals | Plan and manage savings targets |
| `/money-mistakes` | Money Mistakes | Learn about common financial mistakes |
| `/infographics` | Infographics | Browse financial educational graphics |
| `/about` | About & Contact | Information and feedback/contact page |
| `/search` | Search | Search financial educational content |
| `/sitemap` | Sitemap | Displays available website pages |

---

# Technology Stack

## Frontend

The project is built using:

- React
- JavaScript
- JSX
- CSS
- HTML5

---

## React

React is used to create the application's reusable user interface components.

The project uses React functional components and React hooks.

Examples include:

- `useState`
- `useEffect`
- Context API

---

## React Router

React Router is used to provide client-side navigation.

The project uses routes such as:

```text
/
 /auth
 /dashboard
 /budgeting-basics
 /needs-vs-wants
 /50-30-20-rule
 /savings-goals
 /money-mistakes
 /infographics
 /about
 /search
 /sitemap