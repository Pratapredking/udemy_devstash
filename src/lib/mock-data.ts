export const mockUser = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  isPro: false,
};

export const mockItemTypes = [
  { id: "type_snippet", name: "Snippet", icon: "code", isSystem: true, count: 24 },
  { id: "type_prompt", name: "Prompt", icon: "sparkles", isSystem: true, count: 18 },
  { id: "type_command", name: "Command", icon: "terminal", isSystem: true, count: 15 },
  { id: "type_note", name: "Note", icon: "file-text", isSystem: true, count: 12 },
  { id: "type_file", name: "File", icon: "paperclip", isSystem: true, count: 5 },
  { id: "type_image", name: "Image", icon: "image", isSystem: true, count: 3 },
  { id: "type_url", name: "URL", icon: "link", isSystem: true, count: 8 },
];

export const mockCollections = [
  {
    id: "col_1",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    itemCount: 12,
    isFavorite: true,
    icons: ["code", "link", "paperclip"],
  },
  {
    id: "col_2",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    itemCount: 8,
    isFavorite: false,
    icons: ["code", "file-text"],
  },
  {
    id: "col_3",
    name: "Context Files",
    description: "AI context files for projects",
    itemCount: 5,
    isFavorite: true,
    icons: ["paperclip", "file-text"],
  },
  {
    id: "col_4",
    name: "Interview Prep",
    description: "Technical interview preparation",
    itemCount: 24,
    isFavorite: false,
    icons: ["code", "link", "paperclip", "terminal"],
  },
  {
    id: "col_5",
    name: "Git Commands",
    description: "Frequently used git commands",
    itemCount: 15,
    isFavorite: true,
    icons: ["terminal", "file-text"],
  },
  {
    id: "col_6",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    itemCount: 18,
    isFavorite: false,
    icons: ["sparkles", "file-text"],
  },
];

export const mockItems = [
  {
    id: "item_1",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "text",
    content: `import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthP...')
  }
  return context
}`,
    typeId: "type_snippet",
    typeName: "Snippet",
    collectionId: "col_1",
    collectionName: "React Patterns",
    tags: ["react", "auth", "hooks"],
    language: "typescript",
    isFavorite: true,
    isPinned: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "text",
    content: `async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(res.statusText)
      return await res.json()
    } catch (err) {
      if (i === retries - 1) throw err
      await new Promise(r => setTimeout(r, 2 ** i * 1000))
    }
  }
}`,
    typeId: "type_snippet",
    typeName: "Snippet",
    collectionId: "col_1",
    collectionName: "React Patterns",
    tags: ["typescript", "api", "error-handling"],
    language: "typescript",
    isFavorite: false,
    isPinned: true,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
  },
  {
    id: "item_3",
    title: "Git stash workflow",
    description: "Save and restore work in progress",
    contentType: "text",
    content: `git stash push -m "wip: feature name"
git stash list
git stash pop`,
    typeId: "type_command",
    typeName: "Command",
    collectionId: "col_5",
    collectionName: "Git Commands",
    tags: ["git", "workflow"],
    language: "bash",
    isFavorite: false,
    isPinned: false,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: "item_4",
    title: "Explain this code",
    description: "Prompt for explaining unfamiliar code",
    contentType: "text",
    content: `Explain the following code to me as if I'm a senior developer:
- What does it do?
- What patterns does it use?
- Are there any potential issues?

\`\`\`
[paste code here]
\`\`\``,
    typeId: "type_prompt",
    typeName: "Prompt",
    collectionId: "col_6",
    collectionName: "AI Prompts",
    tags: ["ai", "code-review"],
    language: null,
    isFavorite: true,
    isPinned: false,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08",
  },
  {
    id: "item_5",
    title: "React Query setup note",
    description: "Notes on setting up TanStack Query v5",
    contentType: "text",
    content: `## TanStack Query v5 Setup

Install: npm i @tanstack/react-query

Wrap app with QueryClientProvider. Use useQuery for reads, useMutation for writes.

Breaking changes from v4: removed onSuccess/onError callbacks from useQuery.`,
    typeId: "type_note",
    typeName: "Note",
    collectionId: "col_1",
    collectionName: "React Patterns",
    tags: ["react", "tanstack", "setup"],
    language: null,
    isFavorite: false,
    isPinned: false,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-06",
  },
];
