import cloudinary from "../lib/cloudinary.js";
import User from "../models/auth.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js"; // Import the function

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    // here were are getting all user except ourself
    const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password",
    );

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in Get User for Sidebar Controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // their id
    const myId = req.user._id; // our id

    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in get Messages controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    // taking all the text image receiver id sender id
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let ImageUrl;

    // checking if image is there then uploading to cloudinary
    if (image) {
      const Imageresponse = await cloudinary.uploader.upload(image);
      ImageUrl = Imageresponse.secure_url;
    }

    // making new message
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: ImageUrl,
    });

    // saving new message
    await newMessage.save();
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in send Message controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const handleDeleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    await Message.findByIdAndDelete(id);

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log("Error in handle delete message controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const handleEditMessage = async (req, res) => {
  const { id } = req.params;
  const { editText } = req.body;
  try {
    const messageId = await Message.findById(id);
    if (!messageId) {
      return res.status(400).json({ error: "Message id not found" });
    }
    const updateMessage = await Message.findByIdAndUpdate(
      id,
      { text: editText },
      { new: true },
    );
    if (!updateMessage) {
      return res.status(400).json({ error: "Update Message Failed" });
    }
    const receiverSocketId = getReceiverSocketId(updateMessage.receiverId);
console.log(`Receiver Socket ID: ${receiverSocketId}`);

    if (receiverSocketId) {
      console.log("Emitting edited message to receiver");
      io.to(receiverSocketId).emit("editedMessage", {
        messageId: updateMessage._id,
        newText: updateMessage.text,
      });
    }


    // const receiverSocketId = getReceiverSocketId(updateMessage.receiverId);
    // console.log("id of receiver socket : ", receiverSocketId)
    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("editedMessage", {
    //     messageId: updateMessage._id,
    //     newText: updateMessage.text,
    //   });
    // }

    return res.status(200).json({
      message: "Updated message successfully",
      updatedMessage: updateMessage,
    });
  } catch (error) {
    console.log("Error in handle edit message controller");
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleReaction = async (req, res) => {
  const { id } = req.params;
  const { reactionEdit } = req.body;
  try {
    const messageId = await Message.findById(id);
    if (!messageId) {
      res.status(400).json({ error: "Message Id not found" });
    }
    const reactionUpdate = await Message.findByIdAndUpdate(
      id,
      {
        reaction: reactionEdit,
      },
      { new: true },
    );
    if (!reactionUpdate) {
      return res.status(400).json({ error: "Reaction not Updated" });
    } else {
      return res.status(200).json({ message: "Reaction updated successfully" });
    }
  } catch (error) {
    console.log("Error in handle reaction update controller");
    res.status(500).json({ message: "Internal server error" });
  }
};
