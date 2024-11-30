# Coffee Shop AI Chatbot 🚀☕️

Welcome to the **Coffee Shop AI Chatbot** repository! This project contains all the resources and code required to develop a sophisticated AI-powered chatbot tailored for customer engagement in a coffee shop application. Leveraging Large Language Models (LLMs), Natural Language Processing (NLP), and **RunPod's infrastructure**, the chatbot is integrated into a **React Native** app, enabling users to place orders, inquire about menu details, and receive personalized product recommendations.

---

## 🎯 **Project Highlights**
This project delivers a cutting-edge, intelligent chatbot system that can:
- Facilitate real-time customer interactions, such as **order placement**.
- Provide in-depth details on menu items, including ingredients and allergen information, powered by a **Retrieval-Augmented Generation (RAG)** system.
- Recommend products based on user preferences through a **market basket analysis engine**.
- Enhance order accuracy and streamline the ordering process.
- Ensure safe interactions by detecting and blocking inappropriate or irrelevant queries with a **Guard Agent**.

---

## 🔧 **Skill Development**
By working on this project, you’ll learn:
- How to deploy an **LLM-powered chatbot** using **RunPod**.
- Designing and implementing **modular, agent-based systems**.
- Setting up and querying a **vector database** for storing menu and product data.
- Using **Retrieval-Augmented Generation (RAG)** to fetch detailed and accurate responses.
- Developing and deploying a **recommendation engine**.
- Integrating AI systems into a **React Native mobile app**.

---

## 🧠 **Chatbot Architecture**
The chatbot leverages a **modular, agent-based design**, where each agent is specialized for a specific task. This ensures scalability, efficiency, and platform-agnostic functionality across Android, iOS, and the web.

![Architecture Image](images/chatbot_agent_architecture.jpg)

### 🤖 **Core Agents**
1. **Guard Agent**: Filters out harmful or irrelevant queries at the entry point.
2. **Order Taking Agent**: Facilitates smooth, step-by-step order placement.
3. **Details Agent (RAG)**: Retrieves precise menu details such as ingredients and allergens.
4. **Recommendation Agent**: Suggests complementary products using a **market basket analysis engine**.
5. **Classification Agent**: Routes queries to the appropriate agent based on intent.

### ⚙️ **Workflow Overview**
1. The **Guard Agent** analyzes incoming queries and blocks inappropriate requests.
2. The **Classification Agent** directs valid queries to the relevant agents:
   - **Order Taking Agent** handles orders and invokes the **Recommendation Agent** for upselling.
   - **Details Agent** fetches menu-related details.
   - **Recommendation Agent** identifies complementary items based on user selections.

---

## 📱 **React Native App Features**
The front-end is a **React Native-based mobile app** designed to provide an intuitive and seamless customer experience. 
<p align="center">
   <img src="images/ReactNativeApp.gif" alt="App_GIF">
</p>

### Core Screens
- **Landing Page**: Welcome screen for the app.
- **Home Page**: Displays featured menu items and categories.
- **Item Details Page**: Detailed product information, including allergen and ingredient data.
- **Cart Page**: Lets users review and modify orders before checkout.
- **Chatbot Interface**: Allows users to interact with the AI-powered chatbot for assistance.

---

## 📂 **Directory Structure**
```plaintext
coffee_shop_customer_service_chatbot/
├── coffee_shop_app_folder/               # React Native app code
├── python_code/
│   ├── API/                              # Chatbot API for agent-based system
│   ├── dataset/                          # Dataset for recommendation engine
│   ├── products/                         # Product data (names, prices, descriptions, images)
│   ├── build_vector_database.ipynb       # Script to build vector database for RAG
│   ├── firebase_uploader.ipynb           # Upload product data to Firebase
│   ├── recommendation_engine_training.ipynb # Model training for recommendation engine
```

## 🚀 Getting Started
Each folder includes specific instructions for setup and deployment.

## 🔗 Reference Links
- [RunPod](https://runpod.io) - Infrastructure for deploying and scaling machine learning models.
- [Kaggle Dataset](https://kaggle.com) - The dataset was used to train the recommendation engine.
- [Figma Design](https://figma.com) - App design mockups.
- [Hugging Face](https://huggingface.co) - Llama NLP model repository.
- [Pinecone](https://www.pinecone.io) - Vector database documentation.
- [Firebase](https://firebase.google.com) - Firebase documentation for managing app data.

---

Feel free to use and adapt this repository for your coffee shop chatbot project!

