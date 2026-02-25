
import { ReactNode } from "react";

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  timeline?: string;
  techStack: string[];
  liveHref?: string;
  sourceHref?: string;
  iconName: string; // Used to fetch from react-icons dynamically
  iconClassName?: string;
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
  background?: ReactNode; // Make background optional since we'll rely on images array mostly
  Icon?: React.ElementType; // Keep optional for backwards compatibility during migration
  className?: string; // Optional for layout
  showButtonText?: boolean;
  images?: string[]; 
  order?: number;
  createdAt?: any;
}
