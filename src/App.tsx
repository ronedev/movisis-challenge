import { Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Store from "./pages/Store";

function App() {
  return (
    <>
      <Navbar />
      <Container mt={2} maxW="100%" as='main' display='grid' alignContent='center' justifyItems='center' gap={2}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
