# 🛠️ AI Engineering Project Builder

This project is a **multi-agent system** that takes a plain-text idea (like *"Build a colorful modern todo app in HTML, CSS, and JS"*) and **automatically turns it into a working codebase**.  
It uses [LangGraph](https://github.com/langchain-ai/langgraph), [LangChain](https://github.com/langchain-ai/langchain), and [Groq LLMs](https://groq.com) to orchestrate specialized AI agents.

---

## 🚀 How It Works

The system is built as a **graph of three specialized agents**, each responsible for a stage of the engineering workflow:

### 1. 📋 Planner Agent
- Converts a freeform user prompt into a **structured project plan**.
- Defines:
  - App name
  - Description
  - Tech stack
  - Features
  - Files to be created

### 2. 🏗️ Architect Agent
- Takes the plan and breaks it down into **detailed engineering tasks**.
- Defines exactly what functions, classes, and files to implement.
- Orders tasks with dependencies in mind.

### 3. 👨‍💻 Coder Agent
- Iteratively executes the architect’s tasks.
- Uses **tools** to:
  - Read and write files safely inside a sandbox (`generated_project/`)
  - List files and manage the project directory
  - Run shell commands if needed
- Implements tasks step by step until the project is complete.

---

## 📂 Project Structure
