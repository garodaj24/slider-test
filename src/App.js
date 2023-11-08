import Slider from "./components/Slider"
import { useState } from 'react'

function App() {
  const predefinedPositions = [0, 0.25, 0.5, 0.75, 1];
  const [selectedPosition, setSelectedPosition] = useState(0);

  const handleSliderChange = (position) => {
    setSelectedPosition(position)
  }
  return (
    <Slider predefinedPositions={predefinedPositions} onChange={handleSliderChange} />
  );
}

export default App;
