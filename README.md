# 🎧 Shiona Music

Welcome to **Shiona Music** – a modern, full-stack music streaming app built with **React Native**, **Expo**, **TypeScript**, **NativeWind**, and powered by a **C# ASP.NET Core API** backend.

---

## 🧱 Tech Stack

| Layer       | Technology                                                              |
| ----------- | ----------------------------------------------------------------------- |
| Frontend    | [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)    |
| Styling     | [NativeWind (Tailwind CSS for RN)](https://www.nativewind.dev/)         |
| State Mgmt  | [Zustand](https://github.com/pmndrs/zustand) – lightweight global state |
| Language    | TypeScript                                                              |
| Backend API | C# (.NET 8) - ASP.NET Core Web API                                      |
| Database    | Entity Framework + SQL Server (or SQLite for local dev)                 |
| API Comm.   | REST via Fetch or Axios                                                 |
| Audio       | [expo-av](https://docs.expo.dev/versions/latest/sdk/av/) (coming soon)  |

---

## ⚙️ State Management with Zustand

Zustand is used to manage global state such as user authentication, loading states, and API data. It offers a simple and performant alternative to other solutions like Redux.

> Example use cases in Shiona Music:

- Handling login and registration logic
- Managing authentication tokens
- Globally tracking loading and error states

Zustand allows API logic and global state to live in a centralized store, keeping components clean and reactive.

---

## 🚀 Getting Started

### 📦 Backend (C# API)

> Navigate to the API project folder:

```bash
cd MusicLibraryApi/MusicLibraryApi
dotnet run
```
