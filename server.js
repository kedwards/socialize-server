const express = require("express");
const cors = require("cors");
const formData = require("express-form-data");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(formData.parse());

// app.get("/", (req, res) => {
//     res.send(`Socialize API v1`);
// });

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/uploads", require("./routes/api/uploads"));

// Serve static assets in prod
if (process.env.NODE_ENV === "production") {
    app.use(express.static("../socialize-client/build"));

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname,
                "../socialize-client",
                "build",
                "indexedDB.html",
            ),
        );
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
