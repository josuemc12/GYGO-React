import React, { useEffect, useState, useRef } from "react";
import { Card, List, ListItem, ListItemText, Divider, Grid, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import * as signalR from "@microsoft/signalr";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAuth } from "context/AuthContext";

const HUB_URL = "http://localhost:5135/chatHub"; // Cambia esto por tu URL real

export function Messages() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { id: username } = useAuth(); // Cambia esto por el usuario real
  const connectionRef = useRef(null);

  // Conexión SignalR
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL)
      .withAutomaticReconnect()
      .build();

    connection.start().then(() => {
      // Obtener chats del usuario
      connection.invoke("getChats", username);
    });

    // Recibir lista de chats
    connection.on("ReceiveChats", (userConnections) => {
      setChats(userConnections);
      if (userConnections.length > 0 && !selectedChat) {
        setSelectedChat(userConnections[0]);
      }
    });

    // Recibir historial de mensajes
    connection.on("ReceiveMessages", (messagesHistory) => {
      setMessages(messagesHistory);
    });

    // Recibir mensajes nuevos
    connection.on("ReceiveSpecificMessage", (user, msg) => {
      setMessages((prev) => [...prev, { msg }]);
    });

    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
    // eslint-disable-next-line
  }, []);

  // Unirse a la sala y obtener historial cuando cambia el chat seleccionado
  useEffect(() => {
    if (selectedChat && connectionRef.current) {
      connectionRef.current.invoke("JoinSpecificChatRoom", {
        Id:selectedChat.id || selectedChat.Id,
        username : selectedChat.username ,
        Chatroom: selectedChat.chatroom
      });
      connectionRef.current.invoke("OnConnect", {
        Id:selectedChat.id || selectedChat.Id,
        username: selectedChat.username ,
        Chatroom: selectedChat.chatroom
      });
    }
  }, [selectedChat, username]);

  const handleSend = () => {
    if (input.trim() && connectionRef.current && selectedChat) {
      connectionRef.current.invoke("SendMessage", input, selectedChat.username);
      setInput(""); 
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox p={2}>
        <Grid container spacing={2}>
          {/* Sidebar de chats */}
          <Grid item xs={12} md={4} lg={3}>
            <Card sx={{ height: "80vh", overflow: "auto" }}>
              <MDTypography variant="h6" p={2}>
                Chats
              </MDTypography>
              <Divider />
              <List>
                {chats.map((chat, idx) => (
                  <ListItem
                    button
                    key={ chat.Chatroom || idx}
                    selected={
                      selectedChat &&
                      (selectedChat.chatroom || selectedChat.Chatroom) ===
                        (chat.chatroom || chat.Chatroom)
                    }
                    onClick={() => setSelectedChat(chat)}
                  >
                    <ListItemText
                      primary={selectedChat.username || selectedChat.Username}
                      secondary={chat.lastMessage || ""}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
          {/* Chat principal */}
          <Grid item xs={12} md={8} lg={9}>
            <Card sx={{ height: "80vh", display: "flex", flexDirection: "column" }}>
              <MDBox p={2} flex={1} sx={{ overflowY: "auto" }}>
                <MDTypography variant="h6" mb={2}>
                  {selectedChat
                    ? selectedChat.username || selectedChat.Username
                    : "Selecciona un chat"}
                </MDTypography>
                <Divider />
                <List>
                  {messages.map((msg, idx) => (
                    <ListItem
                      key={idx}
                      alignItems={msg.username === selectedChat.username ? "right" : "left"}
                    >
                      <ListItemText
                        primary={msg.messageText}
                        secondary={new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        sx={{
                          textAlign: msg.username === selectedChat.username ? "right" : "left",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </MDBox>
              {/* Input para enviar mensaje */}
              {selectedChat && (
                <MDBox
                  p={2}
                  display="flex"
                  alignItems="center"
                  borderTop="1px solid #eee"
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Escribe un mensaje..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <IconButton color="primary" onClick={handleSend}>
                    <SendIcon />
                  </IconButton>
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}