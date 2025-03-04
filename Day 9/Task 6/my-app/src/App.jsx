import React, { useEffect, useState } from "react";
import { Container, Alert, Card, CardContent, Typography, Grid, CircularProgress } from "@mui/material";
import axios from "axios";
import "./App.css";

// Student Card Component
const StudentCard = ({ student }) => {
  return (
    <Card sx={{ minWidth: 275, borderRadius: 2, boxShadow: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {student.name}
        </Typography>
        <Typography variant="body2">
          <strong>ID:</strong> {student.rollNo || "N/A"}
        </Typography>
        <Typography variant="body2">
          <strong>Major:</strong> {student.major || "Not Provided"}
        </Typography>
        <Typography variant="body2">
          <strong>Age:</strong> {student.age || "Not Available"}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Student List Component
const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/students") // Ensure backend is running on correct port
      .then((response) => {
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          setError("Unexpected data format from server.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Fetch Error:", err);
        setError("Failed to connect to the backend. Ensure server is running.");
        setLoading(false);
      });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Student Information
      </Typography>

      {/* Loading State */}
      {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />}

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ my: 2, textAlign: "center" }}>
          {error}
        </Alert>
      )}

      {/* Student Data Grid */}
      {!loading && !error && (
        <Grid container spacing={3} justifyContent="center">
          {students.length > 0 ? (
            students.map((student) => (
              <Grid item key={student._id} xs={12} sm={6} md={4} lg={3}>
                <StudentCard student={student} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align="center" sx={{ width: "100%" }}>
              No students found.
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default StudentList;

