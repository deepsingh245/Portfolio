import { Card } from "@/components/ui/card";
import GridLayout from "@/shared/GridLayout";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types/project";
import * as Icons from "react-icons/fa";
import { Loader2 } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects sorted by order first, then creation date
    const q = query(
      collection(db, "projects"),
      orderBy("order", "asc"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedProjects: Project[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Dynamically assign the correct icon component from react-icons
        // Fallback to FaProjectDiagram if not found
        const IconComponent = (Icons as any)[data.iconName] || Icons.FaProjectDiagram;

        fetchedProjects.push({
          id: doc.id,
          name: data.name,
          description: data.description,
          longDescription: data.longDescription,
          timeline: data.timeline,
          techStack: data.techStack || [],
          liveHref: data.liveHref,
          sourceHref: data.sourceHref,
          iconName: data.iconName,
          Icon: IconComponent,
          images: data.images || [],
          // We can generate a generic background here based on the image, or keep it simple
          background: data.images?.[0] ? (
            <img
              src={data.images[0]}
              alt={data.name}
              className="absolute opacity-60 [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] object-cover w-full h-full"
            />
          ) : undefined,
          className: data.className || "lg:col-span-2", // Default span if none provided, but we might need more complex logic later if we want the exact old layout
          showButtonText: !!data.liveHref || !!data.sourceHref, // Show button text if there is a link
        });
      });
      setProjects(fetchedProjects);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card className="flex flex-col items-start gap-4 border-x-0 border-t-0 p-6 borer-b-2">
      <p className="font-extrabold">Projects</p>
      
      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : projects.length > 0 ? (
        <GridLayout features={projects} />
      ) : (
        <div className="w-full text-center py-10 text-muted-foreground border border-dashed border-border rounded-xl">
          No projects found. Add some from the Admin Dashboard!
        </div>
      )}
    </Card>
  );
};

export default Projects;
