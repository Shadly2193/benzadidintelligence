"use client";
import { useEffect, useState } from "react";
import { Upload, Trash2, Copy, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function isVideo(name: string) {
  return /\.(mp4|mov|webm)$/i.test(name);
}

export default function MediaLibrary() {
  const [files, setFiles] = useState<{ folder: string; name: string; path: string; metadata: any }[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const FOLDERS = ["portfolio-videos", "client-logos", "testimonial-avatars", "uploads"];

  async function load() {
    setLoading(true);
    const supabase = createClient();
    const all: { folder: string; name: string; path: string; metadata: any }[] = [];
    for (const folder of FOLDERS) {
      const { data } = await supabase.storage.from("media").list(folder, { limit: 100 });
      (data ?? []).forEach((f) => {
        if (f.name) all.push({ folder, name: f.name, path: `${folder}/${f.name}`, metadata: f.metadata });
      });
    }
    setFiles(all);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = createClient();
    const path = `uploads/${crypto.randomUUID()}-${file.name}`;
    await supabase.storage.from("media").upload(path, file);
    setUploading(false);
    load();
  }

  function publicUrl(path: string) {
    const supabase = createClient();
    return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
  }

  async function handleDelete(path: string) {
    const supabase = createClient();
    await supabase.storage.from("media").remove([path]);
    load();
  }

  function copyUrl(path: string) {
    navigator.clipboard.writeText(publicUrl(path));
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 1500);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Media Library</h1>
          <p className="text-sm text-brand-gray-text mt-1">Every image and video uploaded through the admin panel.</p>
        </div>
        <label className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange text-white text-sm font-bold px-4 py-2.5 hover:bg-brand-orange-light transition-colors cursor-pointer">
          <Upload size={15} />
          {uploading ? "Uploading…" : "Upload File"}
          <input type="file" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <p className="text-sm text-brand-gray-text">Loading…</p>
      ) : files.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
          <p className="text-sm text-brand-gray-text">
            No files yet. Files you upload from other admin screens (Videos, Logos, Testimonials) will also appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {files.map((f) => (
            <div key={f.path} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className="aspect-video bg-black/40 flex items-center justify-center overflow-hidden">
                {isVideo(f.name) ? (
                  <video src={publicUrl(f.path)} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={publicUrl(f.path)} alt={f.name} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-2.5">
                <p className="text-[10px] text-white truncate">{f.name}</p>
                <p className="text-[10px] text-brand-gray-text">{f.folder}</p>
                <div className="flex gap-1 mt-2">
                  <button onClick={() => copyUrl(f.path)} className="flex-1 rounded border border-white/10 text-[10px] text-white py-1 hover:border-brand-orange/40 inline-flex items-center justify-center gap-1">
                    {copiedPath === f.path ? <Check size={10} /> : <Copy size={10} />}
                    {copiedPath === f.path ? "Copied" : "Copy URL"}
                  </button>
                  <button onClick={() => handleDelete(f.path)} className="rounded border border-red-500/20 text-red-400 py-1 px-2 hover:bg-red-500/10">
                    <Trash2 size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
