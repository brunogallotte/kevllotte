# Kevllotte API

## Overview

This project is an API built using the Fastify microframework, following SOLID principles to ensure a clean and maintainable codebase. The API utilizes Prisma for database management and Zod for schema validation. The architecture adheres to repository patterns, factory patterns, and Domain-Driven Design (DDD) principles, promoting a modular and scalable design.

## Features

- **Fastify**: A high-performance, low-overhead web framework for Node.js.
- **Prisma**: A modern ORM (Object-Relational Mapping) tool for managing PostgreSQL databases.
- **Zod**: A schema declaration and validation library to ensure data integrity.
- **SOLID Principles**: The project is structured to follow SOLID principles, enhancing code readability, maintainability, and scalability.
- **Repository Pattern**: A pattern to abstract the data layer, providing a flexible approach to data access and manipulation.
- **Factory Pattern**: A creational design pattern used to instantiate objects, ensuring a clean separation of concerns and promoting code reuse.
- **Domain-Driven Design (DDD)**: The project is organized around DDD principles, which helps to model complex software by connecting the implementation to an evolving model.

## Domain-Driven Design (DDD) Concepts Applied

- **Entities**: Core objects within the domain that have a distinct identity. In this project, entities represent key business objects managed by the API, such as User and Order.
- **Value Objects**: Immutable objects that describe some characteristics or attributes but have no identity. Examples include an Address or DateRange.
- **Aggregates**: Clusters of entities and value objects that are treated as a single unit for data changes. The root of an aggregate is known as the aggregate root. For instance, an Order aggregate might include OrderItems and PaymentDetails.
- **Repositories**: Abstractions for data retrieval and persistence that work with aggregates. This pattern ensures that the domain model remains independent of the data access technology.
- **Services**: Operations that don't naturally fit within the entities or value objects. Domain services encapsulate business logic that involves multiple entities.
- **Factories**: Used to create complex objects and aggregates. They handle the instantiation logic, ensuring that all invariants and business rules are enforced at the time of creation.
- **Domain Events**: Represent significant occurrences within the domain that other parts of the system react to. They help to decouple different parts of the application by using an event-driven approach.

## Technologies Used

- **Fastify**: For building the API server.
- **Prisma**: For database ORM.
- **Zod**: For schema validation.
- **PostgreSQL**: The database used for this project.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>=14.x)
- PostgreSQL (>=12.x)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
