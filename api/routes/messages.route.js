import { Router } from "express";
import Messages from "../models/message.js";

const router = Router();

router.post("/api/messages/createnew", async (req, res) => {
  const { title, content } = req.body;

  try {
    const message = new Messages({
      title,
      content,
      nutricionista: req.body.nutricionista,
      user: req.body.user,
    });

    await message.save();
    return res.json(message);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/api/messages/:user", async (req, res) => {
  const messagesUser = await Messages.find({ user: req.params.user });
  return res.json(messagesUser);
});

router.delete("/api/messages/:id", async (req, res) => {
  const deleteMessage = await Messages.findByIdAndDelete(req.params.id);

  res.json(deleteMessage);
});

export default router;
