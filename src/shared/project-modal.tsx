
import { Project } from "@/types/project";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Globe, Smartphone, Monitor, Apple, Terminal, ExternalLink, Calendar, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const { theme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const images = project.images || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-0 overflow-hidden bg-background/95 backdrop-blur-xl border border-border shadow-2xl max-w-5xl">
      {/* Header - Reduced Height, No BG image */}
      <div className="relative h-24 md:h-28 w-full overflow-hidden border-b border-border bg-secondary/20">
         <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
         
         <div className="absolute top-0 right-0 p-4">
             <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgb(34,197,94)]" />
         </div>
         
         <div className="absolute inset-0 flex items-center px-6 md:px-8 gap-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="p-2 bg-secondary border border-border rounded-xl backdrop-blur-md shadow-sm"
            >
                <project.Icon className="w-8 h-8 text-foreground" />
            </motion.div>
            <motion.div
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.15 }}
            >
                <h2 className="text-xl md:text-2xl font-bold tracking-tighter text-foreground michroma uppercase">
                {project.name}
                </h2>
                {project.timeline && (
                    <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mt-0.5">
                        {project.timeline}
                    </p>
                )}
            </motion.div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-px bg-border overflow-hidden h-[70vh] md:h-[600px]">
        
        {/* LEFT COLUMN - METADATA & STACK - Scrollable if needed */}
        <div className="md:col-span-4 bg-background p-5 space-y-6 overflow-y-auto border-r border-border custom-scrollbar">
             {/* Tech Stack - With Badges */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2.5"
            >
                <h4 className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <Layers className="w-3 h-3" /> Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                        <Badge 
                            key={tech} 
                            variant="secondary"
                            className="bg-secondary/50 text-secondary-foreground text-[10px] py-0 px-2 border border-border/50"
                        >
                            {tech}
                        </Badge>
                    ))}
                </div>
            </motion.div>

            {/* Links - Compact */}
            {(project.liveHref || project.sourceHref) && (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2.5"
                 >
                    <h4 className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        <ExternalLink className="w-3 h-3" /> Source
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                        {project.liveHref && (
                            <a 
                                href={project.liveHref} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all group shadow-sm"
                            >
                                <span className="text-xs font-semibold">Live Preview</span>
                                <Globe className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                            </a>
                        )}
                        {project.sourceHref && (
                            <a 
                                href={project.sourceHref} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 transition-all group"
                            >
                                <span className="text-xs font-semibold">Repository</span>
                                <Github className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                            </a>
                        )}
                    </div>
                 </motion.div>
            )}

            {/* Downloads Grid */}
             {project.downloads && (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2.5 pt-4 border-t border-dashed border-border"
                 >
                     <h4 className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        Downloads
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { key: 'android', label: 'APK', Icon: Smartphone, link: project.downloads.android },
                            { key: 'ios', label: 'IPA', Icon: Apple, link: project.downloads.ios },
                            { key: 'windows', label: 'EXE', Icon: Monitor, link: project.downloads.windows },
                            { key: 'mac', label: 'DMG', Icon: Apple, link: project.downloads.mac }, 
                            { key: 'linux', label: 'DEB', Icon: Terminal, link: project.downloads.linux },
                        ].map((platform) => {
                            if (!platform.link) return null;
                            return (
                                <a 
                                    key={platform.key}
                                    href={platform.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-2 rounded-lg border border-border bg-card hover:bg-accent transition-all group shadow-sm"
                                >
                                    <platform.Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    <span className="text-[10px] font-bold text-foreground">{platform.label}</span>
                                </a>
                            )
                        })}
                    </div>
                 </motion.div>
             )}
        </div>

        {/* RIGHT COLUMN - SLIDER & DESCRIPTION - Scrollable */}
        <div className="md:col-span-8 bg-background overflow-y-auto custom-scrollbar flex flex-col h-full">
             
             {/* Image Slider */}
             {images.length > 0 && (
                <div className="relative aspect-video w-full bg-black/5 border-b border-border overflow-hidden group">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImageIndex}
                            src={images[currentImageIndex]}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="h-full w-full object-contain"
                        />
                    </AnimatePresence>
                    
                    {images.length > 1 && (
                        <>
                            <button 
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/50 backdrop-blur-md border border-border opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/50 backdrop-blur-md border border-border opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {images.map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={cn(
                                            "h-1 transition-all rounded-full bg-white shadow-sm",
                                            currentImageIndex === i ? "w-4 opacity-100" : "w-1.5 opacity-40 hover:opacity-60 cursor-pointer"
                                        )}
                                        onClick={() => setCurrentImageIndex(i)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
             )}

            <div className="p-6 md:p-8 space-y-6">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-none text-foreground"
                >
                    <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2 inline-block">Overview</h3>
                    <div className="text-muted-foreground text-sm leading-relaxed text-justify inter">
                        {project.longDescription || project.description}
                    </div>
                </motion.div>
            </div>
        </div>
      </div>
    </Modal>
  );
};
