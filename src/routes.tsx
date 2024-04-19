import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./pages/layout/Layout";
import { Shelf } from "./pages/Shelf";
import { Book } from "./pages/Book";
import { Home } from "./pages/Home";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/shelf" element={<Shelf />} />
      <Route path="/book" element={<Book />} />
    </Route>
  )
);
