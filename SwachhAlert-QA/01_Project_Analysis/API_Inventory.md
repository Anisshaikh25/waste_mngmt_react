# API Inventory

## Document Information

| Field | Value |
|-------|-------|
| Project | SwachhAlert |
| Document | API Inventory |
| Version | 1.0 |
| Prepared By | Anis Shaikh |
| Date | 30 July 2026 |
| Status | Draft |

---

# Purpose

This document lists all REST APIs implemented in the SwachhAlert backend. It provides information about API endpoints, HTTP methods, authentication requirements, user roles, and expected functionality. This document serves as the foundation for API testing and automation.

---

# API Inventory

| API ID | Module | Method | Endpoint | Authentication | Role | Description |
|---------|---------|---------|-----------|----------------|------|-------------|
| API-001 | Authentication | POST | /auth/register | No | Public | Register a new resident account |
| API-002 | Authentication | POST | /auth/login | No | Public | Authenticate user and generate JWT token |
| API-003 | Complaint Management | POST | /complaints | Yes | Resident | Submit a new complaint |
| API-004 | Complaint Management | GET | /complaints/my | Yes | Resident | Retrieve all complaints submitted by the logged-in resident |
| API-005 | Complaint Management | GET | /complaints/:id | Yes | Resident/Admin | Retrieve complaint details by complaint ID |
| API-006 | Administration | GET | /admin/complaints | Yes | Admin | Retrieve all complaints |
| API-007 | Administration | PATCH | /admin/complaints/:id/status | Yes | Admin | Update complaint status |

---

# Authentication Summary

Authentication Mechanism

- JSON Web Token (JWT)

Authorization

- Role-Based Access Control (RBAC)

Protected APIs

- Complaint APIs
- Admin APIs

Public APIs

- Register
- Login

---

# HTTP Methods Used

| Method | Purpose |
|----------|----------|
| POST | Create resources |
| GET | Retrieve resources |
| PATCH | Update existing resource |