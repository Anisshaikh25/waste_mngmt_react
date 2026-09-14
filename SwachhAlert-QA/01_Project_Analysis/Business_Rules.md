# Business Rules

## Document Information

| Field | Value |
|-------|-------|
| Project | SwachhAlert |
| Document | Business Rules |
| Version | 1.0 |
| Prepared By | Anis Shaikh |
| Date | 30 July 2026 |
| Status | Draft |

---

# Purpose

This document defines the functional and business rules governing the SwachhAlert application. These rules serve as the basis for creating test scenarios, manual test cases, API tests, and authorization tests.

---

# Authentication Rules

### BR-001
A new resident must register before accessing protected features.

### BR-002
A registered user must provide valid credentials to log in.

### BR-003
A successful registration and login both generate a JWT token valid for 7 days.

### BR-004
Protected APIs must reject unauthenticated requests.

---

# Resident Rules

### BR-005
A resident can submit a waste complaint.

### BR-006
A complaint must contain:

Title
Description
Category
Location Address

Photo is optional.

### BR-007
A resident can view only the complaints submitted by their own account.

### BR-008
A resident cannot access another resident's complaint details.

### BR-009
A resident cannot update the complaint status.

---

# Admin Rules

### BR-010
An administrator can view all complaints.

### BR-011
An administrator can update complaint status.

### BR-012
Only authorized administrators can access admin APIs.

---

# Complaint Status Rules

### BR-013
Every newly created complaint is assigned the status **Pending**.

### BR-014
Complaint status can be updated by an administrator.

### BR-015
Valid complaint statuses are:
- Pending
- In Progress
- Resolved

---

# Security Rules

### BR-016
JWT authentication is mandatory for all protected endpoints.

### BR-017
Role-Based Access Control (RBAC) must restrict access based on user role.

### BR-018
Invalid or expired JWT tokens must be rejected.

### BR-019
Complaint category must be one of:
- Roadside dump
- Bin overflow
- Construction waste
- Other

### BR-020
Every complaint is automatically assigned the logged-in resident's ward.

### BR-021
Passwords must contain at least 8 characters.

### BR-022
Resident and Admin are the only valid user roles.

---

# Notes

The business rules documented above are based on the current implementation and project requirements. They will be reviewed and updated if additional functionality is introduced.