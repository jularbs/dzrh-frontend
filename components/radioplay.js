const RadioPlayer = ({ children }) => {
  return (
    <div>
      {children}
      <div className="mr-5" style={{position: "absolute", top: "60px", right: "-50px"}}>
        <audio controls>
          <source
            src="http://streamingv2.shoutcast.com/dzrhmanila?type=.mp3"
            type="audio/mpeg"
          />
          Your browser does not support the audio tag.
        </audio>
      </div>
    </div>
  );
};

export default RadioPlayer;
