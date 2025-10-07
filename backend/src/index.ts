import express from "express";
import cors from "cors";
import db from "./config/firebaseConfig";
import dotenv from "dotenv";

dotenv.config();

//  1.  We need to create CRUD endpoints
//   2.  The entries (users) can just be saved in a noSQL database (Bonus for using Firebase Realtime Database)
//   3.  Each user should have the following data entries:
//         id, name, zip code, latitude, longitude, timezone
//   4.  When creating a user, allow input for name and zip code.
//       (Fetch the latitude, longitude, and timezone - Documentation: https://openweathermap.org/current)
//   5.  When updating a user, Re-fetch the latitude, longitude, and timezone (if zip code changes)
//   6.  Connect to a ReactJS front-end

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server
    credentials: true,
  })
);

app.use(express.json());

// get the weather data from the openweathermap api
const getWeather = async (zipCode: string) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${process.env.OPENWEATHER_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.cod === "404") {
    throw new Error(`Invalid zip code: ${zipCode}`);
  }

  if (data.cod !== 200) {
    throw new Error(`Weather API error: ${data.message}`);
  }

  return {
    latitude: data.coord.lat,
    longitude: data.coord.lon,
    timezone: data.timezone,
  };
};

app.get("/users", (req, res) => {
  const users = db.ref("users").get();
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const user = req.body;
    const { name, zipCode } = user;

    if (!zipCode) {
      res.status(400).json({ message: "Zip code is required" });
      return;
    }
    if (!name) {
      res.status(400).json({ message: "Name is required" });
      return;
    }

    const { latitude, longitude, timezone } = await getWeather(zipCode);
    const payload = { name, zipCode, latitude, longitude, timezone };
    const newUserRef = db.ref("users").push(payload);

    const newUserSnapshot = await newUserRef.once("value");
    const newUserData = newUserSnapshot.val();

    res.status(201).json({ message: "User created", data: newUserData });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Invalid zip code")) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error creating user" });
    }
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const userRef = db.ref("users").child(req.params.id);
    const snapshot = await userRef.once("value");

    if (!snapshot.exists()) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { name, zipCode } = req.body;

    if (!zipCode || !name) {
      res.status(400).json({ message: "Zip code or name is required" });
      return;
    }

    const existingUser = snapshot.val();
    // if the zip code is changed, then get the new latitude, longitude, and timezone
    if (zipCode && zipCode !== existingUser.zipCode) {
      console.log("Zip code changed");
      const { latitude, longitude, timezone } = await getWeather(zipCode);
      const payload = { name, zipCode, latitude, longitude, timezone };
      await userRef.update(payload);
    } else {
      const payload = { name, zipCode };
      await userRef.update(payload);
    }

    const updatedSnapshot = await userRef.once("value");
    const updatedUser = updatedSnapshot.val();

    res.status(200).json({ message: "User updated", data: updatedUser });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Invalid zip code")) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error updating user" });
    }
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const userRef = db.ref("users").child(req.params.id);
    const snapshot = await userRef.once("value");
    if (!snapshot.exists()) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await userRef.remove();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
