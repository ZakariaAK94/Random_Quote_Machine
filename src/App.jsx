import { useEffect, useState } from "react";
import { FaTwitter, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

function App() {

  const URL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
  const getRandomIndex = (arrayLength) =>  Math.floor(Math.random() * arrayLength);
  const getRandomColor = () => {
    let color;
    do {
      color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
    } while (isTooLight(color));
    return color;
  };
  
  const isTooLight = (color) => {
    // Convert HEX to RGB
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
  
    // Calculate brightness using the luminance formula
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    return brightness > 0.5; // Adjust threshold as needed (0.8 = very light)
  };
  
  const [quotes, setQuotes] = useState([]);  
  const [randomColor, setRandomColor] = useState(getRandomColor());
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [isVisible, setIsVisible] = useState(true);
  
  const handleNewQuote = () => {
    setIsVisible(false); 
    setTimeout(() => {
      setQuote(quotes[getRandomIndex(quotes.length)]);
      setRandomColor(getRandomColor());
      setIsVisible(true); 
    }, 800); 
  };

  
  useEffect(() => {
    const fetchData = async () => 
    {
      try {
        const response = await fetch(URL);
        const data = await response.json();           
        setQuote(data.quotes[getRandomIndex(data.quotes.length)]); 
        setQuotes(data.quotes);   
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };  
    fetchData();    
  }, []);


  const transition = "all 1s";

  return (
    <div className="container" style={{ backgroundColor: randomColor, transition }}>
        <div id="quote-box">
          <h3 id="text" style={{ color: randomColor, transition: "opacity 1s",  opacity: isVisible ? 1 : 0}} >
              <FaQuoteLeft size="20" style={{ marginRight: "10px" }} />
                {quote.quote}
            <FaQuoteRight size="20" style={{ marginRight: "10px" }} />
          </h3>
          <h4 id="author" style={{ color: randomColor, transition: "opacity 1s",  opacity: isVisible ? 1 : 0 }}>
             - {quote.author} 
          </h4>
          <div className="btns-quote">
          <a
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote.quote}`}
            id="tweet-quote"
            type="button"
            style={{ backgroundColor: randomColor, transition}}
            target="_blank"
            rel="noopener noreferrer"
          >
              <FaTwitter color="white" />
          </a>
          <button
            id="new-quote"
            onClick={handleNewQuote}
            style={{ backgroundColor: randomColor, transition}}
          >
            New Quote
          </button>
          </div>         
     </div>
    </div>
    
  );
}

export default App;

