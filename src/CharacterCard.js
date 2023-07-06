import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import App from "./App";

import { useState } from "react";

<Typography variant="h5" align="center" color="text.secondary" sx={{ mx: 10 }}>
  heyy:
</Typography>;

function askopenai(userPrompt) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer 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"
  );
  console.log(userPrompt);
  // console.log(document.getElementById("fullWidth").innerHTML);

  var raw = JSON.stringify({
    model: "text-davinci-003",
    // prompt: "write a poem about my mom. she loves to cook",
    prompt: userPrompt,
    max_tokens: 200,
    temperature: 0,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // fetch("https://api.openai.com/v1/completions", requestOptions)
  //   .then((response) => response.json())
  //   // .then((result) => console.log(result.choices[0].text))
  //   .then(
  //     (result) =>
  //       (document.getElementById("input").innerHTML = result.choices[0].text)
  //   )

  //   .catch((error) => console.log("error", error));
}
//
var requestOptions = {
  method: "GET",
  redirect: "follow",
};

export default function CharacterCard(props) {
  // Each card is initialized as a Disney character until card button is pressed.
  const [catImg, setCatImg] = useState(props.image);
  const [catBreed, setCatBreed] = useState(props.characterName);
  const [description, setDescription] = useState(props.descriptionArray);

  async function getCat() {
    // Get a random cat image
    // the "has_breeds=1" is important for the second part
    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?has_breeds=1",
      requestOptions
    );
    const data = await response.json();
    // get the first cat in the response data array
    const catData = data[0];

    // Save URL of cat image
    setCatImg(catData.url);

    // Use the cat's ID to make a new request for cat info
    const catId = catData.id;
    const infoResponse = await fetch(
      `https://api.thecatapi.com/v1/images/${catId}`,
      requestOptions
    );
    const catInfo = await infoResponse.json();
    setCatBreed(catInfo.breeds[0].name);

    // split the string into an array so we make bullet points later
    const temperamentList = catInfo.breeds[0].temperament.split(", ");
    setDescription(temperamentList);
  }

  return (
    <Card>
      {/* <CardMedia component="img" height="350px" image={catImg} />
      <CardHeader
        title={catBreed}
        titleTypographyProps={{ align: "center" }}
        sx={{ mt: 1 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <ul>
          {description.map((sentence) => (
            <Typography component="li" key={sentence}>
              {sentence}
            </Typography>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{ px: 6, mx: "auto" }}
          onClick={() => {
            getCat();
          }}
        >
          GET CAT
        </Button>
      </CardActions> */}
    </Card>
  );
}
