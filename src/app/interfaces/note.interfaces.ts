import { Types } from "mongoose";

export interface INotes {
  title: string;
  content: string;
  category: "personal" | "work" | "study";
  pinned: boolean;
  user: Types.ObjectId;
}
