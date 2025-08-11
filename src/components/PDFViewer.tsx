"use client";

import { useState, useEffect, useRef } from "react";
import { X, Shield } from "lucide-react";

interface PDFViewerProps {
  src: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PDFViewer({
  src,
  title,
  isOpen,
  onClose,
}: PDFViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Create protected PDF URL with parameters to disable toolbar
  const protectedSrc = `${src}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-fit`;

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      document.body.style.overflow = "hidden";

      // Disable right-click context menu
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        return false;
      };

      // Disable certain keyboard shortcuts
      const handleKeyDown = (e: KeyboardEvent) => {
        // Disable Ctrl+S, Ctrl+P, Ctrl+A, Ctrl+C, F12, etc.
        if (
          (e.ctrlKey &&
            (e.key === "s" ||
              e.key === "p" ||
              e.key === "a" ||
              e.key === "c" ||
              e.key === "v" ||
              e.key === "x")) ||
          e.key === "F12" ||
          (e.ctrlKey && e.shiftKey && e.key === "I") ||
          (e.ctrlKey && e.shiftKey && e.key === "C") ||
          (e.ctrlKey && e.key === "u") ||
          (e.ctrlKey && e.shiftKey && e.key === "J")
        ) {
          e.preventDefault();
          return false;
        }

        // ESC untuk close
        if (e.key === "Escape") {
          onClose();
        }
      };

      // Block drag and drop
      const handleDragStart = (e: DragEvent) => {
        e.preventDefault();
        return false;
      };

      // Block selection
      const handleSelectStart = (e: Event) => {
        e.preventDefault();
        return false;
      };

      document.addEventListener("contextmenu", handleContextMenu);
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("dragstart", handleDragStart);
      document.addEventListener("selectstart", handleSelectStart);

      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("dragstart", handleDragStart);
        document.removeEventListener("selectstart", handleSelectStart);
      };
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Inject CSS to hide download buttons in iframe
  const injectProtectionCSS = () => {
    try {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentDocument) return;

      const iframeDoc = iframe.contentDocument;

      // Check if CSS is already injected
      if (iframeDoc.getElementById("pdf-protection-styles")) return;

      const style = iframeDoc.createElement("style");
      style.id = "pdf-protection-styles";
      style.textContent = `
        /* Hide download, print, and save buttons */
        button[title*="Download"], 
        button[title*="Save"], 
        button[title*="Print"],
        a[download],
        #download,
        #print,
        .download,
        .print,
        [data-l10n-id="download"],
        [data-l10n-id="print"],
        [data-l10n-id="save"],
        .toolbarButton[title*="Download"],
        .toolbarButton[title*="Print"],
        .toolbarButton[title*="Save"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
        
        /* Disable text selection */
        * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        
        /* Disable drag and drop */
        * {
          -webkit-user-drag: none !important;
          -khtml-user-drag: none !important;
          -moz-user-drag: none !important;
          -o-user-drag: none !important;
          user-drag: none !important;
        }
        
        /* Hide toolbar completely for better protection */
        #toolbarContainer,
        .toolbar,
        #toolbar {
          display: none !important;
        }
        
        /* Prevent right click on PDF content */
        .page, .canvasWrapper, canvas {
          pointer-events: none !important;
        }
        
        /* Re-enable scroll but disable selection */
        #viewerContainer {
          pointer-events: auto !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          user-select: none !important;
        }
      `;

      iframeDoc.head?.appendChild(style);
    } catch (error) {
      console.log("Cannot access iframe content due to CORS policy");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
      <div className="relative w-full h-full max-w-7xl mx-auto p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-green-400" />
            <div className="flex flex-col">
              <h2 className="text-white lg:text-xl max-w-sm lg:max-w-full text-sm  font-semibold">
                {title}
              </h2>
              <p className="text-green-400 lg:text-sm text-xs">
                ✓ Dokumen Terproteksi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-lg"
            aria-label="Close PDF viewer"
          >
            <X size={24} />
          </button>
        </div>

        {/* PDF Container */}
        <div className="flex-1 bg-white rounded-lg shadow-2xl overflow-hidden relative">
          {/* Protection overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "transparent",
              mixBlendMode: "multiply",
            }}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 z-20 bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat dokumen terproteksi...</p>
              </div>
            </div>
          )}

          {/* Error fallback */}
          {hasError && (
            <div className="absolute inset-0 z-20 bg-white flex items-center justify-center">
              <div className="text-center max-w-md mx-auto p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Gagal Memuat Dokumen
                </h3>
                <p className="text-gray-600 mb-4">
                  Terjadi kesalahan saat memuat file PDF. Silakan coba lagi.
                </p>
                <button
                  onClick={() => {
                    setHasError(false);
                    setIsLoading(true);
                    // Force reload iframe
                    if (iframeRef.current) {
                      iframeRef.current.src = protectedSrc;
                    }
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          )}

          <iframe
            ref={iframeRef}
            src={protectedSrc}
            className="w-full h-full border-0 pdf-protected-iframe"
            title={title}
            // sandbox="allow-scripts allow-same-origin allow-popups"
            onContextMenu={(e) => e.preventDefault()}
            onLoad={() => {
              setIsLoading(false);
              console.log("PDF loaded successfully");
              // Inject protection CSS after load
              setTimeout(injectProtectionCSS, 500);
            }}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
              console.error("Failed to load PDF");
            }}
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              pointerEvents: "auto",
            }}
          />
        </div>

        {/* Bottom protection notice */}
        <div className="mt-4 bg-red-900/80 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center justify-center space-x-2 text-red-200 text-sm">
            <Shield className="w-4 h-4" />
            <span className="font-medium">
              Dokumen ini dilindungi. Download, print, copy, dan distribusi
              dilarang tanpa izin.
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Global protection styles */}
      <style jsx global>{`
        /* Enhanced PDF protection styles */
        .pdf-protected-iframe {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-user-drag: none !important;
          -khtml-user-drag: none !important;
          -moz-user-drag: none !important;
          -o-user-drag: none !important;
          user-drag: none !important;
          -webkit-touch-callout: none !important;
          -webkit-tap-highlight-color: transparent !important;
          pointer-events: auto !important;
        }

        /* Disable print media queries */
        @media print {
          .pdf-viewer-container,
          .pdf-protected-iframe {
            display: none !important;
          }
        }

        /* Disable selection on the entire viewer */
        .pdf-viewer-container * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }

        /* Block common shortcuts globally when PDF is open */
        body.pdf-viewer-open {
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        /* Additional protection for iframe content */
        iframe[title*="PDF"],
        iframe.pdf-protected-iframe {
          background: #f5f5f5;
          border: none !important;
          outline: none !important;
        }
      `}</style>
    </div>
  );
}
