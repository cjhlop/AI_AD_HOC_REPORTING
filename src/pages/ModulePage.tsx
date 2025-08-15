import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const ModulePage = () => {
  const { moduleName } = useParams();

  const formattedModuleName = moduleName
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6">
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-card border-2 border-dashed rounded-lg">
                <h1 className="text-4xl font-bold">This is the {formattedModuleName} page.</h1>
                <p className="mt-4 text-lg text-muted-foreground">Content for this module will be built here.</p>
                <Link to="/" className="mt-8">
                    <button className="px-4 py-2 font-semibold text-white bg-primary rounded-md hover:bg-primary/90">
                        Go back to Dashboard
                    </button>
                </Link>
            </div>
        </main>
      </div>
    </div>
  );
};

export default ModulePage;