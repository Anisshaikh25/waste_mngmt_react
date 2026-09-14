# Test Scenarios

## Document Information

| Field | Value |
|-------|-------|
| Project | SwachhAlert |
| Document | Test Scenarios |
| Version | 1.0 |
| Prepared By | Anis Shaikh |
| Date | 30 July 2026 |
| Status | Draft |

---

# Purpose

This document identifies the high-level test scenarios for the SwachhAlert application. These scenarios are derived from the implemented backend APIs and business rules. Each scenario will later be expanded into one or more detailed manual test cases.

---

# Module 1 – Authentication

| Scenario ID | Feature | Test Scenario | Priority |
|-------------|---------|---------------|----------|
| TS-001 | Register | Verify successful user registration with valid data | High |
| TS-002 | Register | Verify registration with missing mandatory fields | High |
| TS-003 | Register | Verify registration with duplicate email | High |
| TS-004 | Register | Verify password minimum length validation | High |
| TS-005 | Register | Verify invalid role values are rejected | Medium |
| TS-006 | Login | Verify successful login with valid credentials | High |
| TS-007 | Login | Verify login with incorrect password | High |
| TS-008 | Login | Verify login with unregistered email | High |
| TS-009 | Login | Verify login with missing email or password | High |
| TS-010 | Login | Verify JWT token is generated after successful login | High |

---

# Module 2 – Authentication Middleware

| Scenario ID | Feature | Test Scenario | Priority |
|-------------|---------|---------------|----------|
| TS-011 | JWT | Verify protected API access with valid JWT | High |
| TS-012 | JWT | Verify request without Authorization header | High |
| TS-013 | JWT | Verify request with invalid JWT token | High |
| TS-014 | JWT | Verify deleted user cannot access protected APIs | High |

---

# Module 3 – Complaint Management

| Scenario ID | Feature | Test Scenario | Priority |
|-------------|---------|---------------|----------|
| TS-015 | Create Complaint | Verify complaint submission with valid data | High |
| TS-016 | Create Complaint | Verify complaint submission with missing mandatory fields | High |
| TS-017 | Create Complaint | Verify complaint submission without photo | Medium |
| TS-018 | Create Complaint | Verify invalid complaint category | High |
| TS-019 | View Complaints | Verify resident can view own complaints | High |
| TS-020 | View Complaint | Verify resident can view own complaint details | High |
| TS-021 | View Complaint | Verify resident cannot access another resident's complaint | High |

---

# Module 4 – Admin

| Scenario ID | Feature | Test Scenario | Priority |
|-------------|---------|---------------|----------|
| TS-022 | View Complaints | Verify admin can view complaints for their ward | High |
| TS-023 | Status Update | Verify admin updates complaint status successfully | High |
| TS-024 | Status Update | Verify invalid complaint status is rejected | High |
| TS-025 | Authorization | Verify resident cannot access admin APIs | High |