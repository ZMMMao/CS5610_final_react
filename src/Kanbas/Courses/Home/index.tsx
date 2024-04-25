import ModuleList from "../Modules/List";
import Status from "./Status";

function Home() {
  return (
    <div className="d-flex">
        <ModuleList />
        <Status />
    </div>
  );
}

export default Home;
