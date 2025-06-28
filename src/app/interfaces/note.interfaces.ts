export interface INotes {
  title: string;
  content: string;
  category: "personal" | "work" | "study";
  pinned: boolean;
}
