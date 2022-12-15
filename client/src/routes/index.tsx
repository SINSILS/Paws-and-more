import { Route, Routes } from "react-router-dom";
import AnimalTypes from "../pages/AnimalTypes";
import Posts from "../pages/Posts";
import Topics from "../pages/Topics";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AnimalTypes />} />
      <Route path="/animalTypes/:animalTypeId/topics" element={<Topics />} />
      <Route
        path="/animalTypes/:animalTypeId/topics/:topicId/posts"
        element={<Posts />}
      />
    </Routes>
  );
};

export default Router;
