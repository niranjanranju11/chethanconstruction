import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Trash2,
  Star,
  CheckCircle,
  AlertCircle,
  Film,
  Image as ImageIcon,
  Loader2,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { projectsApi } from '../api/projects';
import type { MediaStage, ProjectMediaItem } from '../types';

interface AdminMediaUploaderProps {
  projectId: string;
  existingMedia: ProjectMediaItem[];
  onMediaChanged: () => void;
}

interface UploadTask {
  id: string;
  file: File;
  stage: MediaStage;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  errorMessage?: string;
}

export const AdminMediaUploader: React.FC<AdminMediaUploaderProps> = ({
  projectId,
  existingMedia,
  onMediaChanged,
}) => {
  const [selectedStage, setSelectedStage] = useState<MediaStage>('GENERAL');
  const [uploadTasks, setUploadTasks] = useState<UploadTask[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newTasks: UploadTask[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      stage: selectedStage,
      progress: 0,
      status: 'pending',
    }));

    setUploadTasks((prev) => [...prev, ...newTasks]);

    // Process tasks
    newTasks.forEach((task) => executeUpload(task));
  };

  const executeUpload = async (task: UploadTask) => {
    try {
      updateTask(task.id, { status: 'uploading', progress: 5 });

      // Step 1: Request signed upload intent from backend
      const intent = await projectsApi.createUploadIntent(projectId, {
        filename: task.file.name,
        contentType: task.file.type || 'image/jpeg',
        sizeBytes: task.file.size,
        stage: task.stage,
      });

      updateTask(task.id, { progress: 30 });

      // Step 2: Upload directly to R2 using the short-lived presigned URL
      await projectsApi.uploadDirectlyToR2(intent.uploadUrl, task.file, (percent) => {
        const overall = 30 + Math.round(percent * 0.6);
        updateTask(task.id, { progress: overall });
      });

      updateTask(task.id, { progress: 95 });

      // Step 3: Complete upload in backend to finalize metadata
      await projectsApi.completeUpload(projectId, intent.mediaId);

      updateTask(task.id, { status: 'completed', progress: 100 });
      onMediaChanged();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Upload failed';
      updateTask(task.id, { status: 'failed', errorMessage: msg });
    }
  };

  const updateTask = (id: string, updates: Partial<UploadTask>) => {
    setUploadTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const handleSetCover = async (mediaId: string) => {
    try {
      setActionLoadingId(mediaId);
      await projectsApi.updateMedia(mediaId, { cover: true });
      onMediaChanged();
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleStageChange = async (mediaId: string, stage: MediaStage) => {
    try {
      setActionLoadingId(mediaId);
      await projectsApi.updateMedia(mediaId, { stage });
      onMediaChanged();
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteMedia = async (mediaId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this media asset?')) return;
    try {
      setActionLoadingId(mediaId);
      await projectsApi.deleteMedia(mediaId);
      onMediaChanged();
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= existingMedia.length) return;

    const listCopy = [...existingMedia];
    const [moved] = listCopy.splice(index, 1);
    listCopy.splice(targetIndex, 0, moved);

    const orderedIds = listCopy.map((m) => m.id);
    await projectsApi.reorderMedia(projectId, orderedIds);
    onMediaChanged();
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone & Stage Selector */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Upload Project Photos & Videos</h3>
            <p className="text-xs text-slate-500">
              Direct upload to Cloudflare R2. Max 10MB for photos (JPEG, PNG, WebP), 250MB for videos (MP4).
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-700">Assign Stage:</span>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value as MediaStage)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="GENERAL">General Portfolio</option>
              <option value="BEFORE">Before Stage</option>
              <option value="DURING">During Construction</option>
              <option value="AFTER">After Completion</option>
            </select>
          </div>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-amber-500 bg-amber-500/5'
              : 'border-slate-300 hover:border-amber-500 bg-white'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <UploadCloud className="w-10 h-10 text-amber-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-800">
            Click to select files or drag and drop here
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Multiple photos and videos supported.
          </p>
        </div>

        {/* Upload Progress Queue */}
        {uploadTasks.length > 0 && (
          <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Recent Uploads ({uploadTasks.filter((t) => t.status === 'completed').length}/{uploadTasks.length})</span>
              <button
                onClick={() => setUploadTasks((prev) => prev.filter((t) => t.status !== 'completed'))}
                className="text-amber-600 hover:underline text-[11px]"
              >
                Clear completed
              </button>
            </div>
            {uploadTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {task.file.type.startsWith('video') ? (
                    <Film className="w-4 h-4 text-sky-500 shrink-0" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  <span className="truncate font-medium text-slate-800">{task.file.name}</span>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    ({(task.file.size / (1024 * 1024)).toFixed(1)} MB)
                  </span>
                </div>

                <div className="w-32 bg-slate-100 rounded-full h-2 overflow-hidden shrink-0">
                  <div
                    className={`h-full transition-all duration-300 ${
                      task.status === 'failed' ? 'bg-rose-500' : 'bg-amber-600'
                    }`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>

                <div className="w-20 text-right shrink-0">
                  {task.status === 'completed' && (
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-medium text-[11px]">
                      <CheckCircle className="w-3.5 h-3.5" /> Done
                    </span>
                  )}
                  {task.status === 'uploading' && (
                    <span className="text-amber-600 font-medium text-[11px]">
                      {task.progress}%
                    </span>
                  )}
                  {task.status === 'failed' && (
                    <span className="inline-flex items-center gap-1 text-rose-600 font-medium text-[11px]" title={task.errorMessage}>
                      <AlertCircle className="w-3.5 h-3.5" /> Failed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Existing Media Gallery Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900">
            Project Gallery ({existingMedia.length} assets)
          </h3>
          <span className="text-xs text-slate-500">
            Click Star to set Cover Photo • Use arrows to reorder
          </span>
        </div>

        {existingMedia.length === 0 ? (
          <div className="p-8 border border-dashed border-slate-200 rounded-2xl text-center text-slate-400 text-sm">
            No media uploaded yet for this project. Upload photos or videos above.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {existingMedia.map((media, index) => (
              <div
                key={media.id}
                className={`group relative bg-white border rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all ${
                  media.cover ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-200'
                }`}
              >
                {/* Image/Video Preview */}
                <div className="aspect-[4/3] bg-slate-900 relative overflow-hidden">
                  {media.mediaType === 'VIDEO' ? (
                    <video
                      src={media.publicUrl}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={media.publicUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Stage Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-black/70 text-white backdrop-blur-xs">
                      {media.stage}
                    </span>
                  </div>

                  {/* Cover Flag */}
                  {media.cover && (
                    <div className="absolute top-2 right-2 z-10 px-2 py-0.5 text-[10px] font-bold rounded bg-amber-600 text-white shadow">
                      Cover
                    </div>
                  )}

                  {/* Video Icon indicator */}
                  {media.mediaType === 'VIDEO' && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/80 pointer-events-none">
                      <Film className="w-8 h-8" />
                    </div>
                  )}
                </div>

                {/* Card Controls */}
                <div className="p-3 bg-white space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <select
                      value={media.stage}
                      disabled={actionLoadingId === media.id}
                      onChange={(e) => handleStageChange(media.id, e.target.value as MediaStage)}
                      className="text-[11px] bg-slate-100 rounded px-1.5 py-1 border border-slate-200 font-medium text-slate-700"
                    >
                      <option value="GENERAL">General</option>
                      <option value="BEFORE">Before</option>
                      <option value="DURING">During</option>
                      <option value="AFTER">After</option>
                    </select>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveOrder(index, 'up')}
                        disabled={index === 0}
                        className="p-1 rounded hover:bg-slate-100 disabled:opacity-30"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5 text-slate-600" />
                      </button>
                      <button
                        onClick={() => handleMoveOrder(index, 'down')}
                        disabled={index === existingMedia.length - 1}
                        className="p-1 rounded hover:bg-slate-100 disabled:opacity-30"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <button
                      onClick={() => handleSetCover(media.id)}
                      disabled={media.cover || actionLoadingId === media.id}
                      className={`inline-flex items-center gap-1 text-[11px] font-medium transition-colors ${
                        media.cover ? 'text-amber-600' : 'text-slate-500 hover:text-amber-600'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${media.cover ? 'fill-amber-600' : ''}`} />
                      <span>{media.cover ? 'Cover' : 'Set Cover'}</span>
                    </button>

                    <button
                      onClick={() => handleDeleteMedia(media.id)}
                      disabled={actionLoadingId === media.id}
                      className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50"
                      title="Delete asset"
                    >
                      {actionLoadingId === media.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
