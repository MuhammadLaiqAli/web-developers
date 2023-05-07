import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper
} from "@mui/material";


function ImageClassifier(props) {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Request access to the user's camera
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };
    getMedia();
  }, []);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - 5 - min + 1)) + min;
  }

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!video) return;

    // Draw the video frame onto the canvas
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data URL
    const dataURL = canvas.toDataURL("image/jpeg");

    // Convert data URL to Blob
    const base64Image = dataURL.split(",")[1];
    const byteCharacters = atob(base64Image);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    // Set the captured image
    setImage(blob);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!image) return;
    setIsLoading(true); // Set loading to true before making the API request

    const apiKey = "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";
    const endpoint =
      "https://api-inference.huggingface.co/models/nateraw/vit-age-classifier";

    // Read image file as binary data
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(image);
    fileReader.onload = async () => {
      const imageBytes = btoa(fileReader.result);

      // Make API request to Hugging Face model
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: {
            image: imageBytes
          }
        })
      });

      const data = await response.json();

      // Find the prediction with the maximum score
      const maxPrediction = data.reduce(
        (max, prediction) => {
          return prediction.score > max.score ? prediction : max;
        },
        { label: "", score: -Infinity }
      );

      // Generate a random age between the label bounds
      const ageRange = maxPrediction.label.split("-");
      const minAge = parseInt(ageRange[0], 10);
      const maxAge = parseInt(ageRange[1], 10);
      const randomAge = getRandomInt(minAge, maxAge);

      // Update the result state
      setResult(`Predicted Age: ${randomAge}`);
      setIsLoading(false);
    };
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Image Classifier
        </Typography>
        <video ref={videoRef} autoPlay muted width="640" height="480"></video>
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ display: "none" }}
        ></canvas>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={captureImage}
            sx={{ mr: 1 }}
          >
            Capture Image
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleImageUpload}
            disabled={!image || isLoading}
          >
            Upload Image
          </Button>
        </Box>
        {isLoading && (
          <Box sx={{ mt: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {result && (
          <Paper sx={{ mt: 4, p: 2 }}>
            <Typography variant="h6">Result:</Typography>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default ImageClassifier;