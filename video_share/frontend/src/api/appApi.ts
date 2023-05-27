import { authedInstance } from ".";
import { Post, Profile } from "../models";

export const appApi = {
  async getPosts(): Promise<Post[]> {
    const { data } = await authedInstance.get("posts/");
    return data;
  },
  async getPostDrafts() {
    const { data } = await authedInstance.get("post-draft-list/");
    return data;
  },
  async getProfile(): Promise<Profile> {
    const { data } = await authedInstance.get("profile/");
    return data;
  },
};
