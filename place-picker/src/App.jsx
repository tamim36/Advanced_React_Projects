import { useRef, useState, useEffect } from 'react';
import { sortPlacesByDistance } from './loc.js'
import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';

function App() {
  const key_selectedPlaces = 'selectdPlaces'
  const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState([]);
  const [availablePlaces, setAvailablePlaces] = useState([]);


  useEffect(() => {
    const storedPlaces = getStoredPlaces() 
    setPickedPlaces(storedPlaces)
   }, [])

  useEffect(() => { handleSortingPlaces() }, [])

  function getStoredPlaces() {
    const storeIds = JSON.parse(localStorage.getItem(key_selectedPlaces)) || []
    const storedPlaces = storeIds.map((id) => 
      AVAILABLE_PLACES.find((place) => place.id === id)
    )

    return storedPlaces
  }

  function handleSortingPlaces() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        pos.coords.latitude,
        pos.coords.longitude
      )
      
      setAvailablePlaces(sortedPlaces)
    })
  }

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storeIds = JSON.parse(localStorage.getItem(key_selectedPlaces)) || []
    if (storeIds.indexOf(id) === -1){
      localStorage.setItem(key_selectedPlaces, JSON.stringify([id, ...storeIds]))
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();

    const storeIds = JSON.parse(localStorage.getItem(key_selectedPlaces)) || []
    localStorage.setItem(key_selectedPlaces, JSON.stringify(storeIds.filter((id) => id !== selectedPlace.current)))
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText={'Sorting places ...'}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
