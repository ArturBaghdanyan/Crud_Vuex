import request from "../helpers/fetch.js";

export const getList = async () => {
  try {
    return await request('/posts', { method: 'GET' });

  } catch(error) {
    console.log('response is not defined', error)
  }
};

export const createPost = async (newPost) => {
  try {
    const response = await request('/posts', {
      method: "POST",
      data: {
        title: newPost.title,
        body: newPost.body,
      },
    });
    if (!response) {
      throw new Error("No response from server");
    }
    return response;

  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePost = async (updatedPost) => {
  try {
    return await request(`/posts/${updatedPost.id}`, {
      method: "PUT",
      data: {
        id: updatedPost.id,
        title: updatedPost.title,
        body: updatedPost.body,
      },
    })
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await request(`/posts/${postId}`, {
      method: "DELETE",
    });
    if (!response) {
      throw new Error("No response from server");
    }
    return response;

  } catch(error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

