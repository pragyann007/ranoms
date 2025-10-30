import { responseFunc } from "../utils/carearIdea.js";
import axios from "axios"

export const suggestions = async (req, res) => {

    const { answer1, answer2, answer3, answer4, answer5 } = req.body;

    const answers = {
        answer1,
        answer2,
        answer3,
        answer4,
        answer5

    }

    const suggestion_AI = await responseFunc(answers)



    return res.status(200).json(suggestion_AI);

}

const YT_API_KEY = process.env.YT_API_KEY

export const resources = async (req,res)=>{
    const query = req.query.q;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=5&type=video&key=${YT_API_KEY}`
    );
    const results = response.data.items.map(item => ({
      title: item.snippet.title,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails.high.url,
      channel: item.snippet.channelTitle
    }));
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}