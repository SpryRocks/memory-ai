# Memory AI

**Memory AI** is an intelligent knowledge and chat management system that combines the power of cloud-based AI with local vector search.

### Core Features
* **Permanent Storage:** Guided by the "Zero Deletion" principle — no information is ever removed from the knowledge base, creating a long-term digital memory.
* **Smart Chats:** Isolated dialogues with full history support and dynamic message lazy-loading.
* **Hashtag-Driven Context:**
    * Interconnects separate chats into a unified network via tags.
    * Enables cross-chat message sharing based on matching hashtags.
* **Hybrid Intelligence:**
    * **Generative:** Leveraging the Gemini API for high-quality response generation.
    * **Semantic Search:** A local AI model retrieves the 20 most relevant messages from the entire database + the 5 most recent messages to maintain immediate context.

### Tech Stack
* **Framework:** Next.js (React)
* **Vector Database:** LanceDB
* **Relational Layer:** SQLite + Prisma
* **Infrastructure:** Docker
