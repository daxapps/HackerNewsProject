import React from "react";

function Story({ storyData }) {
  const { title, url, score, by, time, karmaScore, storyNum } = storyData.data;

  return (
    <div id="story-box" key={`${karmaScore}`}>
      <div>
        <span>{`${storyNum}.`}</span>
      </div>
      <div id="textbox">
        <div id="textbox-top">
          <span className="textbox-largetype">
            <a target="_blank" href={`${url}`}>{`${title}`}</a>
          </span>
          <span id="bottom-span" className="textbox-smalltype">
            <a target="_blank" href={`${url}`}>{` (${url})`}</a>
          </span>
        </div>
        <div id="textbox-bottom">
          <span className="textbox-smalltype">{`${score} points by ${by} ${time} `}</span>
          <span>{`| ${karmaScore} karma points |`}</span>
        </div>
      </div>
    </div>
  );
}

export default Story;
