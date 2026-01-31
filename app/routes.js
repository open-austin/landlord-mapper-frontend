import { index, route } from "@react-router/dev/routes";

export default [
  // The "/" path loads the Home component from pages
  index("pages/Home.jsx"), 
  
  // The "/results" path loads the Result component
  route("results", "pages/LocationResult.jsx"),

  // Existing route for About Us
  route("about", "components/aboutUs/AboutUs.jsx")
];