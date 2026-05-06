# Shipment Management System

## Table of Contents
- [Description](#description)
- [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
- [Illustrations](#illustrations)
- [Scope of Functionalities](#scope-of-functionalities)
- [Examples of Use](#examples-of-use)
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
| **Update** | Modifies an existing shipment record in the database. |
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
4. Click **Update** — record is updated in JPDB

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
