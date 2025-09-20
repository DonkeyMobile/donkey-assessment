import mongoose from "mongoose";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

// MongoDB and API setup
const MONGO_URI = "mongodb://localhost:27017/Assessment_MO";
const API_BASE = "http://localhost:3000";
const USERS = `${API_BASE}/users`;
const TIMELINES = `${API_BASE}/timelines`;
const POSTS = `${API_BASE}/posts`;
const COMMENTS = `${API_BASE}/comments`;
const ATTACHMENTS = `${API_BASE}/attachments/upload`;

async function runTest() {
  let userId, timelineId, postId, commentId, attachmentId;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Create user
    const userRes = await axios.post(USERS, {
      name: "Test Author",
      email: "author@example.com"
    });
    userId = userRes.data._id;
    console.log("👤 User created:", userId);

    // Create timeline
    const timelineRes = await axios.post(TIMELINES, {
      title: "Test Timeline",
      description: "For post testing",
      userId
    });
    timelineId = timelineRes.data._id;
    console.log("🗓️ Timeline created:", timelineId);

    // Create post
    const postRes = await axios.post(POSTS, {
      title: "Test Post",
      content: "This is a test post with comment.",
      timelineId,
      userId,
      comments: [
        {
          content: "Initial comment",
          userId
        }]
    });
    postId = postRes.data._id;
    console.log("📝 Post created with one comment:", postId);

    // Upload attachment
    const form = new FormData();
    form.append("file", fs.createReadStream(path.join("tests", "DonkeyMobile.png")));
    form.append("postId", postId);

    const attachRes = await axios.post(ATTACHMENTS, form, {
      headers: form.getHeaders()
    });
    attachmentId = attachRes.data.id;
    console.log("📎 Attachment uploaded:", attachmentId);

    // Get post
    const getPostRes = await axios.get(`${POSTS}/${postId}`);
    console.log("🔍 Retrieved post:", getPostRes.data);

    // Update post
    const updatedPostRes = await axios.patch(`${POSTS}/${postId}`, {
      title: "Updated Test Post",
      content: "This post has been updated with new content."
      });
    console.log("✏️ Post updated:", updatedPostRes.data);


    //
    // Cleanup
    //

    await axios.delete(`${POSTS}/${postId}`);
    console.log("🧹 Post deleted with cascaded delete of attachments");

    await axios.delete(`${TIMELINES}/${timelineId}`);
    console.log("🧹 Timeline deleted");

    await axios.delete(`${USERS}/${userId}`);
    console.log("🧹 User deleted");

  } catch (err) {
    if (err.response) {
      console.error("❌ API error:", err.response.status, err.response.data);
    } else {
      console.error("❌ Unexpected error:", err.message);
    }
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

runTest();
