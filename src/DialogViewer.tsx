import { type ReactNode, useState } from "react";
import { cn } from "../src/cn.js";
import { SimpleViewer } from "../src/molviewer.js";

export function DialogViewer({
    url, children, labelTrigger = "Open", labelClose = "X", classNameTrigger = "", classNameClose = "", classNameTitle = "", classNameDialog = "",
}: {
    url: string;
    children?: ReactNode;
    labelTrigger?: ReactNode;
    labelClose?: ReactNode;
    classNameTrigger?: string;
    classNameClose?: string;
    classNameTitle?: string;
    classNameDialog?: string;
}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const fileName = url.split("/").pop();
    let dialogContent = null;
    if (dialogOpen) {
        dialogContent = children ?? <SimpleViewer structure={url} />;
    }
    // TODO close dialog on escape key or click outside
    return (
        <div>
            <button
                className={cn(
                    // classes from https://ui.shadcn.com/docs/components/button
                    // base
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    //size=default
                    "h-9 px-4 py-2",
                    // variant=secondary
                    "bg-gray-300 text-black shadow-sm hover:bg-gray-300/80",
                    classNameTrigger
                )}
                onClick={() => setDialogOpen(true)}
            >
                {labelTrigger}
            </button>
            <dialog open={dialogOpen} className={cn("w-3/4 h-3/4", classNameDialog)}>
                <div className="w-full flex flex-row justify-between items-center">
                    <a
                        className={cn("hover:underline m-2", classNameTitle)}
                        href={url}
                        download={fileName}
                    >
                        {fileName}
                    </a>
                    <button
                        className={cn(
                            // classes from https://ui.shadcn.com/docs/components/button
                            // base
                            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                            //size=default
                            "h-9 px-4 py-2",
                            // variant=ghost
                            "hover:bg-gray-300 hover:text-black",
                            // upper right corner
                            classNameClose
                        )}
                        onClick={() => setDialogOpen(false)}
                    >
                        {labelClose}
                    </button>
                </div>
                {dialogContent}
            </dialog>
        </div>
    );
}
