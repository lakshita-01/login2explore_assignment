# Shipment Management System

## Table of Contents
- [Description](#description)
- [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
- [Illustrations](#illustrations)
- [Scope of Functionalities](#scope-of-functionalities)
- [Examples of Use](#examples-of-use)
- [Token Setup](#token-setup)
- [Project Status](#project-status)
- [Release History](#release-history)
- [Sources](#sources)

---

## Description

A web application to manage shipment records using [JsonPowerDB (JPDB)](https://login2explore.com/jpdb/) as the database. It allows users to check, save, and update shipment details through a clean and simple form interface. The app uses a lightweight Node.js proxy server to communicate with the JPDB API.

**Tech Stack:**
- **Frontend:** HTML, CSS, jQuery
- **Backend:** Node.js (proxy server)
- **Database:** JsonPowerDB (Login2Xplore)

**Project Structure:**
```
login2xplore/
├── app.js        # Node.js proxy server
└── index.html    # Frontend UI
```

---

## Benefits of using JsonPowerDB

- **Schema-free:** No need to define a schema before storing data — any JSON can be inserted directly.
- **Multi-mode database:** Supports document, key-value, relational, and time-series data in a single platform.
- **REST API based:** All operations are performed via simple HTTP requests, making it easy to integrate with any frontend or backend.
- **High performance:** Built on PowerIndeX engine, offering fast read/write operations.
- **Low development cost:** Minimal setup and no ORM or query language required — reduces development time significantly.
- **Built-in security:** Token-based authentication for all API calls.
- **Server-side agnostic:** Works with any server-side technology since it communicates purely over HTTP.

---

## Illustrations

### Form — Initial State
```
┌─────────────────────────────────────┐
│        Shipment Management          │
│                                     │
│  Shipment No: [__________] [Check]  │
│  Description: [disabled]            │
│  Source:      [disabled]            │
│  Destination: [disabled]            │
│  Shipping Date:          [disabled] │
│  Expected Delivery Date: [disabled] │
│                                     │
│          [Save] [Update] [Reset]    │
└─────────────────────────────────────┘
```

### Form — After Checking a New Shipment No
- All fields become editable
- **Save** and **Reset** buttons are enabled
- **Update** remains disabled

### Form — After Checking an Existing Shipment No
- All fields are populated with existing data and become editable
- **Update** and **Reset** buttons are enabled
- **Save** remains disabled

---

## Scope of Functionalities

| Feature | Description |
|---------|-------------|
| **Check** | Looks up the entered Shipment No in the database. Enables Save for new records, Update for existing ones. |
| **Save** | Inserts a new shipment record into the database. |
| **Update** | Modifies an existing shipment record by removing the old record and reinserting the updated one (REMOVE + PUT), since JPDB's UPDATE command is restricted. |
| **Reset** | Clears all form fields and returns the form to its initial state. |

### Form Fields

| Field | Description |
|-------|-------------|
| Shipment No | Unique identifier for the shipment |
| Description | Brief description of the shipment |
| Source | Origin location |
| Destination | Delivery location |
| Shipping Date | Date the shipment was dispatched |
| Expected Delivery Date | Estimated date of delivery |

### Database Configuration

| Config | Value |
|--------|-------|
| Database | `DELIVERY-DB` |
| Relation | `SHIPMENT-TABLE` |
| JPDB Host | `api.login2explore.com:5577` |

---

## Examples of Use

### Saving a New Shipment
1. Start the server: `node app.js`
2. Open `http://localhost:8000`
3. Enter a new Shipment No (e.g. `SH100`) and click **Check**
4. Fill in Description, Source, Destination, Shipping Date, Expected Delivery Date
5. Click **Save** — record is stored in JPDB

### Updating an Existing Shipment
1. Enter an existing Shipment No (e.g. `SH100`) and click **Check**
2. The form auto-populates with the stored data
3. Modify any field(s)
4. Click **Update** — the existing record is removed and reinserted with the new data (REMOVE + PUT) due to JPDB UPDATE restrictions

---

## Token Setup

Tokens are loaded from a `.env` file at startup by `app.js` and injected into `index.html` at runtime, replacing the `__TOKEN__` and `__USER_TOKEN__` placeholders. **Tokens are never exposed in source code or committed to version control** (`.env` is listed in `.gitignore`).

### Steps

1. Copy the example file:
   ```
   copy .env.example .env
   ```

2. Open `.env` and fill in your tokens:
   ```
   JPDB_TOKEN=your_connection_token_here
   JPDB_USER_TOKEN=your_user_token_here
   ```

3. **Where to get the tokens** — Log in to [login2explore.com](https://login2explore.com), go to your dashboard, and copy:
   - **Connection Token (`JPDB_TOKEN`)** — used for read operations (`GET_ALL`)
   - **User Token (`JPDB_USER_TOKEN`)** — used for write operations (`PUT`, `REMOVE`)

4. Start the server — it will fail with a clear error if either token is missing:
   ```
   node app.js
   ```

> **Note:** Never commit your `.env` file. Use `.env.example` (with placeholder values) as the template for other contributors.

---

## Project Status

**Active** — Core functionalities (Check, Save, Update, Reset) are fully implemented and tested against the live JPDB API.

---

## Release History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2025-07-01 | Initial release — Check, Save, Update, Reset with JPDB integration |

---

## Sources

- [JsonPowerDB Official Site](https://login2explore.com/jpdb/)
- [JsonPowerDB API Documentation](https://login2explore.com/jpdb/docs.html)
- [jQuery Documentation](https://api.jquery.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
