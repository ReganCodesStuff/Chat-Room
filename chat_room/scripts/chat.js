import {
  collection,
  query,
  onSnapshot,
  where,
  addDoc,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { db } from "./app.js";


class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = collection(db, "chats");
    this.unsub = null; // Initialize unsub as null
  }

  async addChat(message) {
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: new Date(),
    };

    try {
      const docRef = await addDoc(this.chats, chat);
      console.log("Chat added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding chat:", error);
    }
  }

  getChats(callback) {
    const filteredQuery = query(
      this.chats,
      where("room", "==", this.room),
      orderBy("created_at")
    );
    this.unsub = onSnapshot(filteredQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const chatData = change.doc.data();
          callback(chatData);
        }
      });
    });
  }

  updateName(username){
    this.username = username;
  }

  updateChats(username) {
    this.username = username;
  }

  updateRoom(room) {
    this.room = room;
    console.log("Room updated:", room); // Changed console.log message
    if (this.unsub) {
      this.unsub();
    }
  }
}

let chatroom; // Define chatroom in a higher scope

async function initChatroom() {
  chatroom = new Chatroom("general", "tracy");

  await chatroom.addChat("i eat dhicken nugget");

  chatroom.getChats((data) => {
    console.log("Received chat:", data);
  });
}

initChatroom();

setTimeout(() => {
  chatroom.updateRoom("general")
  chatroom.updateName("shaun"); // Assuming you meant updateChats instead of updateName
  chatroom.getChats((data) => {
    console.log("Received chat:", data);
  });
  chatroom.addChat("hello")
}, 3000);

export { db }