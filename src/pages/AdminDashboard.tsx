import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, LogOut, Trash2, Image as ImageIcon } from 'lucide-react';
import * as Icons from 'react-icons/fa';

interface ProjectFormData {
  name: string;
  description: string;
  longDescription: string;
  timeline: string;
  techStack: string; // comma separated
  liveHref: string;
  sourceHref: string;
  iconName: string;
  order: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  
  const initialFormState: ProjectFormData = {
    name: '',
    description: '',
    longDescription: '',
    timeline: '',
    techStack: '',
    liveHref: '',
    sourceHref: '',
    iconName: 'FaProjectDiagram',
    order: 0,
  };
  const [formData, setFormData] = useState<ProjectFormData>(initialFormState);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, 'projects'), orderBy('order', 'asc'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `projects/${file.name}_${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      } else {
        throw new Error('Please select an image for the project background.');
      }

      const projectData = {
        name: formData.name,
        description: formData.description,
        longDescription: formData.longDescription,
        timeline: formData.timeline,
        techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
        liveHref: formData.liveHref,
        sourceHref: formData.sourceHref,
        iconName: formData.iconName,
        order: Number(formData.order) || 0,
        images: [imageUrl], // Storing as array to map to existing UI expectation
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'projects'), projectData);
      
      // Reset form
      setFormData(initialFormState);
      setImageFile(null);
      setUploadProgress(0);
      
      // Refresh list
      fetchProjects();
    } catch (err: any) {
      setError(err.message || 'Error occurred while saving project');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        fetchProjects();
      } catch (err) {
        console.error("Error deleting document: ", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter michroma">Dashboard</h1>
            <p className="text-muted-foreground font-mono uppercase tracking-widest text-xs mt-2">Manage Portfolio Projects</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-border hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-5 bg-card/50 backdrop-blur-md rounded-2xl border border-border p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Add New Project
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Name *</label>
                  <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Order</label>
                  <input type="number" name="order" value={formData.order} onChange={handleInputChange} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Short Description *</label>
                <textarea required name="description" value={formData.description} onChange={handleInputChange} rows={2} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all custom-scrollbar" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Long Description</label>
                <textarea name="longDescription" value={formData.longDescription} onChange={handleInputChange} rows={4} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all custom-scrollbar" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Timeline</label>
                  <input name="timeline" value={formData.timeline} onChange={handleInputChange} placeholder="e.g. Jan 2024 - Present" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">React-Icons Name</label>
                  <input name="iconName" value={formData.iconName} onChange={handleInputChange} placeholder="FaGithub" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Tech Stack (comma separated)</label>
                <input name="techStack" value={formData.techStack} onChange={handleInputChange} placeholder="React, Node.js, Firebase" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Live URL</label>
                  <input name="liveHref" value={formData.liveHref} onChange={handleInputChange} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Source URL</label>
                  <input name="sourceHref" value={formData.sourceHref} onChange={handleInputChange} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <ImageIcon className="w-3 h-3" /> Cover Image *
                </label>
                <input type="file" accept="image/*" onChange={handleImageChange} required className="w-full bg-background/50 border border-border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 transition-all text-sm" />
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full bg-secondary h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-primary h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                  </div>
                )}
              </div>

              <Button type="submit" disabled={submitting} className="w-full mt-4">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {submitting ? 'Saving Project...' : 'Save Project'}
              </Button>
            </form>
          </div>

          {/* List Section */}
          <div className="lg:col-span-7 bg-card/50 backdrop-blur-md rounded-2xl border border-border p-6 shadow-sm h-[800px] overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-semibold mb-6 flex items-center justify-between">
              <span>Existing Projects</span>
              <span className="text-sm px-2 py-1 bg-secondary rounded-md text-secondary-foreground font-mono">{projects.length} Total</span>
            </h2>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center p-8 border border-dashed border-border rounded-xl text-muted-foreground">
                No projects found. Add one to get started.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {projects.map((project) => {
                  const IconComponent = (Icons as any)[project.iconName] || Icons.FaProjectDiagram;
                  
                  return (
                    <div key={project.id} className="group relative flex gap-4 p-4 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors">
                      <div className="w-24 h-24 rounded-lg overflow-hidden border border-border shrink-0 bg-secondary flex items-center justify-center">
                        {project.images && project.images[0] ? (
                          <img src={project.images[0]} alt={project.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0 py-1">
                        <div className="flex items-center gap-2 mb-1">
                          <IconComponent className="w-4 h-4 text-primary" />
                          <h3 className="font-bold truncate text-foreground">{project.name}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.techStack?.map((tech: string, i: number) => (
                            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary/50 border border-border/50 text-secondary-foreground">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleDelete(project.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
