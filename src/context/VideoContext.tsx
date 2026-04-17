import { createContext, useContext, useState, ReactNode } from "react";

type VideoContextType = {
  open: boolean;
  openVideo: () => void;
  closeVideo: () => void;
};

const VideoContext = createContext<VideoContextType>({
  open: false,
  openVideo: () => {},
  closeVideo: () => {},
});

export function VideoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <VideoContext.Provider
      value={{ open, openVideo: () => setOpen(true), closeVideo: () => setOpen(false) }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  return useContext(VideoContext);
}
