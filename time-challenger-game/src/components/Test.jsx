import React from "react";

function App() {
    const inputFile = React.useRef()

    const onClickPickImage = () => {
        inputFile.current.click()
    }

  return (
    <div id="app">
      <p>Please select an image</p>
      <p>
        <input ref={ inputFile } data-testid="file-picker" type="file" accept="image/*" />
        <button onClick={onClickPickImage}>Pick Image</button>
      </p>
    </div>
  );
}

export default App;
