import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import AppLayout from "./AppLayout";
import DestinationPage from "./components/DestinationPage";
import TourguilderProfilePage from "./components/TourguilderProfilePage";
import TourGuilderList from "./components/TourGuildeList";
import BookedTourList from "./components/BookedTourList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/destination" element={<DestinationPage />} />
          <Route
            path="/tourguilders/:id"
            element={<TourguilderProfilePage />}
          />
          <Route path="/tourguilders" element={<TourGuilderList />} />
          <Route path="/booked-tours" element={<BookedTourList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
