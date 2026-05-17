import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/Utils";
export default function FaceExpression() {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);
    const [expression, setExpression] = useState("Detecting...");
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef })
            .then(() => setIsReady(true))
            .catch((error) => console.error("FaceLandmarker init failed:", error));
        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);
    return (
        <div style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                style={{ width: "400px", borderRadius: "12px" }}
                playsInline
            />
            <h2>{expression}</h2>
            <button
                disabled={!isReady}
                onClick={() =>
                    detect({ landmarkerRef, videoRef, setExpression, })
                }
            >
                {isReady ? "Detect" : "Initializing..."}
            </button>
        </div>
    );
}