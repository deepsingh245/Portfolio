
import { ReactNode } from "react";

export interface Project {
  name: string;
  description: string;
  longDescription?: string;
  timeline?: string;
  techStack: string[];
  liveHref?: string;
  sourceHref?: string;
  downloads?: {
    android?: string;
    ios?: string;
    windows?: string;
    mac?: string;
    linux?: string;
  };
  storeLinks?: {
    playStore?: string;
    appStore?: string;
  };
  background: ReactNode;
  Icon: React.ElementType;
  className: string;
  showButtonText: boolean;
  images?: string[]; 
}
