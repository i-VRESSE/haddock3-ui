import { type ReactNode, useEffect, useState } from "react";
import { cn } from "./cn.js";

// TODO allow other a tag attributes like title or target to be passed in

export function LinkToFile({
  file,
  children,
  className = undefined,
}: {
  file: File;
  children: ReactNode;
  className?: string;
}) {
  const [url, setUrl] = useState("#");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <a
      className={cn("underline", className)}
      download={file.name}
      href={url}
      type={file.type}
    >
      {children}
    </a>
  );
}
