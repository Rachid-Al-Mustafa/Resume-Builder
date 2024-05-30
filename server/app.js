const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {mongoConnection} = require("./utils/mongoConnection");
const verifyToken = require("./utils/verifyToken");
const {handleError} = require("./utils/error");

const app = express();

app.use(express.json());
dotenv.config();
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log("Server connected");
});

// Routes
const AuthRoutes = require("./routes/AuthRoutes");
const UserRoutes = require("./routes/UserRoutes");
const SkillRoutes = require('./routes/SkillRoutes');
const LanguageRoutes = require('./routes/LanguageRoutes');
const EducationRoutes = require('./routes/EducationRoutes');
const ExperienceRoutes = require('./routes/ExperienceRoutes');
const ResumeRoutes = require('./routes/ResumeRoutes');

app.use("/api", AuthRoutes);

app.use(verifyToken);

app.use("/api/user", UserRoutes);
app.use('/api/skill', SkillRoutes);
app.use('/api/language', LanguageRoutes);
app.use('/api/education', EducationRoutes);
app.use('/api/experience', ExperienceRoutes);
app.use('/api/resume', ResumeRoutes);

app.use(handleError);

mongoConnection;

module.exports = app