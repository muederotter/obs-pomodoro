import React, { useState, useEffect } from 'react';
import './styles/timer-setup.css';
import './styles/fonts.css';


function App() {
  // State variables for form input
  const [focus, setFocus] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [reps, setReps] = useState(4);
  const [color, setColor] = useState('#000000');
  const [sessionFont, setSessionFont] = useState('VT323');
  const [timerFont, setTimerFont] = useState('VT323');
  const [alignment, setAlignment] = useState('left');
  const [link, setLink] = useState('');


  useEffect(() => {
    // Add the custom body class
    document.body.classList.add('green-background');

    // Cleanup: remove the class when the component unmounts
    return () => {
      document.body.classList.remove('green-background');
    };
  }, []);

  // Function to update the preview and link
  useEffect(() => {
    const updatedLink = `https://muederotter.github.io/timer?focus=${focus}&break=${breakTime}&reps=${reps}&color=${encodeURIComponent(color)}&timerFont=${encodeURIComponent(timerFont)}&sessionFont=${encodeURIComponent(sessionFont)}&alignment=${alignment}`;
    setLink(updatedLink);
  }, [focus, breakTime, reps, color, sessionFont, timerFont, alignment]);

  const handleLinkClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="tsbody">
      <h1 className='tsh1'>Petite Pomodoro</h1>
      <div className="tscontainer">
        <div className="tsformcontainer">
          <form className='tsform' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="focus">Focus:</label>
            <input
              type="number"
              id="focus"
              name="focus"
              min="1"
              max="60"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              required
            />
            <label htmlFor="focus">min</label><br /><br />

            <label htmlFor="break">Break:</label>
            <input
              type="number"
              id="break"
              name="break"
              min="1"
              max="60"
              value={breakTime}
              onChange={(e) => setBreakTime(e.target.value)}
              required
            />
            <label htmlFor="break">min</label><br /><br />

            <label htmlFor="reps">Reps:</label>
            <input
              type="number"
              id="reps"
              name="reps"
              min="1"
              max="20"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              required
            /><br /><br />

            <label htmlFor="color">Color:</label>
            <input
              type="color"
              id="color"
              name="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            /><br /><br />

            <label htmlFor="sessionFont">Session Font:</label>
            <select
              name="sessionFont"
              id="sessionFont"
              value={sessionFont}
              onChange={(e) => setSessionFont(e.target.value)}
            >
              <option value="VT323">VT323</option>
              <option value="MontserratBold">Montserrat Bold</option>
              <option value="MontserratBoldItalic">Montserrat Bold Italic</option>
            </select><br /><br />

            <label htmlFor="timerFont">Timer Font:</label>
            <select
              name="timerFont"
              id="timerFont"
              value={timerFont}
              onChange={(e) => setTimerFont(e.target.value)}
            >
              <option value="VT323">VT323</option>
              <option value="MontserratBold">Montserrat Bold</option>
              <option value="MontserratBoldItalic">Montserrat Bold Italic</option>
            </select><br /><br />

            <label htmlFor="alignment">Alignment:</label>
            <select
              name="alignment"
              id="alignment"
              value={alignment}
              onChange={(e) => setAlignment(e.target.value)}
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </form>
        </div>

        <div className="tssubcontainer">
          <p id="previewtext">Preview:</p>
          <div className="tspreviewcontainer">
            <div
              id="preview"
              style={{
                color: color,
                textAlign: alignment,
              }}
            >
              <p
                style={{
                  fontSize: '33px',
                  marginBottom: '-20px',
                  marginLeft: '10px',
                  marginRight: '10px',
                  marginTop: '0px',
                  paddingTop: '0px',
                  fontFamily: sessionFont,
                }}
              >
                Focus
              </p>
              <p
                style={{
                  fontSize: '100px',
                  marginTop: '0',
                  marginBottom: '10px',
                  paddingBottom: '0px',
                  fontFamily: timerFont,
                }}
              >
                {focus.toString().padStart(2, '0')}:00
              </p>
            </div>
          </div>
        </div>
      </div>

      <p>
        Link: <a href={link} onClick={handleLinkClick}>{link}</a>
      </p>
    </div>
  );
}

export default App;
